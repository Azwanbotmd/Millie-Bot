const fs = require('fs')
const { exec } = require("child_process");
exports.on = async ( msg, { conn, command, mess, isQuotedSticker, getRandom, isSticker, ceklimit, limitnya }) => {
const name = ["MAKER"];  
const tag = ["toimage"];
const help = ["toimg", "toimage"]
const limit = 2
  
   if (help.includes(command)) {   
     if (ceklimit) return msg.reply(mess.limit)
     if (isSticker || isQuotedSticker) {
     await conn.downloadAndSaveMediaMessage(msg, "sticker", `./tmp/${msg.sender.split("@")[0]}.webp`)
     let buffer = fs.readFileSync(`./tmp/${msg.sender.split("@")[0]}.webp`)
     var rand1 = 'tmp/'+getRandom('.webp')
     var rand2 = 'tmp/'+getRandom('.png')
     fs.writeFileSync(`./${rand1}`, buffer)
     msg.reply(mess.wait)
     exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
     if (err) return msg.reply(mess.error.api)
     conn.sendMessage(msg.chat, {caption: `*Berhasil Ke Image!*`, image: fs.readFileSync(`./${rand2}`) }, { quoted: msg }) })
     await limitnya(msg.sender, limit)
    } else {
     msg.reply('*Reply sticker nya dengan pesan .toimg*\n\n*Atau bisa sticker gif dengan pesan #tovideo*')
       }
    }
}