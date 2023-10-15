console.log('🐽 Starting...')
import { join, dirname } from 'path'
import { createRequire } from "module";
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts';
import { createInterface } from 'readline'
import yargs from 'yargs'
import './lib/LocationData.js' 
process.on('uncaugtException', console.log)
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)

say('Millie-Bot', {
    font: 'chrome',
    align: 'center',
    colors: ['red', 'magenta']
})
say(`Multi Device\n\n By Ruly Henderson`, {
    font: 'chrome',
    align: 'center',
    colors: ['red', 'magenta']
})

var isRunning = false
function start(file) {
    if (isRunning) return
    isRunning = true
    let args = [join(__dirname, file), ...process.argv.slice(2)]
    say([process.argv[0], ...args].join(' '), {
        font: 'console',
        align: 'center',
        colors: ['yellow']
    })
    say('🍌 MEMUAT SOURCE...', {
        font: 'console',
        align: 'center',
        colors: ['white']
    })
    say('🍌 MEMUAT PLUGINS...', {
        font: 'console',
        align: 'center',
        colors: ['green']
    })
    say('🍌 Selesai !', {
        font: 'console',
        align: 'center',
        colors: ['white']
    })
    setupMaster({
        exec: args[0],
        args: args.slice(1),
    })
    let p = fork()
    p.on('uncaugtException', console.log)
    p.on('message', data => {
        console.log('[ Millie-Bot ]', data)
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
        console.error('[❗] Exited with code:', code)
        if (code === 0) return
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
}

start('main.js')