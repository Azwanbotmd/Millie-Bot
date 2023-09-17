exports.on = async ( msg, { command, mess, setting, sendContact }) => {
const name = ["MAIN MENU"];  
const tag = ["owner"];
const help = ["owner", "pemilik"]

  if (help.includes(command)) {
   const owner = setting.ownerNumber
   sendContact(msg.chat, owner, setting.ownerName, msg)
   msg.reply('Tuh')
   }
};
