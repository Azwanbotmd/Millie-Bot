exports.on = async ( msg, { conn, command, ceklimit, limitnya, mess, isRegister }) => { try {
const name = ["ANIME MENU"];
const tag = ["animewall"];  
const help = ["animewall"];
const limit = 3

   if (help.includes(command)) {
      if (!isRegister) return msg.reply(mess.daftar)
      if (ceklimit) return msg.reply(mess.limit)
        let res = 'https://api.zahwazein.xyz/api/anime/sfw/wallpaper?apikey=zenzkey_519828f1ca'
        msg.reply(`Loading...`)
        let animewall = await res      
        conn.sendFile(msg.chat, animewall, { caption : `🎗 *Anime Wallpaper* ` , quoted : msg } )                         
        limitnya(msg.sender, limit)        
     }
  } catch (error) {        
        console.error(error);
        if (error) msg.reply(`${error}`)
   }
}
