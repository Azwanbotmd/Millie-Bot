const handler = require('../handler');
module.exports = async (conn, msg, setting) => { try {
const { from, fetch, q, command, reply, sender, limitnya, ceklimit, daftar, mess } = handler(msg, conn, setting);
const name = ["DOWNLOADER"];
const tag = ["facebook"];  
const help = ["facebook", "fb", "fbdl"]
const limit = 2
  
  if (help.includes(command)) {
      if (daftar) return reply(mess.daftar)
      if (ceklimit) return reply(mess.limit)
      if (!q) return reply('Masukan link facebook nya! \nContoh: .facebook https://www.facebook.com/vvalent228/videos/658537269609282/?mibextid=h4kR3UXRu7XTHhH5 ');
        let res = await fetch(`https://vihangayt.me/download/fb2?url=${q}`)
        let fb = await res.json()        
        reply(`Loading...`)
        let t = fb.data.title
        let d = fb.data.desc
        let v = fb.data.sd
        await conn.sendMessage(from,{ video:{url:v},caption:`*Facebook*\nJudul: ${t}\nDeskripsi: ${d}`},{quoted:msg})
        await limitnya(sender, limit)
        reply(`${limit} Limit Terpakai`)
      }
  } catch (error) {
        const { reply } = handler(msg, conn, setting);
        console.error(error);
        if (error) reply(`${error}`)
   }
}
