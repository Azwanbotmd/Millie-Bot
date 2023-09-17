exports.on = async ( msg, { conn, command, text, mess, isOwner, isGroupAdmins, participants }) => {
const name = ["GROUP MENU"];
const tag = ["hidetag"];
const help = ["hidetag", "ht"];

   if (help.includes(command)) {
      if (!isGroupAdmins && !isOwner) return msg.reply(mess.GrupAdmin);    
      let mem = []; participants.map( i => mem.push(i.id) )
      conn.sendMessage(msg.chat, { text: text ? text : '', mentions: mem }, { quoted: msg });
    }
}