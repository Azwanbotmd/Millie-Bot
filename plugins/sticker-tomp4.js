import { webp2mp4File } from "../lib/Webp_Tomp4.js"
export let on = async (m, {
    conn,
    mess,
    isSticker,
    isQuotedSticker   
 }) => {
    if (isSticker || isQuotedSticker) {
        await conn.downloadAndSaveMediaMessage(m, "sticker", `./tmp/${m.sender.split("@")[0]}.webp`)
        let buffer = `./tmp/${m.sender.split("@")[0]}.webp`
        m.reply(mess.wait)
        let webpToMp4 = await webp2mp4File(buffer)
        conn.sendMessage(m.chat, {
            video: {
                url: webpToMp4.result
            },
            caption: 'Berhasil Ke Video'
        }, {
            quoted: m
        })

    } else {
        m.reply('*Reply sticker gif atau stiker video dengan pesan .tovideo*')
    }
};

on.names = ['Maker'];
on.tags = ['tovideo'];
on.command = ['tomp4', 'tovideo']
on.limit = 2