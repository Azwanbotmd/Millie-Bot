const handler = require('../handler');
module.exports = async (conn, msg, setting) => {
const { command, reply, sender, checklimitUser } = handler(msg, conn, setting);
const name = ["INFO"];
const tag = ["limit"];
const help = ["limit", "me"];

  if (help.includes(command)) {
    const limitUser = checklimitUser(sender);
    if (limitUser !== undefined) {
      reply(`Kamu Memiliki ${limitUser} Limit Tersisa`);
    } else {
      reply('Limit tidak ditemukan');
    }
  }
}
