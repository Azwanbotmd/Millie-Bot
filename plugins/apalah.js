exports.on = async ( msg, { conn, command, mess, isRegister }) => {
const name = ["TES"];  
const tag = ["apalah"];
const help = ["apalah", "apa"]

  if (help.includes(command)) {
    if (!isRegister) return msg.reply(mess.daftar)
    const a = `apaan sih sok iya banget`;
    conn.sendMessage(msg.chat, { text: a }, { quoted: msg });  
   }
};
