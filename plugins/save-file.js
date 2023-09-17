const fs = require ('fs')
exports.on = async ( msg, { command, mess, text, quotedMsg, isOwner }) => { try {
const name = ["OWNER"];
const tag = ["simpan", "sf"];
const help = ["simpan", "save", "sf"]

    if (help.includes(command)) {       
      if (!isOwner) return msg.reply(mess.owner);
      if (!text) return msg.reply('contoh .sf plugins/cinta.js atau file yang ingin kamu save');                  
        let path = `${text}`
        await fs.writeFileSync(path, msg.quotedMsg.chats);
        msg.reply(`tersimpan di ${path}`)        
        }
      } catch (error) {
        console.error(error);
        if (error) {
        msg.reply(`${error}`);
      }
   }
};
