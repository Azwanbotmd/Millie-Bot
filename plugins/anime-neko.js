exports.on = async ( msg, { conn, command, ceklimit, limitnya, mess, isRegister }) => { try {
const name = ["ANIME MENU"];
const tag = ["neko"];  
const help = ["neko"];
const limit = 3

   if (help.includes(command)) {
      if (!isRegister) return msg.reply(mess.daftar)
      if (ceklimit) return msg.reply(mess.limit)
        let res = 'https://api.xfarr.com/api/randomimage/neko?apikey=fBwANmhn7q'
        msg.reply(`Loading...`)
        let neko = await res      
        conn.sendFile(msg.chat, neko, { caption : `🎗 *Neko* ` , quoted : msg } )                         
        limitnya(msg.sender, limit)        
     }
  } catch (error) {        
        console.error(error);
        if (error) msg.reply(`${error}`)
   }
}
