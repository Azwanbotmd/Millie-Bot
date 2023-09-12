const handler = require('../handler');
const fs =  require('fs')
module.exports = async (conn, msg, setting) => {
const { from, isQuotedSticker, mess, webp2mp4File, sender, isSticker, command, reply, limitnya, ceklimit, daftar } = handler(msg, conn, setting);
const name = ["CONVERTER MAKER"];  
const tag = ["tovideo"];
const help = ["tomp4", "tovideo"]
const limit = 2

 if (help.includes(command)) {
   if (daftar) return reply(mess.daftar)
   if (ceklimit) return reply(mess.limit)
   if (isSticker || isQuotedSticker){
   await conn.downloadAndSaveMediaMessage(msg, "sticker", `./tmp/${sender.split("@")[0]}.webp`)
   let buffer = `./tmp/${sender.split("@")[0]}.webp`
   reply(mess.wait)
   let webpToMp4 = await webp2mp4File(buffer)
   conn.sendMessage(from, { video: {url:webpToMp4.result}, caption: 'Berhasil Ke Video'}, { quoted: msg })
   await limitnya(sender, limit)
   reply(`${limit} Limit Terpakai`)
} else {
reply('*Reply sticker gif atau stiker video dengan pesan #tovideo*')
}
}
}