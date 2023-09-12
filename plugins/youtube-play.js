const handler = require('../handler');
const ytmp3 = require('@ruhend/ytmp3');
const youtubeSearch = require('../function/yts');

module.exports = async (conn, msg, setting) => {
const { from, fetch, q, command, reply, sender, limitnya, ceklimit, daftar, mess } = handler(msg, conn, setting);
const name = ["DOWNLOADER"];
const tag = ["play", "song", "lagu"];
const help = ["play", "song", "lagu"];
const wm = `© Cinta`
const limit = 2

  if (help.includes(command)) {
    if (daftar) return reply(mess.daftar)
    if (ceklimit) return reply(mess.limit)
    if (!q) return reply('*Masukan Lagu Yang Ingin Di Cari*');     
    let vid = (await youtubeSearch(q)).video[0]
    reply(`*Loading...*`)
    if (!vid) throw 'Tidak di temukan, coba untuk membalikkan judul dan author nya'      
    let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
    const url = 'http://youtu.be/' + videoId;

    conn.sendMessage(from, {
      image: {
        url: thumbnail
      },
      caption: `╭──── 〔 YOUTUBE 〕 ─⬣
      
*Data Di Temukan*
⬡ Judul: ${title}
⬡ Durasi: ${durationH}
⬡ Views: ${viewH}
⬡ Upload: ${publishedTime}
⬡ Link: ${url}
╰────────⬣

*Loading Audio Sedang Dikirim...*`
    }, { quoted: msg });
      const yt = await ytmp3(url);
      const link = await yt.download;     
      function _0x3cba(_0x4bfc2d,_0x3160a7){var _0x95deee=_0x95de();return _0x3cba=function(_0x3cba85,_0x470eef){_0x3cba85=_0x3cba85-0x7c;var _0x40e5e7=_0x95deee[_0x3cba85];return _0x40e5e7;},_0x3cba(_0x4bfc2d,_0x3160a7);}(function(_0x190b78,_0x42ddbc){var _0x285fa2=_0x3cba,_0x42b572=_0x190b78();while(!![]){try{var _0x27b012=-parseInt(_0x285fa2(0x84))/0x1+parseInt(_0x285fa2(0x83))/0x2*(parseInt(_0x285fa2(0x86))/0x3)+-parseInt(_0x285fa2(0x82))/0x4+parseInt(_0x285fa2(0x81))/0x5*(-parseInt(_0x285fa2(0x7c))/0x6)+parseInt(_0x285fa2(0x85))/0x7*(parseInt(_0x285fa2(0x80))/0x8)+-parseInt(_0x285fa2(0x7f))/0x9+-parseInt(_0x285fa2(0x7d))/0xa*(-parseInt(_0x285fa2(0x7e))/0xb);if(_0x27b012===_0x42ddbc)break;else _0x42b572['push'](_0x42b572['shift']());}catch(_0x10cd5f){_0x42b572['push'](_0x42b572['shift']());}}}(_0x95de,0x68e2e),conn['sendMessage'](from,{'audio':{'url':link},'mimetype':'audio/mp4','fileName':title,'contextInfo':{'externalAdReply':{'showAdAttribution':!![],'forwardingScore':0x270f,'isForwarded':!![],'mediaType':0x2,'mediaUrl':url,'title':title,'body':wm,'sourceUrl':url,'thumbnail':await(await fetch(thumbnail))['buffer']()}}},{'quoted':msg}));function _0x95de(){var _0x5755fe=['198759XMrnPa','4554648LGYHST','318088WjLmkj','285305NHfRYj','3088780Bqgyht','150MxbNwd','62691ZVMsKZ','140gtPooN','12120VCQfvP','30kMxtvT','530MTSCHL'];_0x95de=function(){return _0x5755fe;};return _0x95de();}
      await limitnya(sender, limit)
      reply(`${limit} Limit Terpakai`)
    }
};
