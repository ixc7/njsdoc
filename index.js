#!/usr/bin/env node

import { readFileSync } from 'fs'

const filepath = new URL('docs/os.md', import.meta.url).pathname
const initial = readFileSync(filepath).toString()

const printBlocks = opts => {
  const { index, num, result, source, title } = opts
  const localSource = [ ...opts.source ]
  
  if (!source[index]) return result
  
  result[num] = 
    `\n\x1b[1m\x1b[38;5;161m<${title}-${num}>\x1b[0m\n\n` + 
    localSource[index].split('\n').slice(1).join('\n') + 
    `\n\x1b[38;5;52m</${title}-${num}>\x1b[0m\n\n`

  return printBlocks({
    ...opts,
    source: localSource,
    index: index + 2,
    num: num + 1
  })
}

console.log('\x1Bc\x1b[3J')
const codeBlocks = printBlocks({ source: initial.split('```'), index: 1, num: 0, result: {}, title: 'Code' })
const Blocks = printBlocks({ source: initial.split('```'), index: 0, num: 0, result: {}, title: 'Text'})

console.log(
'\n\x1b[1m\x1b[38;5;35mTEXT BLOCKS :\x1b[0m\n\n',
Blocks[0], Blocks[1], Blocks[2],

'\n\x1b[1m\x1b[38;5;35mCODE BLOCKS :\x1b[0m\n\n',
codeBlocks[0], codeBlocks[1], codeBlocks[2]
)


/*

'## Promises API\n' +
    '\n' +
    '<!-- YAML\n' +
    'added: v10.0.0\n' +
    'changes:\n' +
    '  - version: v14.0.0\n' +
    '    pr-url: https://github.com/nodejs/node/pull/31553\n' +
    "    description: Exposed as `require('fs/promises')`.\n" +
    '  - version:\n' +
    '    - v11.14.0\n' +
    '    - v10.17.0\n' +
    '    pr-url: https://github.com/nodejs/node/pull/26581\n' +
    '    description: This API is no longer experimental.\n' +
    '  - version: v10.1.0\n' +
    '    pr-url: https://github.com/nodejs/node/pull/20504\n' +
    "    description: The API is accessible via `require('fs').promises` only.\n" +
    '-->\n' +

*/
