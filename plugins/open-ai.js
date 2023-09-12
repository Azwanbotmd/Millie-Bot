const handler = require('../handler');
module.exports = async (conn, msg, setting) => { try {
const { fetch, q, command, reply, sender, limitnya, ceklimit, daftar, mess } = handler(msg, conn, setting);
const name = ["DOWNLOADER"];
const tag = ["ai", "chatgpt"];  
const help = ["ai", "chatgpt"];
const limit = 2
  
  if (help.includes(command)) {
      if (daftar) return reply(mess.daftar)
      if (ceklimit) return reply(mess.limit)
      if (!q) return reply('contoh .ai apa kabar?')
        var res = await fetch(`https://vihangayt.me/tools/chatgpt?q=${q}`)
        reply('Menunggu Respon...')   
        var open = await res.json()        
        var ai = await open.data
        await reply(`${ai}`)
        await limitnya(sender, limit)
        await reply(`${limit} Limit Terpakai`)        
        }
  } catch (error) {
        const { reply } = handler(msg, conn, setting);
        console.error(error);
        if (error) reply(`${error}`)
   }
}
