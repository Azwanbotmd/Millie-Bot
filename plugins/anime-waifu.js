exports.on = async ( msg, { conn, command, ceklimit, limitnya, mess, isRegister }) => { try {
const name = ["ANIME MENU"];
const tag = ["waifu"];  
const help = ["waifu"];
const limit = 2

   if (help.includes(command)) {
      if (!isRegister) return msg.reply(mess.daftar)
      if (ceklimit) return msg.reply(mess.limit)
        let res = `https://api.xfarr.com/api/randomimage/waifu?apikey=fBwANmhn7q`
        msg.reply(`Loading...`)
        let waifu = await res                      
        conn.sendMessage(msg.chat,{ image: { url : waifu } , caption:`🎗 *Waifi* ` },{quoted:msg})
        limitnya(msg.sender, limit)        
     }
  } catch (error) {        
        console.error(error);
        if (error) msg.reply(`${error}`)
   }
}
