exports.on = async ( msg, { conn, command }) => {
const name = ["MAIN MENU"];  
const tag = ["script"];
const help = ["script", "sc", "repo", "repositori"];

  if (help.includes(command)) {
   const script = 'Im Currently Using This\n\nhttps://github.com/menu20/Millie-Bot'
    conn.sendMessage(msg.chat, { text: script }, { quoted: msg });      
   }
};
