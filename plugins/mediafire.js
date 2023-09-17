const { mediafireDl } = require('../function/scrape_Mediafire');
exports.on = async ( msg, { conn, command, text, mess, ceklimit, limitnya }) => {
const name = ["DOWNLOADER"];
  
const tag = ["mediafire"];
const help = ["mediafire", "mf"]
const limit = 10

   if (help.includes(command)) {
     if (ceklimit) return msg.reply(mess.limit);
     if (!text) return msg.reply('*Contoh:*\n.mediafire https://www.mediafire.com/file/o7sqqm3zfrzvc3m/twrp-3.0.2-0-vivalto3mve.tar/file');
     let isLinks = text.match(/(?:https?:\/{2})?(?:w{3}\.)?mediafire(?:com)?\.(?:com|be)(?:\/www\?v=|\/)([^\s&]+)/)

     if (!isLinks) return reply('Link yang kamu berikan tidak valid')

     let emfi1 = await mediafireDl(`${isLinks}`)

     if (emfi1[0].size.split('MB')[0] >= 100) return msg.reply('File Melebihi Batas '+util.format(emfi1))

     let result4 = `*MEDIAFIRE*
*Nama* : ${emfi1[0].nama}
*Size* : ${emfi1[0].size}
*Type* : ${emfi1[0].mime}
Mengirim file...`
     msg.reply(result4)
     conn.sendMessage(msg.chat, {document:{url:emfi1[0].link}, fileName:emfi1[0].nama, mimetype: emfi1[0].mime}, {quoted:msg})
     limitnya(msg.sender, limit)

 
}

}