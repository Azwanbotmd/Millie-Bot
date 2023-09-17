exports.on = async ( msg, { conn, command, mess, isGroupAdmins, mentionUser }) => { try {
const name = ["GROUP MENU"];  
const tag = ["demote"];
const help = ["demote"]

    if (help.includes(command)) {
    if (!isGroupAdmins) return msg.reply(mess.GrupAdmin)
    if (mentionUser.length !== 0) {
    conn.groupParticipantsUpdate(msg.chat, [mentionUser[0]], "demote");
    msg.reply(`Sekarang ${mentionUser} Bukan Lagi Admin`)
   } else { 
   msg.reply(`Tag Yang Mau Di Demote`)
   }
 }
} catch (err) {
  if (err) conn.sendMessage(msg.chat,{text:err},{quoted:msg});
  }
};
