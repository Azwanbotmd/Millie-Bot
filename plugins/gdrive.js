const fetch = require ('node-fetch')
exports.on = async ( msg, { conn, command, ceklimit, limitnya, mess, isRegister, text }) => { try {
const name = ["DOWNLOADER"];
const tag = ["googledrive"];  
const help = ["gdrive", "googledrive"];
const limit = 10

   if (help.includes(command)) {
      if (!isRegister) return msg.reply(mess.daftar)
      if (ceklimit) return msg.reply(mess.limit)
      if (!text) return msg.reply(`Masukan Link Google Drove nya`)
        let res = await fetch(`https://api.xfarr.com/api/download/gdrive?apikey=fBwANmhn7q&url=${text}`)
        msg.reply(`Loading...`)
        let data = await res.json()
        let download = data.result
        let name = download.name
        let mime = download.mimetype
        let link = download.url
        conn.sendMessage(msg.chat,{ document: { url : link } , caption:`🎗 *Google Drive*\nName: ${name}`, fileName: name, mimetype : mime },{quoted:msg})
        limitnya(msg.sender, limit)        
     }
  } catch (error) {        
        console.error(error);
        if (error) msg.reply(`${error}`)
   }
}
