const ytmp3 = require ('@ruhend/ytmp3');
exports.on = async ( msg, { conn, command, text, mess, ceklimit, limitnya }) => {
const name = ["DOWNLOADER"];
const tag = ["ytmp3"];
const help = ["ytmp3", "yta"]
const limit = 3
  
  if (help.includes(command)) {      
      if (ceklimit) return msg.reply(mess.limit)
      if (!text) return msg.reply('*Masukan Link Youtubenya*');      
      msg.reply(`Tunggu...`)
      let audio = await ytmp3(text);      
      conn.sendMessage(msg.chat, {
        document: { url: audio.download },
        fileName: `${audio.title}~RuhendMD.mp3`,
        mimetype: 'audio/mpeg'
      }, { quoted: msg })
      limitnya(msg.sender, limit)      
   }
}