exports.on = async (msg, { command, text, groupName, switchGroup }) => {
const name = ["GROUP MENU"];
const tag = ["on welcome"];
const help = ["on"];

  if (help.includes(command)) {
    if (!text) return msg.reply(`Masukan Parameternya contoh .on welcome`)          
    const change = [{
       id: msg.chat,
       name: groupName,
       welcome: true
       }]
   await switchGroup(msg.chat, change);
   msg.reply(`Welcome Berhasil Di Nyalakan Di Group ${groupName}`)
  }
};
 