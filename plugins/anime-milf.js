exports.on = async ( msg, { conn, command, ceklimit, limitnya, mess, isRegister }) => { try {
const name = ["ANIME MENU"];
const tag = ["milf"];  
const help = ["milf"];
const limit = 3

   if (help.includes(command)) {
      if (!isRegister) return msg.reply(mess.daftar)
      if (ceklimit) return msg.reply(mess.limit)
        let res = 'https://api.xfarr.com/api/randomimage/nsfwmilf?apikey=fBwANmhn7q'
        msg.reply(`Loading...`)
        let milf = await res      
        conn.sendFile(msg.chat, milf, { caption : `🎗 *Milf* ` , quoted : msg } )                         
        limitnya(msg.sender, limit)        
     }
  } catch (error) {        
        console.error(error);
        if (error) msg.reply(`${error}`)
   }
}
