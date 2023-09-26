const fetch = require("node-fetch");
exports.on = async ( msg, { conn, command, ceklimit, limitnya, mess, isRegister }) => { try {
const name = ["FUN MENU"];
const tag = ["cerpenrandom"];  
const help = ["cerpenrandom"];
const limit = 1

   if (help.includes(command)) {
      if (!isRegister) return msg.reply(mess.daftar)
      if (ceklimit) return msg.reply(mess.limit)
        let res = await fetch('https://saipulanuar.cf/api/cerpen/random')
        msg.reply(`Loading...`)
        let data = await res.json()
        let result = data.result        
        msg.reply('🎗 *Random Cerpen*' + result)
        limitnya(msg.sender, limit)        
     }
  } catch (error) {        
        console.error(error);
        if (error) msg.reply(`${error}`)
   }
}
