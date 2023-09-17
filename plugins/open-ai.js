const fetch = require ('node-fetch');
exports.on = async ( msg, { command, text, mess, ceklimit, limitnya, isRegister }) => {
const name = ["DOWNLOADER"];
const tag = ["ai", "chatgpt"];  
const help = ["ai", "chatgpt"];
const limit = 5

   if (help.includes(command)) {
   try { 
      if (!isRegister) return msg.reply(mess.daftar)
      if (ceklimit) return msg.reply(mess.limit)
      if (!text) return msg.reply('contoh .ai apa kabar?')
        var res = await fetch(`https://vihangayt.me/tools/chatgpt?q=${text}`)
        msg.reply('Menunggu Respon...')   
        var open = await res.json()        
        var ai = await open.data
        msg.reply(`${ai}`)
        limitnya(msg.sender, limit)
      } catch (error) {        
        console.error(error);
        if (error) msg.reply(`${error}`)     
      }
    }
  }