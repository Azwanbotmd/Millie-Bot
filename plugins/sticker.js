const fs = require('fs');
exports.on = async ( msg, { conn, command, mess, isImage, isQuotedImage, prefix, ceklimit, limitnya }) => {
const name = ["MAKER"];
const tag = ["sticker"];
const help = ["sticker", "s", "stiker"];
const limit = 2

var pack = `Millie-Bot`
var own = `Ruhend`

   if (help.includes(command)) {
   if (ceklimit) return msg.reply(mess.limit)     
   if (isImage || isQuotedImage) {
         await conn.downloadAndSaveMediaMessage(msg, "image", `./tmp/${msg.sender.split("@")[0]}.jpeg`);
         let buffer = await fs.readFileSync(`./tmp/${msg.sender.split("@")[0]}.jpeg`);
         msg.reply(mess.wait);
         conn.sendImageAsSticker(msg.chat, buffer, msg, { packname: pack, author: own });
         await limitnya(msg.sender, limit);
      } else {
         msg.reply(`Kirim gambar dengan caption ${prefix + command} atau balas gambar yang sudah dikirim`);
      }      
   }
};