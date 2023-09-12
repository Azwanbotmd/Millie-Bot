const handler = require('../handler');
module.exports = async (conn, msg, setting) => { try {
const { from, command, reply, sender, limitnya, ceklimit, daftar, mess } = handler(msg, conn, setting);
const name = ["ANIME MENU"];
const tag = ["waifu"];  
const help = ["waifu"];
const limit = 2
  
  if (help.includes(command)) {
      if (daftar) return reply(mess.daftar)
      if (ceklimit) return reply(mess.limit)
        let waifu = `https://nazunaxz.xyz/api/randomimage/waifu`
        reply(`Loading...`)                          
        conn.sendMessage(from,{ image:{url:waifu},caption:`*WAIFI*`},{quoted:msg})
        limitnya(sender, limit)
        reply(`${limit} Limit Terpakai`)
     }
  } catch (error) {
        const { reply } = handler(msg, conn, setting);
        console.error(error);
        if (error) reply(`${error}`)
   }
}
