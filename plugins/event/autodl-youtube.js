import { ytmp4 } from '../../lib/download.js'
export let event = async (m, {
    conn,
    budy,
    limitnya,
    ceklimit,
    mess
}) => {
    if (!m.isBaileys && budy.includes('youtu')) {
        if (ceklimit) return m.reply(mess.limit);
        m.reply(`Tunggu...`)
        let {
            title,
            video,
            quality,
            thumbnail,
            size
        } = await ytmp4(budy);
        conn.sendFile(m.chat, video, {
            caption: `🍌 Youtube Video \nJudul : ${title}\nKualitas : ${quality}\nSize : ${size}`,
            quoted: m
        })
        limitnya(m.sender, 3)
    }
}
