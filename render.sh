#!/usr/local/bin/bash

style="base16/outrun-dark"
outfile=$(mktemp --suffix=.md)
width=$(tput cols)
# smwidth=$(( width - 12 ))
# outfile="outfile.md"

doc="docs/${1}.md"
[[ -z "${1}" ]] && doc="docs/stream.md"

# node index.js |
cat "${doc}" |
  pandoc -f markdown -t html --columns=${width} --wrap=preserve --no-highlight |
  pandoc -f html -t markdown --columns=${width} --wrap=preserve --reference-links \
  -o "${outfile}"

# pandoc --list-highlight-styles
# pandoc --no-highlight

highlight -V -s "${style}" -S markdown -O xterm256 --canvas=${width} "${outfile}" | less -r

# commonmark+hard_line_breaks
# pager="mdcat -p"
# pager="bat -p"
# pager="cat"
# pager="less -r"
# pager="highlight -s "${style}" -S md -O xterm256 --canvas=${width}"
