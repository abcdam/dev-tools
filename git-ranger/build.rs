use std::{collections::BTreeMap, env, fs, path::Path};

use itertools::Itertools;
use serde::{Deserialize, Serialize, Serializer, ser::SerializeMap};
use serde_yaml::Value;

const DICT_PATH: &str = "asset/dictionary.yaml";

#[derive(Debug, Deserialize)]
struct AppTexts {
  app:      CommandTexts,
  commands: Commands,
}

#[derive(Debug, Deserialize)]
struct Commands<T = CommandTexts> {
  seed:  T,
  plant: T,
  list:  T,
  prune: T,
  check: T,
  visit: T,
}

impl Commands {
  /// const list of (name, &CommandTexts) is used during serde operations to
  /// validate our schema
  fn entries(&self) -> [(&'static str, &CommandTexts); 6] {
    [
      ("seed", &self.seed),
      ("plant", &self.plant),
      ("list", &self.list),
      ("prune", &self.prune),
      ("check", &self.check),
      ("visit", &self.visit),
    ]
  }
}

impl Serialize for AppTexts {
  fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
  where
    S: Serializer,
  {
    let mut map = serializer.serialize_map(None)?;
    map.serialize_entry("APP", &self.app)?;

    // commandsare flattened out to top-level namespaces in DISP
    for (k, v) in &self.commands.entries() {
      map.serialize_entry(&k.to_uppercase(), v)?;
    }

    map.end()
  }
}

#[derive(Debug, Deserialize)]
struct CommandTexts {
  synopsis: String,
  args:     Option<BTreeMap<String, String>>,
}

impl Serialize for CommandTexts {
  fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
  where
    S: Serializer,
  {
    let mut map = serializer.serialize_map(None)?;
    map.serialize_entry("SYNOPSIS", &self.synopsis)?;
    if let Some(args) = &self.args {
      map.serialize_entry("ARGS", args)?;
    }

    map.end()
  }
}

fn sanitize_ident(s: &str) -> String {
  let mut tmp = String::with_capacity(s.len());
  for ch in s.chars() {
    if ch.is_ascii_alphabetic() {
      tmp.push(ch);
    } else if ch == '-' {
      tmp.push('_');
    } else {
      panic!("Invalid character '{ch}' in string: {s}");
    }
  }

  tmp.to_uppercase()
}

fn emit_module(name: &str, val: &serde_yaml::Value, indent: usize) -> String {
  let mut out = String::new();
  let tab_size: usize = 2;
  let pad = " ".repeat(indent * tab_size);
  out.push_str(&format!("{pad}pub mod {name} {{\n"));
  if let serde_yaml::Value::Mapping(map) = val {
    for (k, v) in map {
      if let serde_yaml::Value::String(ks) = k {
        match v {
          serde_yaml::Value::String(vs) => {
            out.push_str(&format!(
              "{pad}{inner_pad}pub const {key}: &str = r#\"{vs}\"#;\n",
              inner_pad = " ".repeat(tab_size),
              key = sanitize_ident(ks)
            ));
          },
          serde_yaml::Value::Mapping(_) => {
            out.push_str(&emit_module(ks, v, indent + 1));
          },
          _ => {},
        }
      }
    }
  }
  out.push_str(&format!("{pad}}}\n"));
  out
}

fn to_rust_constants<T: Sized + Serialize>(val: &T) -> String {
  let value = serde_yaml::to_value(val).expect("failed to to_value");

  let root_mod_infix = match &value {
    serde_yaml::Value::Mapping(m) => m
      .iter()
      .filter_map(|(key, val)| match key {
        Value::String(k) => Some((k, val)),
        _ => None,
      })
      .sorted_by(|k1, k2| k1.0.cmp(k2.0))
      .map(|(k, v)| emit_module(k.as_str(), v, 1)),
    _ => panic!("expected top-level mapping for root namespaces inside DISP"),
  };
  let mut compiled_mod: Vec<String> = Vec::new();
  compiled_mod.push("pub mod DISP {\n".into());
  compiled_mod.push("    #![allow(non_snake_case)]\n\n".into());
  compiled_mod.extend(root_mod_infix);
  compiled_mod.push("}\n".into());
  compiled_mod.join("\n")
}

fn main() {
  println!("cargo:rerun-if-changed={DICT_PATH}");
  println!("cargo:rerun-if-changed=build.rs");

  let content_str = fs::read_to_string(DICT_PATH)
    .unwrap_or_else(|_| panic!("Unable to read {DICT_PATH}"));

  let texts: AppTexts = serde_yaml::from_str(&content_str)
    .unwrap_or_else(|_| panic!("Invalid YAML at {DICT_PATH}"));

  let code = to_rust_constants(&texts);

  let binding = env::var("OUT_DIR").unwrap();
  let out_dir = Path::new(&binding);
  fs::write(out_dir.join("disp.rs"), code)
    .expect("failed to write disp.rs to {binding}");
}
