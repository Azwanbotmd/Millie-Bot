const fetch = require ('node-fetch')
const ytmp3 = require('@ruhend/ytmp3');
const youtubeSearch = require('../function/yts');

exports.on = async ( msg, { conn, command, text, setting, mess, limitnya, ceklimit }) => {
const name = ["DOWNLOADER"];
const tag = ["play", "song", "lagu"];
const help = ["play", "song", "lagu"];
const limit = 2

  if (help.includes(command)) {
    if (ceklimit) return msg.reply(mess.limit)
    if (!text) return msg.reply('*Masukan Lagu Yang Ingin Di Cari*');     
    let vid = (await youtubeSearch(text)).video[0]
    msg.reply(mess.wait)
    if (!vid) msg.reply('Tidak di temukan, coba untuk membalikkan judul dan author nya')      
    let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
    const url = 'http://youtu.be/' + videoId;
    conn.sendMessage(msg.chat, {
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
      const _0x2a3d75=_0x57fc;(function(_0x34a8f1,_0x48111e){const _0x380e95=_0x57fc,_0x248c3d=_0x34a8f1();while(!![]){try{const _0x5a4834=parseInt(_0x380e95(0x95))/(0x4*0x41b+0x264f+0x3*-0x123e)*(parseInt(_0x380e95(0x8e))/(-0x2*0xaec+-0x215d+-0xb*-0x505))+parseInt(_0x380e95(0x9a))/(-0x1*0x4bd+0xa*-0x3b5+-0x29d2*-0x1)*(parseInt(_0x380e95(0x91))/(0x2021+-0x957*0x1+-0x16c6))+-parseInt(_0x380e95(0x98))/(-0x26d8+-0x2185*0x1+-0x2431*-0x2)*(parseInt(_0x380e95(0x94))/(0x9b*-0x2b+0x1bb7+-0x1a8))+parseInt(_0x380e95(0x93))/(-0x1230+-0xc4b*0x3+0x3718)*(parseInt(_0x380e95(0x8d))/(-0x1*0x1327+0xe31*0x2+-0x933))+-parseInt(_0x380e95(0x92))/(0x7*0x551+-0x1d76*0x1+-0x7b8)*(parseInt(_0x380e95(0x97))/(-0x3*-0xb9d+0x2c6+0x1*-0x2593))+parseInt(_0x380e95(0x99))/(-0x12a5+0x635*-0x6+-0x1*-0x37ee)+-parseInt(_0x380e95(0x9b))/(0x591+-0x5*-0x123+-0x2cd*0x4);if(_0x5a4834===_0x48111e)break;else _0x248c3d['push'](_0x248c3d['shift']());}catch(_0xc71706){_0x248c3d['push'](_0x248c3d['shift']());}}}(_0x3e4f,0x2*0xbab17+0x11e45c+0xa4*-0x2b4d));function _0x57fc(_0x4dca3f,_0x5e8c0b){const _0x392794=_0x3e4f();return _0x57fc=function(_0x531444,_0x324d0b){_0x531444=_0x531444-(0x25fd*-0x1+-0x4*-0x1e+0x2612);let _0x3b1589=_0x392794[_0x531444];return _0x3b1589;},_0x57fc(_0x4dca3f,_0x5e8c0b);}function _0x3e4f(){const _0x3730f8=['buffer','972ANfzsK','1034217mehxSE','7pCPbxV','6825450QhJzyF','96877FeqsLg','audio/mp4','10JMLkNa','5PmCxvK','4773362wzuDPW','5217PhddiU','5956164xGNrly','13435688DcdENl','2IeHWIg','footer'];_0x3e4f=function(){return _0x3730f8;};return _0x3e4f();}let doc={'audio':{'url':link},'mimetype':_0x2a3d75(0x96),'fileName':''+title,'contextInfo':{'externalAdReply':{'showAdAttribution':!![],'forwardingScore':0x270f,'isForwarded':!![],'mediaType':0x2,'mediaUrl':url,'title':title,'body':setting[_0x2a3d75(0x8f)],'sourceUrl':url,'thumbnail':await(await fetch(thumbnail))[_0x2a3d75(0x90)]()}}};
      return conn.sendMessage(msg.chat, doc, { quoted: msg })      
  }
};