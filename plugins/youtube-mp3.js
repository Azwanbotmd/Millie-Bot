const handler = require('../handler');
const ytmp3 = require ('@ruhend/ytmp3');
module.exports = async (conn, msg, setting) => {
const { from, q, command, reply, sender, limitnya, ceklimit, daftar, mess } = handler(msg, conn, setting);
const name = ["DOWNLOADER"];
const tag = ["ytmp3"];
const help = ["ytmp3", "yta"]
const limit = 3
  
  if (help.includes(command)) {
      if (daftar) return reply(mess.daftar)
      if (ceklimit) return reply(mess.limit)
      if (!q) return reply('*Masukan Link Youtubenya*');
      let audio = q
      reply(`Tunggu...`)
      let res = await ytmp3(`${audio}`);      
      conn.sendMessage(from, {
        document: { url: res.download },
        fileName: `${res.title}~RuhendMD.mp3`,
        mimetype: 'audio/mpeg'
      }, { quoted: msg })
      await limitnya(sender, limit)
      reply(`${limit} Limit Terpakai`) 
   }
}