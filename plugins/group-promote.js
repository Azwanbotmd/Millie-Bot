exports.on = async ( msg, { conn, command, mess, isGroupAdmins, mentionUser }) => { try {
const name = ["GROUP MENU"];  
const tag = ["promote"];
const help = ["promote"]

    if (help.includes(command)) {
    if (!isGroupAdmins) return msg.reply(mess.GrupAdmin)
    if (mentionUser.length !== 0) {
    conn.groupParticipantsUpdate(msg.chat, [mentionUser[0]], "promote");
    msg.reply(`Sekarang ${mentionUser} Jadi Admin`)
   } else { 
   msg.reply(`Tag Yang Mau Di Promote`)
   }
 }
} catch (err) {
  if (err) conn.sendMessage(msg.chat,{text:err},{quoted:msg});
  }
};
