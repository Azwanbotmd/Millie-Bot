exports.on = async ( msg, { conn, command, ceklimit, limitnya, mess, isRegister }) => { try {
const name = ["ANIME MENU"];
const tag = ["waifu2"];  
const help = ["waifu2"];
const limit = 3

   if (help.includes(command)) {
      if (!isRegister) return msg.reply(mess.daftar)
      if (ceklimit) return msg.reply(mess.limit)
        let res = 'https://api.xfarr.com/api/randomimage/nsfwwaifu?apikey=fBwANmhn7q'
        msg.reply(`Loading...`)
        let waifu2 = await res
        conn.sendFile(msg.chat, waifu2, { caption : `🎗 *Waifu 2 NSFW* ` , quoted : msg } )                         
        limitnya(msg.sender, limit)        
     }
  } catch (error) {        
        console.error(error);
        if (error) msg.reply(`${error}`)
   }
}
