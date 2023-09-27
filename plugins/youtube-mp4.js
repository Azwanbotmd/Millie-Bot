const { ytmp4 } = require ('@ruhend/scraper');
exports.on = async ( msg, { conn, command, text, mess, ceklimit, limitnya }) => { try {
const name = ["DOWNLOADER"];
const tag = ["ytmp4"];
const help = ["ytmp4", "ytv"]
const limit = 4
  
  if (help.includes(command)) {      
      if (ceklimit) return msg.reply(mess.limit)
      if (!text) return msg.reply('*Masukan Link Youtubenya*');      
      msg.reply(`Tunggu...`)
      let { title, video , quality, thumbnail, size } = await ytmp4(text);      
      conn.sendFile(msg.chat, video, { caption : `🎗Youtube Video \nJudul : ${title}\nKualitas : ${quality}\nSize : ${size}` , quoted : msg })
      limitnya(msg.sender, limit)      
     }
   } catch (error) {
    console.error(error)
    msg.reply(`${error}`)
   }
}
