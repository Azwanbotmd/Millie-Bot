const handler = require('../handler');
module.exports = async (conn, msg, setting) => { try {
const { from, mentionUser, command, reply } = handler(msg, conn, setting);      
const name = ["GROUP MENU"];  
const tag = ["demote"];
const help = ["demote"]

    if (help.includes(command)) {
         var number;
        if (mentionUser.length !== 0) {
          number = mentionUser[0];
          conn.groupParticipantsUpdate(from, [number], "demote");
          reply(`Sukses`)
        }
    }
  } catch (err) {
    console.error(err);
    const { reply } = handler(msg, conn, setting);
    if (err) reply('Tag atau reply orang yg mau di demote\n\n*Contoh:* .kick @tag');
  }
};
