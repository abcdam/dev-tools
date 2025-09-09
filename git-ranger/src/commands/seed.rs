use std::{path::PathBuf, str::FromStr};

use url::Url;

use super::Parser;
use crate::DISP::SEED::*;

#[derive(Debug, Parser)]
#[command(about = SYNOPSIS)]
pub struct SeedArgs {
  #[arg(short, long, help = ARGS::SRC, id="PATH/REMOTE")]
  pub src: Option<SrcPath>,

  #[arg(short, long, help = ARGS::DIR, id="TARGET")]
  pub dir: Option<PathBuf>,
}

#[derive(Debug, Clone)]
pub enum SrcPath {
  Uri(Url),
  File(PathBuf),
}
impl FromStr for SrcPath {
  type Err = String;

  fn from_str(s: &str) -> Result<Self, Self::Err> {
    if let Ok(url) = Url::parse(s) {
      Ok(SrcPath::Uri(url))
    } else {
      Ok(SrcPath::File(PathBuf::from(s)))
    }
  }
}
