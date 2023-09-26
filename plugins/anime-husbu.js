exports.on = async ( msg, { conn, command, ceklimit, limitnya, mess, isRegister }) => { try {
const name = ["ANIME MENU"];
const tag = ["husbu"];  
const help = ["husbu"];
const limit = 3

   if (help.includes(command)) {
      if (!isRegister) return msg.reply(mess.daftar)
      if (ceklimit) return msg.reply(mess.limit)
        let res = 'https://nazunaxz.xyz/api/randomimage/husbu'
        msg.reply(`Loading...`)
        let husbu = await res      
        conn.sendFile(msg.chat, husbu, { caption : `*HUSBU*` , quoted : msg } )                         
        limitnya(msg.sender, limit)        
     }
  } catch (error) {        
        console.error(error);
        if (error) msg.reply(`${error}`)
   }
}