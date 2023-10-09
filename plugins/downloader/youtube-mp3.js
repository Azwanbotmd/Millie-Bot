import { ytmp3 } from '../../lib/download.js'
export let on = async (m, {
    conn,
    text
}) => {
    if (!text) return m.reply('*Masukan Link Youtubenya*');
    m.reply(`Tunggu...`)
    let {
        title,
        audio
    } = await ytmp3(text);
    conn.sendMessage(m.chat, {
        document: {
            url: audio
        },
        fileName: `${title}~RuhendMD.mp3`,
        mimetype: 'audio/mpeg'
    }, {
        quoted: m
    })
}

on.names = ['Downloader'];
on.tags = ['ytmp3'];
on.command = ['ytmp3', 'yta']
on.limit = 2