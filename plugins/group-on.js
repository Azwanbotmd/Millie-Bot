exports.on = async ( msg, { conn, command, mess, isGroupAdmins }) => { try {
const name = ["GROUP MENU"];  
const tag = ["group on"];
const help = ["group on", "buka"]

    if (help.includes(command)) {
        if (!isGroupAdmins) return msg.reply(mess.GrupAdmin)
        conn.groupSettingUpdate(msg.chat, "not_announcement");
        msg.reply(`Group Telah Di Buka Semua Anggota Dapat Mengirim Pesan`)     
    }
  } catch (error) {
    console.error(error);
    if (error) {
      msg.reply(`${error}`)
    }
  }
};