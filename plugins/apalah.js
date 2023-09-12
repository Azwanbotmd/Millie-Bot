const handler = require('../handler');
module.exports = async (conn, msg, setting) => {
const { from, sender, command, limitnya, ceklimit, daftar, reply, mess } = handler(msg, conn, setting);
const name = ["TES"];  
const tag = ["apalah"];
const help = ["apalah", "apa"]

if (help.includes(command)) {      
      const a = `apaan sih sok iya banget`;
      conn.sendMessage(from, { text: a }, { quoted: msg });      
  }
}
