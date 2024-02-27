/*
Copyright (C) 2021. Licensed under the GPL-3.0 License; You may not use this file except in compliance with the License. It is supplied in the hope that it may be useful.

@project_name : Jessi-MD
@author : Jessi2Devolop Team https://github.com/jessi2devolop
@description : Jessi-MD, A Fully AI powerd multi-functional whatsapp bot.
@version : 4.8
*/


console.log('Starting Bot...')

import yargs from 'yargs'; import cfonts from 'cfonts'; import { fileURLToPath } from 'url'; import { join, dirname } from 'path'; import { createRequire } from 'module'; import { createInterface } from 'readline'; import { setupMaster, fork } from 'cluster'; import { watchFile, unwatchFile } from 'fs';

// https://stackoverflow.com/a/50052194
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)

say('Jessi\nWhatsApp Bot MD', { font: 'chrome', align: 'center', gradient: ['red', 'magenta'] })
say('Bot created by White Shadow', { font: 'console', align: 'center', gradient: ['red', 'magenta'] })

var isRunning = false
/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [join(__dirname, file), ...process.argv.slice(2)]
  say([process.argv[0], ...args].join(' '), { font: 'console', align: 'center', gradient: ['red', 'magenta'] })
  setupMaster({ exec: args[0], args: args.slice(1) })
  let p = fork()
  p.on('message', data => {
    console.log('[✅RECEIVED]', data)
    switch (data) {
      case 'reset':
        p.process.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  p.on('exit', (_, code) => {
    isRunning = false
    console.error('Exited with code:', code)
    if (code !== 0) return start(file)
    watchFile(args[0], () => {
      unwatchFile(args[0])
      start(file)
    })
  })
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim())
    })
  // console.log(p)
}

start('main.js')
