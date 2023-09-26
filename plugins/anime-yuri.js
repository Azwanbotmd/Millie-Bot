exports.on = async ( msg, { conn, command, ceklimit, limitnya, mess, isRegister }) => { try {
const name = ["ANIME MENU"];
const tag = ["yuri"];  
const help = ["yuri"];
const limit = 3

   if (help.includes(command)) {
      if (!isRegister) return msg.reply(mess.daftar)
      if (ceklimit) return msg.reply(mess.limit)
        let res = 'https://api.xfarr.com/api/randomimage/nsfwyuri?apikey=fBwANmhn7q'
        msg.reply(`Loading...`)
        let yuri = await res      
        conn.sendFile(msg.chat, yuri, { caption : `🎗 *Yuri* ` , quoted : msg } )                         
        limitnya(msg.sender, limit)        
     }
  } catch (error) {        
        console.error(error);
        if (error) msg.reply(`${error}`)
   }
}
