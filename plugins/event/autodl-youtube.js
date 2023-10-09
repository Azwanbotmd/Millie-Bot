import { ytmp3 } from '../../lib/download.js'
export let event = async (m, {
    conn,
    budy,
    limitnya,
    ceklimit,
    mess
}) => {
    if (budy.includes('youtu')) {
        if (ceklimit) return m.reply(mess.limit);
        m.reply(`Tunggu...`)
        let {
            title,
            audio
        } = await ytmp3(budy);
        conn.sendMessage(m.chat, {
            document: {
                url: audio
            },
            fileName: `${title}~RuhendMD.mp3`,
            mimetype: 'audio/mpeg'
        }, {
            quoted: m
        })
        limitnya(m.sender, 3)
    }
}