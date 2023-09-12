const handler = require('../handler');
module.exports = async (conn, msg, setting) => { try {
const { from, mentions, mentionUser, command, reply } = handler(msg, conn, setting);
const name = ["GROUP MENU"];  
const tag = ["promote"];
const help = ["promote"]

if (help.includes(command)) {

if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "promote");
reply (`Sekarang ${mentionUser} Jadi Admin`)
  }
 }
} catch (err) {
const { from } = handler(msg, conn, setting);
console.error(err);
if (err) conn.sendMessage(from,{text:`Mungkin Sudah..`},{quoted:msg});
  }
};