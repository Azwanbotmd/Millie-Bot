exports.on = async ( msg, { conn, command, mess, isGroup }) => { try {
const name = ["GROUP MENU"];  
const tag = ["linkgroup"];
const help = ["linkgroup", "linkgc", "link"]

    if (help.includes(command)) {
        if (!isGroup) return msg.reply(mess.OnlyGrup);
        var url = await conn.groupInviteCode(msg.chat).catch(() => msg.reply(mess.error.api));
        url = 'https://chat.whatsapp.com/' + url;
        msg.reply(`Link Group\n\n${url}`);     
    }
  } catch (error) {
    console.error(error);
    if (error) {
      msg.reply(`${error}`)
    }
  }
};