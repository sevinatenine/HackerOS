#!/bin/bash
# Converts every file in ./convert using inkscape, outputs to ./out with the same filename.

set -euo pipefail

SRC_DIR="./convert"
OUT_DIR="./out"

mkdir -p "$OUT_DIR"

shopt -s nullglob
for f in "$SRC_DIR"/*; do
    filename=$(basename "$f")
    echo "Converting: $filename"
    inkscape "$f" \
        --export-area-drawing \
        --export-plain-svg \
        --export-filename="$OUT_DIR/$filename"
done

echo "Done."