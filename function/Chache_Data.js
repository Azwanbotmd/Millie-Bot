const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment');

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
  //console.log('Welcome.....');
  fs.watchFile(require.resolve(module), async () => {
    await uncache(require.resolve(module));
    cb(module);
  });
}

function _0x45bc(){const _0x5540bb=['1820CgZLzC','\x22\x20Telah\x20diupdate!','996078AakVlv','cyanBright','readdirSync','392001EYhlZH','9693ZhdbSa','join','3EzHRSa','2752101DDyKRU','2575928lDjHwm','7UpaGPh','../plugins','endsWith','4316aRobIf','5UpdcdO','842066uQvkoe','log','path'];_0x45bc=function(){return _0x5540bb;};return _0x45bc();}const _0xb6e5af=_0x2f30;(function(_0x5a637d,_0x3b4571){const _0x40c18a=_0x2f30,_0x2db567=_0x5a637d();while(!![]){try{const _0x925de8=-parseInt(_0x40c18a(0x10f))/0x1+-parseInt(_0x40c18a(0x107))/0x2*(-parseInt(_0x40c18a(0x112))/0x3)+-parseInt(_0x40c18a(0x105))/0x4*(parseInt(_0x40c18a(0x106))/0x5)+-parseInt(_0x40c18a(0x10c))/0x6*(parseInt(_0x40c18a(0x115))/0x7)+parseInt(_0x40c18a(0x114))/0x8+parseInt(_0x40c18a(0x110))/0x9*(-parseInt(_0x40c18a(0x10a))/0xa)+parseInt(_0x40c18a(0x113))/0xb;if(_0x925de8===_0x3b4571)break;else _0x2db567['push'](_0x2db567['shift']());}catch(_0x243aa2){_0x2db567['push'](_0x2db567['shift']());}}}(_0x45bc,0x3a21c));function _0x2f30(_0x3104e8,_0x142f0c){const _0x45bcda=_0x45bc();return _0x2f30=function(_0x2f3085,_0x19bee0){_0x2f3085=_0x2f3085-0x104;let _0x35bee2=_0x45bcda[_0x2f3085];return _0x35bee2;},_0x2f30(_0x3104e8,_0x142f0c);}const path=require(_0xb6e5af(0x109)),pluginsFolder=path[_0xb6e5af(0x111)](__dirname,_0xb6e5af(0x116)),files=fs[_0xb6e5af(0x10e)](pluginsFolder);for(const file of files){if(file[_0xb6e5af(0x104)]('.js')){const pluginPath=path[_0xb6e5af(0x111)](pluginsFolder,file),plugin=require(pluginPath);nocache(pluginPath,_0x3c2244=>console[_0xb6e5af(0x108)](chalk['greenBright']('[\x20Millie\x20MD\x20]\x20\x20')+time+chalk[_0xb6e5af(0x10d)]('\x20\x22'+_0x3c2244+_0xb6e5af(0x10b))));}}

require('../main');
nocache('../main', module =>
  console.log(chalk.greenBright('[ Millie MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`))
);

require('../handler');
nocache('../handler', module =>
  console.log(chalk.greenBright('[ Millie MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`))
);

require('./func_Server');
nocache('./func_Server', module =>
  console.log(chalk.greenBright('[ Millie MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`))
);

module.exports = {
  nocache,
  uncache
};
