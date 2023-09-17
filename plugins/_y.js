exports.on = async ( msg, { conn, command, ceklimit, limitnya, mess }) => {
const name = ["TES"];  
const tag = ["ya"];
const help = ["ya", "y"]
const limit = 2

  if (help.includes(command)) {
      if (ceklimit) return msg.reply(mess.limit)
      const y = `iya ka sama sama`;
      conn.sendMessage(msg.chat, { text: y }, { quoted: msg });
      limitnya(msg.sender,limit)
   }
};
