exports.on = async ( msg, { conn, command, ceklimit, limitnya, mess, isRegister }) => { try {
const name = ["ANIME MENU"];
const tag = ["waifu"];  
const help = ["waifu"];
const limit = 2

   if (help.includes(command)) {
      if (!isRegister) return msg.reply(mess.daftar)
      if (ceklimit) return msg.reply(mess.limit)
        let waifu = `https://nazunaxz.xyz/api/randomimage/waifu`
        msg.reply(`Loading...`)                          
        conn.sendMessage(msg.chat,{ image:{url:waifu},caption:`*WAIFI*`},{quoted:msg})
        limitnya(msg.sender, limit)        
     }
  } catch (error) {        
        console.error(error);
        if (error) msg.reply(`${error}`)
   }
}