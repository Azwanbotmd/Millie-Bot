const fetch = require('node-fetch')
exports.on = async ( msg, { conn, command, text, mess, limitnya, ceklimit }) => { try {
const name = ["DOWNLOADER"];
const tag = ["facebook"];  
const help = ["facebook", "fb", "fbdl"]
const limit = 2
  
  if (help.includes(command)) {      
      if (ceklimit) return reply(mess.limit)
      if (!text) return msg.reply('Masukan link facebook nya! \nContoh: .facebook https://www.facebook.com/vvalent228/videos/658537269609282/?mibextid=h4kR3UXRu7XTHhH5 ');
        let res = await fetch(`https://vihangayt.me/download/fb2?url=${text}`)
        let fb = await res.json()        
        msg.reply(mess.wait)
        let t = fb.data.title
        let d = fb.data.desc
        let v = fb.data.sd
        await conn.sendMessage(msg.chat ,{ video:{url:v},caption:`*Facebook*\nJudul: ${t}\nDeskripsi: ${d}`},{quoted:msg})
        await limitnya(msg.sender, limit)        
      }
  } catch (error) {
    console.error(error);
    if (error) msg.reply(`${error}`)
   }
}