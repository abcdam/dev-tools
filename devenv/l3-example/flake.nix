{
  description = "L3 project-scoped config example";
  inputs = {
    node.url = "path:../l2-envs/node";
  };
  outputs =
    {
      self,
      nixpkgs,
      node,
      ...
    }:
    let
      lib = nixpkgs.lib;
      systems = lib.systems.flakeExposed;
    in
    {
      devShells = lib.genAttrs systems (
        system:
        let
          args = {
            layer = 3;
            pkgs = import nixpkgs {
              inherit system;
              overlays = [ node.overlays.default ];
            };
            name = "astro-unocss-template";
            extensionsList = [ ./extensions.project.txt ];
          };
        in
        {
          default = node.utils.mkProjectShell args;
        }
      );
    };
}
