const { ttdl } = require ('@ruhend/scraper');
exports.on = async ( msg, { conn, command, mess, text, limitnya, ceklimit }) => { try {
const name = ["DOWNLOADER"];
const tag = ["tiktok", "titit"];  
const help = ["tt", "tiktok", "ttdl", "titit", "ttnowm"]; 
const limit = 2

 if (help.includes(command)) {   
    if (ceklimit) return msg.reply(mess.limit)
    if (!text) return msg.reply('Masukan tiktok contoh .tiktok https://vt.tiktok.com/ZSLgavgpQ/');
    msg.reply(mess.wait)    
    let { video , title , nickname , username , duration , comment, playcount , share } = await ttdl(text)
    conn.sendFile(msg.chat, video, { caption : `🎗 *TIKTOK*
Username: ${nickname}
Judul : ${title}
username : ${username}
duration : ${duration}
comment : ${comment}
playcount : ${playcount}
share : ${share}`
,quoted : msg } )
    
    limitnya(msg.sender, limit)    
     }
   } catch (error) {
    console.error(error);
    if (error) msg.reply(`${error}`)
   }
}
