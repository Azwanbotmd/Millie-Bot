exports.on = async (msg, { command, text, groupName, switchGroup }) => {
const name = ["GROUP MENU"];
const tag = ["off welcome"];
const help = ["off"];

  if (help.includes(command)) {
    if (!text) return msg.reply(`Masukan Parameternya contoh .off welcome`)          
    const change = {       
       welcome: false
       }
   await switchGroup(msg.chat, change);
   msg.reply(`Welcome Berhasil Di Matikan Di Group ${groupName}`)
  }
};
 
