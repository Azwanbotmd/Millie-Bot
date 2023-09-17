exports.on = async ( msg, { conn, command, mess, isGroupAdmins }) => { try {
const name = ["GROUP MENU"];  
const tag = ["group off"];
const help = ["group off", "tutup"]

    if (help.includes(command)) {
        if (!isGroupAdmins) return msg.reply(mess.GrupAdmin)
        conn.groupSettingUpdate(msg.chat, "announcement");
        msg.reply(`Group Telah Di Tutup Hanya Admin Yang Dapat Mengirim Pesan`)     
    }
  } catch (error) {
    console.error(error);
    if (error) {
      msg.reply(`${error}`)
    }
  }
};