const ytmp4 = require ('@ruhend/ytmp4');
exports.on = async ( msg, { conn, command, text, mess, ceklimit, limitnya }) => {
const name = ["DOWNLOADER"];
const tag = ["ytmp4"];
const help = ["ytmp4", "ytv"]
const limit = 4

   if (help.includes(command)) {      
      if (ceklimit) return msg.reply(mess.limit)
      if (!text) return msg.reply('*Masukan Link Youtubenya*');
      msg.reply(mess.wait)
      let video = await ytmp4(text);      
      conn.sendMessage(msg.chat,{ video:{url:video.download},caption:`🎬 *Youtube Video*\n🎗 *Judul :* ${video.title}`},{quoted:msg})
      await limitnya(msg.sender, limit)       
   }
}
