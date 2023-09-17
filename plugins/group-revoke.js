exports.on = async ( msg, { conn, command, mess, isGroupAdmins }) => { try {
const name = ["GROUP MENU"];  
const tag = ["revoke"];
const help = ["revoke"]

    if (help.includes(command)) {
      if (!isGroupAdmins) return msg.reply(mess.GrupAdmin);
       conn.groupRevokeInvite(msg.chat)
       msg.reply(`Sukses`)
    }
  } catch (error) {    
    if (error) msg.reply(`${error}`)
  }
}