import fetch from 'node-fetch'
import { youtubeSearch } from '../../lib/yts.js'
import { ytmp3 } from '../../lib/download.js'
export let on = async (m, {
    conn,
    text,
    mess,
    setting
}) => { 
    if (!text) return m.reply('*Masukan Lagu Yang Ingin Di Cari*');
    let vid = (await youtubeSearch(text)).video[0]
    m.reply(mess.wait)
    if (!vid) m.reply('Tidak di temukan, coba untuk membalikkan judul dan author nya')
    let {
        title,
        description,
        thumbnail,
        videoId,
        durationH,
        viewH,
        publishedTime
    } = vid
    const url = 'http://youtu.be/' + videoId;
    conn.sendMessage(m.chat, {
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
    }, {
        quoted: m
    });
    const {
        audio
    } = await ytmp3(url);
    const link = audio
    
    const _0x1f960f=_0x45be;function _0x45be(_0xdbbed4,_0x4b5449){const _0x57543e=_0x245e();return _0x45be=function(_0x3d9f6a,_0x11e855){_0x3d9f6a=_0x3d9f6a-(0x751+-0x1b4d*-0x1+0x2f*-0xb3);let _0x22b6fe=_0x57543e[_0x3d9f6a];return _0x22b6fe;},_0x45be(_0xdbbed4,_0x4b5449);}function _0x245e(){const _0x14956f=['footer','20765ENCoPK','audio/mp4','3150042KLvWaE','5502308avasCB','1112658lURYmj','19835352JlZByn','2509285eyRRVA','82xrevMT','748956ZpsJCV','buffer'];_0x245e=function(){return _0x14956f;};return _0x245e();}(function(_0x207a05,_0x239992){const _0x5b0734=_0x45be,_0x4a3f94=_0x207a05();while(!![]){try{const _0x4768eb=-parseInt(_0x5b0734(0x1c9))/(0x1*0xd23+-0x2*-0x6c5+-0x1aac)*(parseInt(_0x5b0734(0x1c5))/(0x86e+-0x61*0x5b+0x1a0f))+-parseInt(_0x5b0734(0x1c2))/(0x27*0xaf+0x1506+-0x2fac*0x1)+parseInt(_0x5b0734(0x1c6))/(-0x5*0x29+0x16*-0x187+0xb79*0x3)+-parseInt(_0x5b0734(0x1c4))/(0x5b9+-0x1*0x823+0x7*0x59)+parseInt(_0x5b0734(0x1cb))/(0x1*0x1426+0xaa9+-0x1ec9)+-parseInt(_0x5b0734(0x1c1))/(0x11c8+-0x1ab8+0x8f7)+parseInt(_0x5b0734(0x1c3))/(0xd91+0xc1e+-0x19a7);if(_0x4768eb===_0x239992)break;else _0x4a3f94['push'](_0x4a3f94['shift']());}catch(_0x4e2f7e){_0x4a3f94['push'](_0x4a3f94['shift']());}}}(_0x245e,0x1*0x100207+-0x6ecc*-0x13+-0x24e2b*0x6));let doc={'audio':{'url':link},'mimetype':_0x1f960f(0x1ca),'fileName':''+title,'contextInfo':{'externalAdReply':{'showAdAttribution':!![],'forwardingScore':0x270f,'isForwarded':!![],'mediaType':0x2,'mediaUrl':url,'title':title,'body':setting[_0x1f960f(0x1c8)],'sourceUrl':url,'thumbnail':await(await fetch(thumbnail))[_0x1f960f(0x1c7)]()}}};
    return conn.sendMessage(m.chat, doc, {
        quoted: m
    })    
}

on.names = ['Downloader'];
on.tags = ['play', 'song', 'lagu'];
on.command = ['play', 'song', 'lagu'];
on.limit = 2