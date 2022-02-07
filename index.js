#!/usr/bin/env node

import { readFileSync } from 'fs'

const filepath = new URL('docs/buffer.md', import.meta.url).pathname
const initial = readFileSync(filepath).toString()

// split into text blocks and code blocks
const printBlocks = opts => {
  const { index, num, result, source, title, verbose } = opts
  const localSource = [ ...opts.source ]
  
  if (!source[index]) return result

  const parsed = localSource[index].split('\n').slice(1).join('\n')
  result.push(parsed)
    
  if (verbose) console.log(
    `\n\x1b[1m\x1b[38;5;161m<${title}-${num}>\x1b[0m\n\n` + 
    parsed + 
    `\n\x1b[38;5;52m</${title}-${num}>\x1b[0m\n\n`
  )

  return printBlocks({
    ...opts,
    source: localSource,
    index: index + 2,
    num: num + 1
  })
}

const codeBlocks = printBlocks({ source: initial.split('```'), index: 1, num: 0, result: [], title: 'Code' })
const textBlocks = printBlocks({ source: initial.split('```'), index: 0, num: 0, result: [], title: 'Text'})

// get rid of YAML comments
const yamlStripped = []

// TODO check + recurse if multiple instances
for (let i = 0; i < textBlocks.length; i += 1) {
    const text = textBlocks[i]
    const start = textBlocks[i].indexOf('<!-- YAML')
    const end = textBlocks[i].indexOf('-->')
    if (start < 0 || end < 0) yamlStripped.push(text)
    else {
      const firstHalf = text.slice(0, start)
      const lastHalf = text.slice(end + '-->'.length)
      yamlStripped.push(firstHalf + lastHalf)
    }
}

// log results
// console.log('\x1Bc\x1b[3J')
for (let i = 0; i < textBlocks.length - 1; i += 1) {
  console.log(
    `\n\n-------\n\x1b[38;5;52minitial (${i})\x1b[0m\n-------\n\n`,
    textBlocks[i],
    `\n\n-----------\n\x1b[1m\x1b[38;5;161mno yaml (${i})\x1b[0m\n-----------\n\n`,
    yamlStripped[i]
  )
}
