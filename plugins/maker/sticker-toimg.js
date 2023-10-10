import fs from 'fs'
import { exec } from 'child_process'

export let on = async (m, {
    conn,
    mess,
    isQuotedSticker,
    getRandom,
    isSticker
}) => {  
    if (isSticker || isQuotedSticker) {
        await conn.downloadAndSaveMediaMessage(m, "sticker", `./tmp/${m.sender.split("@")[0]}.webp`)
        let buffer = fs.readFileSync(`./tmp/${m.sender.split("@")[0]}.webp`)
        var rand1 = 'tmp/' + getRandom('.webp')
        var rand2 = 'tmp/' + getRandom('.png')
        fs.writeFileSync(`./${rand1}`, buffer)
        m.reply(mess.wait)
        await exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
            if (err) return m.reply(mess.error.api)
            conn.sendMessage(m.chat, {
                caption: `*Berhasil Ke Image!*`,
                image: fs.readFileSync(`./${rand2}`)
            }, {
                quoted: m
            })
        })

    } else {
        m.reply('*Reply sticker nya dengan pesan .toimg*\n\n*Atau bisa sticker gif dengan pesan #tovideo*')
    }
};

on.names = ['Maker'];
on.tags = ['toimage'];
on.command = ['toimg', 'toimage'];
on.limit = 2