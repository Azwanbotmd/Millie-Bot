const handler = require('../handler');
module.exports = async (conn, msg, setting) => {try {
const { from, isGroup, mess, command, reply } = handler(msg, conn, setting);
const name = ["GROUP MENU"];  
const tag = ["linkgroup"];
const help = ["linkgroup", "linkgc", "link"]

if (help.includes(command)) {
if (!isGroup) return reply(mess.OnlyGrup);
var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api));
url = 'https://chat.whatsapp.com/' + url
reply(`Link Group\n\n${url}`);
}
} catch (error) {
console.error(error);
}
};
