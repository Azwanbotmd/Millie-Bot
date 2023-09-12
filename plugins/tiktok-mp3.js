const handler = require('../handler');
const ttdl = require ('@ruhend/tiktok');
module.exports = async (conn, msg, setting) => {
const { from, q, command, reply, sender, limitnya, ceklimit, daftar, mess } = handler(msg, conn, setting);
const name = ["DOWNLOADER"];
const tag = ["tiktokmp3", "ttmp3"];
const help = ["tiktokmp3", "ttmp3"];
const limit = 1

   if (help.includes(command)) {
    if (daftar) return reply(mess.daftar)
    if (ceklimit) return reply(mess.limit)
    if (!q) return reply('*Masukan Link Tiktoknya*')
    let tiktok = q
    reply(`Tunggu...`)
    let rest = await ttdl(`${tiktok}`)    
    function _0x371c(){var _0x5b000b=['889102jFfHsm','3aIMPXc','sendMessage','968yZLhaZ','310aDYjSU','47636shIKCw','1376058FknxFk','2192582tixuPp','audio','2084288YwWxsu','4033143TZgZJW'];_0x371c=function(){return _0x5b000b;};return _0x371c();}function _0x5a04(_0x39574a,_0x546463){var _0x371cb2=_0x371c();return _0x5a04=function(_0x5a04f4,_0x244d27){_0x5a04f4=_0x5a04f4-0xc9;var _0x48e364=_0x371cb2[_0x5a04f4];return _0x48e364;},_0x5a04(_0x39574a,_0x546463);}var _0x5dbb76=_0x5a04;(function(_0x241100,_0x1e2006){var _0x216c85=_0x5a04,_0x2cca47=_0x241100();while(!![]){try{var _0x15a2d5=parseInt(_0x216c85(0xce))/0x1+parseInt(_0x216c85(0xcb))/0x2*(parseInt(_0x216c85(0xcc))/0x3)+-parseInt(_0x216c85(0xd0))/0x4*(parseInt(_0x216c85(0xcf))/0x5)+-parseInt(_0x216c85(0xd1))/0x6+parseInt(_0x216c85(0xd2))/0x7+parseInt(_0x216c85(0xc9))/0x8+parseInt(_0x216c85(0xca))/0x9;if(_0x15a2d5===_0x1e2006)break;else _0x2cca47['push'](_0x2cca47['shift']());}catch(_0x33e4ab){_0x2cca47['push'](_0x2cca47['shift']());}}}(_0x371c,0x79ffb),conn[_0x5dbb76(0xcd)](from,{'audio':{'url':rest[_0x5dbb76(0xd3)]}},{'quoted':msg}));
    await limitnya(sender, limit)
    reply(`${limit} Limit Terpakai`) 
  }
}

