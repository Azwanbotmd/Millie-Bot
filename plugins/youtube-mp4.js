const { ytmp4 } = require ('@ruhend/scraper');
exports.on = async ( msg, { conn, command, text, mess, ceklimit, limitnya }) => {
const name = ["DOWNLOADER"];
const tag = ["ytmp4"];
const help = ["ytmp4", "ytv"]
const limit = 4
  
  if (help.includes(command)) {      
      if (ceklimit) return msg.reply(mess.limit)
      if (!text) return msg.reply('*Masukan Link Youtubenya*');      
      msg.reply(`Tunggu...`)
      let { title, video } = await ytmp4(text);      
      conn.sendFile(msg.chat, video, { caption : `🎗Youtube Video \nJudul : ${title}` , quoted : msg })
      limitnya(msg.sender, limit)      
   }
}
