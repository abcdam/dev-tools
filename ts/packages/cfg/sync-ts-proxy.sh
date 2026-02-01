#!/bin/sh
#
# Build time workaround
#
# we mirror tsconfig.json fragment export hierarchy because tsc 
# cannot extend from this package.json's 'exports' declaration
#
set -eu

SRC=src/tsconfig
OUT=ts

printf 'Generating %s namespace proxies...\n' "$SRC"



! [ -d "$SRC" ]                                             \
  && printf 'script must run from package root dir.\n'      \
  && exit 1

rm -rf $OUT

find $SRC -name "*.jsonc" -type f | while read -r cfg_frag; do
    rel_frag_path=${cfg_frag#$SRC/}
    frag_dir=$(dirname "$rel_frag_path")
    frag_name=$(basename "$rel_frag_path" .jsonc)
    
    mkdir -p "$OUT/$frag_dir"

    proxy_path="$OUT/${frag_dir#./}/$frag_name.json"
    
    resolved_pkg_root="../$(printf '%s' "$frag_dir" | sed -E 's|[^/.]+|..|g')"
    
    json_val="${resolved_pkg_root}/${SRC}/$rel_frag_path"
    json_obj="{\"extends\": \"$json_val\"}"
    
    printf '%s\n' "$json_obj" > "$proxy_path"
done

printf 'Done\n'