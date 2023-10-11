import { fbdl } from '../../lib/download.js'

export let event = async (m, {
    conn,
    budy,
    Limit,
    checkLimitUser,
    mess
}) => {
    if (!m.isBaileys && /(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.gg)\/[^\s/]+(?:\/videos\/\d+\/?)?/.test(budy)) {
        if (checkLimitUser(m.sender) <= 0) {
            return m.reply(mess.limit);
        }
        m.reply(`Tunggu...`);
        let {
            video
        } = await fbdl(budy);
        conn.sendFile(m.chat, video, {
            caption: `🍌 Facebook`,
            quoted: m
        });
        Limit(m.sender, 3);
    }
}