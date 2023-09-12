const handler = require('../handler');
const ytmp4 = require ('@ruhend/ytmp4');
module.exports = async (conn, msg, setting) => {
const { from, q, command, reply, sender, limitnya, ceklimit, daftar, mess } = handler(msg, conn, setting);
const name = ["DOWNLOADER"];
const tag = ["ytmp4"];
const help = ["ytmp4", "ytv"]
const limit = 4

   if (help.includes(command)) {
      if (daftar) return reply(mess.daftar)
      if (ceklimit) return reply(mess.limit)
      if (!q) return reply('*Masukan Link Youtubenya*');
      let video = q
      reply(`Tunggu...`)
      let resv = await ytmp4(`${video}`);      
      await conn.sendMessage(from,{ video:{url:resv.download},caption:`*Youtube Video*\n*Judul :* ${resv.title}`},{quoted:msg})
      await limitnya(sender, limit)
      reply(`${limit} Limit Terpakai`)      
   }
}
