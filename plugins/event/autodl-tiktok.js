import { ttdl } from '../../lib/download.js'

export let event = async (m, {
    conn,
    budy,
    Limit,
    checkLimitUser,
    mess
}) => {
    let tR = /(http(?:s)?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[^\/]+\/video\/(\d+))|(http(?:s)?:\/\/)?vm\.tiktok\.com\/([^\s&]+)|(http(?:s)?:\/\/)?vt\.tiktok\.com\/([^\s&]+)/g;
    if (!m.isBaileys && tR.test(budy)) {
        if (checkLimitUser(m.sender) <= 0) {
            return m.reply(mess.limit);
        }
        let tiktokLinks = budy.match(tR);
        for (let tiktokLink of tiktokLinks) {
            let {
                video,
                title,
                nickname,
                username,
                duration,
                comment,
                playcount,
                share
            } = await ttdl(tiktokLink);
            m.reply(mess.wait);
            conn.sendFile(m.chat, video, {
                caption: `🍌 *TIKTOK* Username: ${nickname}\nJudul : ${title}\nusername : ${username}\nduration : ${duration}\ncomment : ${comment}\nplaycount : ${playcount}\nshare : ${share}`,
                quoted: m
            });

            Limit(m.sender, 3);
        }
    }
}