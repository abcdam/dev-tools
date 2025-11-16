{
  description = "Global/Root config base layer";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    nix-vscode-extensions.url = "github:nix-community/nix-vscode-extensions";
  };

  outputs =
    {
      self,
      nixpkgs,
      nix-vscode-extensions,
      ...
    }:
    let
      lib = nixpkgs.lib;
      supportedSystems = lib.systems.flakeExposed;
      baseExt = builtins.toString ./extensions.base.txt;

      baseBuildInputs =
        callerPkgs: with callerPkgs; [
          dash
          perl
          bash
          jq
          bash-completion
        ];
    in
    {
      devShells = lib.genAttrs supportedSystems (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        {
          default = pkgs.mkShell {
            name = "base-shell";
            buildInputs = baseBuildInputs pkgs;

            shellHook = ''
              printf '\n\n'
              printf 'Minimal L1 base dev shell active (system=%s).' "${system}"
              printf "This flake doesn't assume any language runtimes. Compose dependencies in L2+ flakes.\n"
              printf "Use base.utils.mkEcosystemShell from higher level flakes to create composable environments.\n"
              printf '\n\n'
            '';
          };
        }
      );
      overlays.default = nix-vscode-extensions.overlays.default;
      utils = {
        # mkEcosystemShell: attrs: {
        # pkgs            : (required) the pkgs to use
        # name            : namespace id
        # buildInputs     : optional extra packages
        # extensionsList  : list of paths to extension files which the caller owns
        # layer           : hierarchy level from most generic (lowest) to most specific (highest)
        # }
        mkEcosystemShell =
          args@{
            name,
            buildInputs ? [ ],
            extensionsList ? [ ],
            layer ? 1,
            ...
          }:
                ######
  ### BEGIN SETUP ###
######
          let
            callerPkgs = args.pkgs;
            allExtensionPaths = [ baseExt ] ++ extensionsList;
            BIN = "codex";

            L = lib.lists;
            S = lib.strings;
            Trivial = lib.trivial;

            id_shaper =
              id:
              Trivial.pipe id [
                (S.match "^([^#]*)")
                L.head
                S.trim
                S.toLower
                (i: L.optional (i != "") i)
              ];

            cleanIds = Trivial.pipe allExtensionPaths [
              (L.concatMap (p: S.splitString "\n" (Trivial.readFile p)))
              (L.concatMap id_shaper)
              L.naturalSort
              L.unique
            ];

            smoothExtract =
              path: (pathSplit: (lib.attrByPath pathSplit null callerPkgs.open-vsx)) (S.splitString "." path);
            extensionPkgs = L.concatMap (
              id:
              let
                pkg = smoothExtract id;
              in
              L.optional (pkg != null) pkg
            ) cleanIds;

            codiumWithExtensions = (
              callerPkgs.vscode-with-extensions.override {
                vscode = callerPkgs.vscodium;
                vscodeExtensions = extensionPkgs;
              }
            );
            mergedBuildInputs = (baseBuildInputs callerPkgs) ++ buildInputs ++ [ codiumWithExtensions ];

            codexWrapper = callerPkgs.writeShellScriptBin BIN ''
              RDIR="''${1:-$(pwd)}"
              DAT_SCOPE="$RDIR/.codium-data"
              mkdir -p "$DAT_SCOPE"
              exec sh codium --user-data-dir "$DAT_SCOPE" -n "$RDIR"
            '';
          in
  ######
### END SETUP ###
          ###### 
          callerPkgs.mkShell {
            inherit name;
            inherit layer;
            buildInputs = mergedBuildInputs ++ [ codexWrapper ];

            shellHook = ''
              export PATH=$(printf "%s\n" "$PATH" | tr ':' '\n' | grep -E '^/nix/store' | paste -sd: -)
              printf 'Namespaced L${builtins.toString layer} shell ${name} session.\n'
              printf '\n%-10s %s\n' 'USAGE:' '${BIN} [<PATH>]'
              printf '%-10s %s\n\n' 'PATH' 'If set, should point to project root. Defaults to pwd.'
              exec bash --norc
            '';
          };
      };
    };
}
