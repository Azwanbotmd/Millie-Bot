exports.on = async ( msg, { conn, command, mess, isGroupAdmins, mentionUser }) => { try {
const name = ["GROUP MENU"];  
const tag = ["kick"];
const help = ["kick"]

   if (help.includes(command)) {
    if (!isGroupAdmins) return msg.reply(mess.GrupAdmin)
    if (mentionUser.length !== 0) {
    conn.groupParticipantsUpdate(msg.chat, [mentionUser[0]], "remove");
    msg.reply(`Berhasil Menghapus ${mentionUser} Dari Grup Ini`)
   } else { 
   msg.reply(`Tag Yang Mau Di Kick`)
   }
 }
} catch (err) {
  if (err) conn.sendMessage(msg.chat,{text:err},{quoted:msg});
  }
};
