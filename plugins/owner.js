const handler = require('../handler');
module.exports = async (conn, msg, setting) => {
const { sendContact, from, command, reply } = handler(msg, conn, setting);  
const name = ["MAIN MENU"];
  
const tag = ["owner"];
const help = ["owner", "pemilik"]

   if (help.includes(command)) {
var owner = setting.ownerNumber
sendContact(from, owner, setting.ownerName, msg)
reply('Tuh')
}
}
