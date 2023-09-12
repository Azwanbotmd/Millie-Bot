const handler = require('../handler');
const ttdl = require ('@ruhend/tiktok');
module.exports = async (conn, msg, setting) => { try {
const { from, q, command, reply, sender, limitnya, ceklimit, daftar, mess } = handler(msg, conn, setting);
const name = ["DOWNLOADER"];
const tag = ["tiktok", "titit"];  
const help = ["tt", "tiktok", "ttdl", "titit", "ttnowm"]; 
const limit = 2

 if (help.includes(command)) {
    if (daftar) return reply(mess.daftar)
    if (ceklimit) return reply(mess.limit)
    if (!q) return reply('Masukan tiktok contoh .tiktok https://vt.tiktok.com/ZSLgavgpQ/');
    const tiktok = q
    reply(`Tunggu...`)
    let rest = await ttdl(`${tiktok}`)
    conn.sendMessage(from,{ video:{url:rest.video},caption:`*Tiktok*\n*User :* ${rest.author}\n*Judul :* ${rest.title}`},{quoted:msg})
    await limitnya(sender, limit)
    reply(`${limit} Limit Terpakai`) 
     }
   } catch (error) {
    const { reply } = handler(msg, conn, setting);
    console.error(error);
    if (error) reply(`${error}`)
   }
}
