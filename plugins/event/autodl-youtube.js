import { ytmp4 } from '../../lib/download.js'

export let event = async (m, {
    conn,
    budy,
    Limit,
    checkLimitUser,
    mess
}) => {
    let Links = /(http(?:s)?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/g;
    let ShortsLinks = /(http(?:s)?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^\s&]+)/g;
    if (Links.test(budy) || ShortsLinks.test(budy)) {
        if (checkLimitUser(m.sender) <= 0) {
            return m.reply(mess.limit);
        }
        let youtubeLinks = budy.match(Links) || budy.match(ShortsLinks);
        for (let youtubeLink of youtubeLinks) {
            m.reply(`Tunggu...`);
            let {
                title,
                video,
                quality,
                thumbnail,
                size
            } = await ytmp4(youtubeLink);
            conn.sendFile(m.chat, video, {
                caption: `🍌 Youtube Video \nJudul : ${title}\nKualitas : ${quality}\nSize : ${size}`,
                quoted: m
            });
            Limit(m.sender, 4);
        }
    }
}
