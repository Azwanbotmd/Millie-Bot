const fetch = require('node-fetch')
exports.on = async ( msg, { conn, command, mess, text, limitnya, ceklimit }) => { try {
const name = ["DOWNLOADER"];
const tag = ["instagram"];
const help = ["instagram", "ig", "igdl"];
const limit = 3

    if (help.includes(command)) {
     if (!text) return msg.reply('Masukan agram contoh .ig https://www.instagram.com/p/CvkZ7fcrEpQ/?igshid=MzRlODBiNWFlZA==');
     let res = await fetch(`https://vihangayt.me/download/instagram?url=${text}`)
     let igeh = await res.json();     
     msg.reply(mess.wait);
     let image = igeh.data.data.map(item => item.url);
            for (let ig of image) {
               conn.sendFile(msg.chat, ig, { quoted : msg } )
            }
        }  
    } catch (error) {
        console.error(error);
        if (error) msg.reply(`${error}`);
    }
}
