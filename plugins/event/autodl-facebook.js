import { fbdl } from '../../lib/download.js'
export let event = async (m, {
    conn,
    budy,
    limitnya,
    ceklimit,
    mess
}) => {
    if (budy.includes('facebook')) {
        if (ceklimit) return m.reply(mess.limit);
        m.reply(`Tunggu...`)
        let {
            video
        } = await fbdl(budy)
        conn.sendFile(m.chat, video, {
            caption: `🍌 Facebook`,
            quoted: m
        })
        limitnya(m.sender, 3)
    }
}