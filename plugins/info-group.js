exports.on = async ( msg, { command, groupName, groupMembers, groupAdmins }) => {
const name = ["GROUP MENU"];
const tag = ["infogroup", "infogc"];
const help = ["infogroup", "infogc"];

   if (help.includes(command)) {
      let info = `*INFO GROUP*\n• *ID:* ${msg.chat}\n• *Nama Grup:* ${groupName}\n• *Total Member:* ${groupMembers.length}\n• *Total Admin:* ${groupAdmins.length}`
      msg.reply(info);
   }
}

