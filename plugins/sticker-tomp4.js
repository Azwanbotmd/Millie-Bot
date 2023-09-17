exports.on = async ( msg, { conn, command, mess, isQuotedSticker, webp2mp4File, isSticker, ceklimit, limitnya }) => {
const name = ["MAKER"];  
const tag = ["tovideo"];
const help = ["tomp4", "tovideo"]
const limit = 2

    if (help.includes(command)) {       
       if (ceklimit) return msg.reply(mess.limit)
       if (isSticker || isQuotedSticker){
       await conn.downloadAndSaveMediaMessage(msg, "sticker", `./tmp/${msg.sender.split("@")[0]}.webp`)
       let buffer = `./tmp/${msg.sender.split("@")[0]}.webp`
       msg.reply(mess.wait)
       let webpToMp4 = await webp2mp4File(buffer)
       conn.sendMessage(msg.chat, { video: {url:webpToMp4.result}, caption: 'Berhasil Ke Video'}, { quoted: msg })
       await limitnya(msg.sender, limit)
      } else {
         msg.reply('*Reply sticker gif atau stiker video dengan pesan #tovideo*')
        }
    }
};