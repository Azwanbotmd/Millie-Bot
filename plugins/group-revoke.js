const handler = require('../handler');
module.exports = async (conn, msg, setting) => { try {
const { from, command, reply } = handler(msg, conn, setting);
const name = ["GROUP MENU"];  
const tag = ["revoke"];
const help = ["revoke"]

      if (help.includes(command)) {
       conn.groupRevokeInvite(from)
       reply(`Sukses`)
    }
  } catch (error) {
    const { reply } = handler(msg, conn, setting);
    console.error(error)
    if (error) reply(`${error}`)
  }
}
