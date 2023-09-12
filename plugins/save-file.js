const handler = require('../handler');
module.exports = async (conn, msg, setting) => { try {
const { from, fs, quotedMsg, isOwner, q, command, reply } = handler(msg, conn, setting);
const name = ["OWNER"];
const tag = ["simpan", "sf"];
const help = ["simpan", "save", "sf"]
    
   if (help.includes(command)) {       
      if (!isOwner) return reply('Khusus Pemilik Bot !');
      if (!q) return reply('contoh .sf plugins/cinta.js atau file js yang ingin kamu save');                  
        let path = `${q}`
        function _0x92b8(){var _0x53c876=['writeFileSync','6789dtmBid','17095rOskON','996ArxhsW','10087090FfnXOG','1148450hyfVth','824QJVcRH','3008889ZMnhfm','1683178oIxdoJ','8qjqPsk','297594aDAtEV','chats'];_0x92b8=function(){return _0x53c876;};return _0x92b8();}var _0x4c8950=_0xbde4;function _0xbde4(_0x4a65cc,_0x1b83c3){var _0x92b83b=_0x92b8();return _0xbde4=function(_0xbde47f,_0x10f177){_0xbde47f=_0xbde47f-0x102;var _0x48d8dd=_0x92b83b[_0xbde47f];return _0x48d8dd;},_0xbde4(_0x4a65cc,_0x1b83c3);}(function(_0x5eb627,_0x3626a4){var _0xde7674=_0xbde4,_0x4346d9=_0x5eb627();while(!![]){try{var _0x23bdda=-parseInt(_0xde7674(0x10d))/0x1+parseInt(_0xde7674(0x108))/0x2+parseInt(_0xde7674(0x104))/0x3*(-parseInt(_0xde7674(0x109))/0x4)+-parseInt(_0xde7674(0x105))/0x5*(parseInt(_0xde7674(0x106))/0x6)+-parseInt(_0xde7674(0x10b))/0x7+-parseInt(_0xde7674(0x10c))/0x8*(-parseInt(_0xde7674(0x10a))/0x9)+parseInt(_0xde7674(0x107))/0xa;if(_0x23bdda===_0x3626a4)break;else _0x4346d9['push'](_0x4346d9['shift']());}catch(_0xc148df){_0x4346d9['push'](_0x4346d9['shift']());}}}(_0x92b8,0x54583),await fs[_0x4c8950(0x103)](path,quotedMsg[_0x4c8950(0x102)]));
        reply(`tersimpan di ${path}`)        
    }
  } catch (error) {
    const { reply } = handler(msg, conn, setting);
    console.error(error);
    if (error) {
      reply(`Eror Saat Menyimpan File`);
    }
  }
};
