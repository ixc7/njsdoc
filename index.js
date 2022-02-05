#!/usr/bin/env node

import { readFileSync } from 'fs'

const filepath = new URL('docs/fs.md', import.meta.url).pathname
const doc = readFileSync(filepath).toString().split('```')

let index = 1
let num = 1
let result = ''

const printCodeBlocks = (result = '') => {
  if (!doc[index]) return result

  result += 
    `\n\n// block \x1b[1m${num}\x1b[0m\n\n` +
    doc[index].split('\n').slice(1).join('\n')

  num += 1
  index += 2
  
  return printCodeBlocks(result)
}

console.clear()
console.log(printCodeBlocks())
