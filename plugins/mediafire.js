const { mediafireDl } = require('../function/scrape_Mediafire')
const handler = require('../handler');

module.exports = async (conn, msg, setting) => {
  
const { from, q, command, reply, sender, limitnya, ceklimit, daftar, mess } = handler(msg, conn, setting);

const name = ["DOWNLOADER"];
  
const tag = ["mediafire"];
const help = ["mediafire", "mf"]
const limit = 5

   if (help.includes(command)) {
   if (daftar) return reply(mess.daftar)
   if (ceklimit) return reply(mess.limit)
   if (!q) return reply('*Contoh:*\n.mediafire https://www.mediafire.com/file/o7sqqm3zfrzvc3m/twrp-3.0.2-0-vivalto3mve.tar/file')

let isLinks = q.match(/(?:https?:\/{2})?(?:w{3}\.)?mediafire(?:com)?\.(?:com|be)(?:\/www\?v=|\/)([^\s&]+)/)

if (!isLinks) return reply('Link yang kamu berikan tidak valid')

let emfi1 = await mediafireDl(`${isLinks}`)

if (emfi1[0].size.split('MB')[0] >= 100) return reply('File Melebihi Batas '+util.format(emfi1))

let result4 = `*MEDIAFIRE*
*Nama* : ${emfi1[0].nama}
*Size* : ${emfi1[0].size}
*Type* : ${emfi1[0].mime}
Mengirim file...`
reply(result4)
conn.sendMessage(from, {document:{url:emfi1[0].link}, fileName:emfi1[0].nama, mimetype: emfi1[0].mime}, {quoted:msg})
await limitnya(sender, limit)
reply(`${limit} Limit Terpakai`) 

 
}

}