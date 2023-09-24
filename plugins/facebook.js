const { fbdl } = require('@ruhend/scraper')
exports.on = async ( msg, { conn, command, text, mess, limitnya, ceklimit }) => { try {
const name = ["DOWNLOADER"];
const tag = ["facebook"];  
const help = ["facebook", "fb", "fbdl"]
const limit = 2
  
  if (help.includes(command)) {      
      if (ceklimit) return msg.reply(mess.limit)
      if (!text) return msg.reply('Masukan link facebook nya! \nContoh: .facebook https://www.facebook.com/vvalent228/videos/658537269609282/?mibextid=h4kR3UXRu7XTHhH5 ');
        let { video } = await fbdl(text)        
        conn.sendFile(msg.chat, video, { caption : `🎗 Facebook`, quoted : msg } )
        limitnya(msg.sender, limit)        
      }
  } catch (error) {
    console.error(error);
    if (error) msg.reply(`${error}`)
   }
}

