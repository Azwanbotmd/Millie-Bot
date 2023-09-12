const handler = require('../handler');
module.exports = async (conn, msg, setting) => {
const { from, command } = handler(msg, conn, setting);
const name = ["MAIN MENU"];  
const tag = ["script"];
const help = ["script", "sc", "repo", "repositori"];  

  if (help.includes(command)) {
      const script = 'Im Currently Using This\n\nhttps://github.com/menu20/Millie-Bot'
      conn.sendMessage(from, { text: script }, { quoted: msg });      
   }
}