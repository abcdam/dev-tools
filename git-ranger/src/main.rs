include!(concat!(env!("OUT_DIR"), "/disp.rs"));

use clap::{Parser, Subcommand};
mod commands;
use commands::{
  CheckArgs,
  ListArgs,
  PlantArgs,
  PruneArgs,
  SeedArgs,
  VisitArgs,
};
#[derive(Debug, Parser)]
#[command(name = "git-ranger")]
#[command(about = DISP::APP::SYNOPSIS)]
struct Cli {
  #[command(subcommand)]
  command: Commands,
}

#[derive(Debug, Subcommand)]
enum Commands {
  Seed(SeedArgs),
  Plant(PlantArgs),
  List(ListArgs),
  Check(CheckArgs),
  Prune(PruneArgs),
  Visit(VisitArgs),
}
fn main() {
  let args = Cli::parse();
  println!("Hello, world!");
}
