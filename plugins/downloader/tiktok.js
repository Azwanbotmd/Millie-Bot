import { ttdl } from '../../lib/download.js'
export let on = async (m, {
    conn,
    text,
    mess
}) => { 
    if (!text) return m.reply('Masukan tiktok contoh .tiktok https://vt.tiktok.com/ZSLgavgpQ/');    
    let {
        video,
        title,
        nickname,
        username,
        duration,
        comment,
        playcount,
        share
    } = await ttdl(text);
    m.reply(mess.wait);
    conn.sendFile(m.chat, video, {
        caption: `🎗 *TIKTOK*
Username: ${nickname}
Judul : ${title}
username : ${username}
duration : ${duration}
comment : ${comment}
playcount : ${playcount}
share : ${share}`,
        quoted : m
    })    
};

on.names = ['Downloader'];
on.tags = ['tiktok', 'titit'];
on.command = ['tt', 'tiktok', 'ttdl', 'titit', 'ttnowm'];
on.limit = 2