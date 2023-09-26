exports.on = async ( msg, { conn, command, ceklimit, limitnya, mess, isRegister }) => { try {
const name = ["ANIME MENU"];
const tag = ["megumin"];  
const help = ["megumin"];
const limit = 3

   if (help.includes(command)) {
      if (!isRegister) return msg.reply(mess.daftar)
      if (ceklimit) return msg.reply(mess.limit)
        let res = 'https://api.xfarr.com/api/randomimage/megumin?apikey=fBwANmhn7q'
        msg.reply(`Loading...`)
        let megumin = await res      
        conn.sendFile(msg.chat, megumin, { caption : `🎗 *Megumin* ` , quoted : msg } )                         
        limitnya(msg.sender, limit)        
     }
  } catch (error) {        
        console.error(error);
        if (error) msg.reply(`${error}`)
   }
}
