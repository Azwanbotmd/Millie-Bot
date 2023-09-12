const handler = require('../handler');
module.exports = async (conn, msg, setting) => {
const { from, fs, isImage, isQuotedImage, mess, sender, command, reply, prefix, limitnya, ceklimit, daftar } = handler(msg, conn, setting);
const name = ["CONVERTER MAKER"];
const tag = ["sticker"];
const help = ["sticker", "s", "stiker"];
const limit = 2

var pack = `Millie-Bot`
var own = `Ruhend`

   if (help.includes(command)) {
   if (daftar) return reply(mess.daftar)
   if (ceklimit) return reply(mess.limit)     
   if (isImage || isQuotedImage) {
         await conn.downloadAndSaveMediaMessage(msg, "image", `./tmp/${sender.split("@")[0]}.jpeg`);
         let buffer = await fs.readFileSync(`./tmp/${sender.split("@")[0]}.jpeg`);
         reply(mess.wait);
         conn.sendImageAsSticker(from, buffer, msg, { packname: pack, author: own });
         await limitnya(sender, limit)
         reply(`${limit} Limit Terpakai`) 
      } else {
         reply(`Kirim gambar dengan caption ${prefix + command} atau balas gambar yang sudah dikirim`);
      }      
   }
};