const ttdl = require ('@ruhend/tiktok');
exports.on = async ( msg, { conn, command, mess, text, limitnya, ceklimit }) => { try {
const name = ["DOWNLOADER"];
const tag = ["tiktok", "titit"];  
const help = ["tt", "tiktok", "ttdl", "titit", "ttnowm"]; 
const limit = 2

 if (help.includes(command)) {   
    if (ceklimit) return msg.reply(mess.limit)
    if (!text) return msg.reply('Masukan tiktok contoh .tiktok https://vt.tiktok.com/ZSLgavgpQ/');
    msg.reply(mess.wait)
    let res = await ttdl(text)
    conn.sendMessage(msg.chat,{ video:{url:res.video},caption:`🎼 *Tiktok*\n*User :* ${res.author}\n*Judul :* ${res.title}`},{quoted:msg})
    limitnya(msg.sender, limit)    
     }
   } catch (error) {
    console.error(error);
    if (error) msg.reply(`${error}`)
   }
}