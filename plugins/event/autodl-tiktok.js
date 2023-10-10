import { ttdl } from '../../lib/download.js'
export let event = async (m, {
    conn,
    budy,
    limitnya,
    ceklimit,
    mess
}) => {
    if (budy.includes('tiktok')) {
        if (ceklimit) return m.reply(mess.limit);
        m.reply(`Tunggu...`)
        let {
            video,
            title,
            nickname,
            username,
            duration,
            comment,
            playcount,
            share
        } = await ttdl(budy);
        m.reply(mess.wait);
        conn.sendFile(m.chat, video, {
            caption: `🍌 *TIKTOK*
Username: ${nickname}
Judul : ${title}
username : ${username}
duration : ${duration}
comment : ${comment}
playcount : ${playcount}
share : ${share}`,
            quoted: m
        })
        limitnya(m.sender, 3)
    }
}