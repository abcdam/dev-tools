#!/bin/sh
#
# each biome config fragment pulls schema def directly from biome's
# version dependent schema distribution url for the currently supported 
# semver. when this package is updated, we inject the new version in all
# frags in one go, making sure that configs never break on updates for
# the currently declared peer dependency
#
set -eu
URL=https://biomejs.dev/schemas
LOOKUP_PROP=".devDependencies[\"@biomejs/biome\"]"
DEP_SEMVER=$(jq -r "$LOOKUP_PROP" package.json | sed 's/[^0-9.]//g')

transform() {
  find src/biome -name "*.jsonc" -type f -exec sh -c '
    url="$1"
    v="$2"
    shift 2
    for file do
      if grep -q "${url}/[^/]*" "$file"; then
        # macos wants explicit .bak handling
        if [ "$(uname)" = "Darwin" ]; then
          sed -i "" "s|${url}/[^/]*|${url}/${v}|" "$file"
        else
          sed -i "s|${url}/[^/]*|${url}/${v}|" "$file"
        fi
        printf " - %s\n" "$file"
      fi
    done
  ' sh "$URL" "$DEP_SEMVER" {} +
}

printf "Detected semver '%s'. Proceed with injection? [y/n] " \
    "${DEP_SEMVER:-UNDEFINED}"                                \
  && read -r ans 

case "${ans:-y}" in 
  y|Y|yes|Yes)  printf '\n'         && transform  ;;
  *)            printf 'Aborted.\n' && exit 0     ;; 
esac && printf '\n%s\n' 'Done.'