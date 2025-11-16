{
  description = "L2 cross-project scoped config example";

  inputs = {
    base.url = "path:../../l1-base";
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs =
    {
      self,
      nixpkgs,
      base,
      ...
    }:
    let
      lib = nixpkgs.lib;
      supportedSystems = lib.systems.flakeExposed;
      extensionsPath = builtins.toString ./extensions.node.txt;
      ecoBuildInputs = callerPkgs: [
        callerPkgs.nodejs_24
        callerPkgs.pnpm
        callerPkgs.biome
      ];
    in
    {
      overlays.default = base.overlays.default;
      utils = {
        mkProjectShell =
          args@{
            name ? "nodejs-template",
            buildInputs ? [ ],
            extensionsList ? [ ],
            layer ? 3,
            ...
          }:
          let
            mergedArgs = args // {
              extensionsList = [ extensionsPath ] ++ extensionsList;
              buildInputs = ecoBuildInputs args.pkgs ++ buildInputs;
            };
          in
          base.utils.mkEcosystemShell mergedArgs;
      };
      devShells = lib.genAttrs supportedSystems (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
          args = {
            inherit pkgs;
            extensionsList = [ extensionsPath ];
            buildInputs = ecoBuildInputs pkgs;
            name = "node-shell";
            layer = 2;
          };
        in
        {
          default = base.utils.mkEcosystemShell args;
        }
      );
    };
}
