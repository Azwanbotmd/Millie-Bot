const handler = require('../handler');
const fs =  require('fs')
module.exports = async (conn, msg, setting) => {
const { from, isQuotedSticker, mess, exec, getRandom, ffmpeg, sender, isSticker, command, reply, limitnya, ceklimit, daftar } = handler(msg, conn, setting);
const name = ["CONVERTER MAKER"];  
const tag = ["toimage"];
const help = ["toimg", "toimage"]
const limit = 2
  
 if (help.includes(command)) {
   if (daftar) return reply(mess.daftar)
   if (ceklimit) return reply(mess.limit)
if (isSticker || isQuotedSticker){
await conn.downloadAndSaveMediaMessage(msg, "sticker", `./tmp/${sender.split("@")[0]}.webp`)
let buffer = fs.readFileSync(`./tmp/${sender.split("@")[0]}.webp`)
var rand1 = 'tmp/'+getRandom('.webp')
var rand2 = 'tmp/'+getRandom('.png')
fs.writeFileSync(`./${rand1}`, buffer)
reply(mess.wait)
exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
if (err) return reply(mess.error.api)
conn.sendMessage(from, {caption: `*Berhasil Ke Image!*`, image: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
})
await limitnya(sender, limit)
reply(`${limit} Limit Terpakai`)
} else {
reply('*Reply sticker nya dengan pesan .toimg*\n\n*Atau bisa sticker gif dengan pesan #tovideo*')
}
}
}