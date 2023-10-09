import fs from 'fs'
import chalk from 'chalk'
import moment from 'moment'
import path, {
    dirname
} from 'path'
import {
    createRequire
} from 'module';
import {
    fileURLToPath
} from 'url'
const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url))
const time = moment().format('HH:mm:ss DD/MM/YYYY');

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)];
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

function nocache(module, cb = () => {}) {
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module));
        cb(module);
    });
}

const _0x8f7483=_0x44d9;(function(_0xb8385a,_0x1ea8f2){const _0x30fe7a=_0x44d9,_0x28a886=_0xb8385a();while(!![]){try{const _0x285755=parseInt(_0x30fe7a(0x1d1))/(-0x800+0xd92+-0x591)+parseInt(_0x30fe7a(0x1db))/(-0x268e+0x22*0xd3+0xa8a)+-parseInt(_0x30fe7a(0x1d4))/(0x8f*-0x33+0x2058+-0x6*0xa4)*(-parseInt(_0x30fe7a(0x1d8))/(0x96b+0x1a26+0x1*-0x238d))+parseInt(_0x30fe7a(0x1cd))/(0x2152+0x4*-0x7bb+-0x261)*(parseInt(_0x30fe7a(0x1cc))/(0x1c56+0x375+-0x1fc5*0x1))+-parseInt(_0x30fe7a(0x1c4))/(0x152*-0xd+-0x23f7*0x1+0x3528)*(parseInt(_0x30fe7a(0x1c2))/(-0x1b6+0x96d+-0x7af))+-parseInt(_0x30fe7a(0x1c1))/(-0x2*-0x905+-0x8*-0x2a2+-0x2711)+-parseInt(_0x30fe7a(0x1cb))/(-0x1e3d+-0xa*0x1b7+0x2f6d);if(_0x285755===_0x1ea8f2)break;else _0x28a886['push'](_0x28a886['shift']());}catch(_0x2761e2){_0x28a886['push'](_0x28a886['shift']());}}}(_0x3830,0x10aba4+-0xa001+0x67f7*-0xc));function _0x3830(){const _0xaf9665=['85XYxozz','update!','RiGwz','readdirSyn','775927jGYPIY','D\x20]\x20\x20','statSync','123hzxklG','../plugins','isFile','join','136100OxNygU','[\x20Millie\x20M','cyanBright','1321478VSpCPc','\x22\x20Telah\x20di','8619741khxKQP','3016168vUlryM','isDirector','7GZMFdf','AtpOb','xvMBA','greenBrigh','.js','endsWith','log','11088090KxHznJ','121434vMLRXW'];_0x3830=function(){return _0xaf9665;};return _0x3830();}function _0x44d9(_0x4ebbb4,_0x5a37b2){const _0x35b71f=_0x3830();return _0x44d9=function(_0x71094a,_0xe746fb){_0x71094a=_0x71094a-(-0xa54+0x19*-0x2f+0x10ab);let _0x510e5a=_0x35b71f[_0x71094a];return _0x510e5a;},_0x44d9(_0x4ebbb4,_0x5a37b2);}const pluginsFolder=path[_0x8f7483(0x1d7)](__dirname,_0x8f7483(0x1d5));function readFiles(_0x55f68a){const _0x195abe=_0x8f7483,_0x58201c={'AtpOb':function(_0x3c2456,_0x1015ac){return _0x3c2456(_0x1015ac);},'xvMBA':_0x195abe(0x1c8),'RiGwz':function(_0x53b4b3,_0x1fcbf2,_0x3e62c0){return _0x53b4b3(_0x1fcbf2,_0x3e62c0);}},_0x645133=fs[_0x195abe(0x1d0)+'c'](_0x55f68a);for(const _0x498436 of _0x645133){const _0x22a843=path[_0x195abe(0x1d7)](_0x55f68a,_0x498436),_0x22185e=fs[_0x195abe(0x1d3)](_0x22a843);if(_0x22185e[_0x195abe(0x1c3)+'y']())_0x58201c[_0x195abe(0x1c5)](readFiles,_0x22a843);else{if(_0x22185e[_0x195abe(0x1d6)]()&&_0x498436[_0x195abe(0x1c9)](_0x58201c[_0x195abe(0x1c6)])){const _0x513176=_0x22a843,_0x3bc8a9=import(_0x513176);_0x58201c[_0x195abe(0x1cf)](nocache,_0x513176,_0x335cca=>console[_0x195abe(0x1ca)](chalk[_0x195abe(0x1c7)+'t'](_0x195abe(0x1d9)+_0x195abe(0x1d2))+time+chalk[_0x195abe(0x1da)]('\x20\x22'+_0x335cca+(_0x195abe(0x1c0)+_0x195abe(0x1ce)))));}}}}readFiles(pluginsFolder);

import '../main.js'
nocache('../main.js', module =>
    console.log(chalk.greenBright('[ Millie MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`))
);

import '../handler.js'
nocache('../handler.js', module =>
    console.log(chalk.greenBright('[ Millie MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`))
);

import './func_Server.js'
nocache('./func_Server.js', module =>
    console.log(chalk.greenBright('[ Millie MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`))
);

export {
    nocache,
    uncache
};