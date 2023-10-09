import { fbdl } from '../../lib/download.js'
export let on = async (m, {
    conn,
    text,
    prefix,
    command
}) => {
    if (!text) return m.reply(`Masukan link facebook nya! \nContoh: ${prefix + command} https://www.facebook.com/vvalent228/videos/658537269609282/?mibextid=h4kR3UXRu7XTHhH5`);
    m.reply('Loading...')
    let {
        video
    } = await fbdl(text)
    conn.sendFile(m.chat, video, {
        caption: `🎗 Facebook`,
        quoted: m
    })    
};

on.names = ['Downloader'];
on.tags = ['facebook'];
on.command = ['fb', 'facebook', 'fbdl'];
on.limit = 8