#!/usr/bin/env node

import { readFileSync } from 'fs'


const filepath = new URL('docs/os.md', import.meta.url).pathname

const doc = readFileSync(filepath).toString()

const codeSplit = doc.split('```')
const len = Math.floor(codeSplit.length / 2)

// get odd indexes (1, 3, 5...)
let cur = 1
let num = 1


const printCodeBlocks = (interval = 750) => {
  if (!codeSplit[cur]) {
    console.log('done')
    process.exit(0)
  }
  const header = `// example ${num}/${len}\n\n`
  const formattedCode = header + codeSplit[cur].split('\n').slice(1).join('\n')
  console.log(formattedCode)

  setTimeout(() => {
    cur += 2
    num += 1
    printCodeBlocks()
  }, interval)
}

printCodeBlocks(250)
