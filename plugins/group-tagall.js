exports.on = async ( msg, { conn, command, text, mess, isGroupAdmins, participants }) => {
const name = ["GROUP MENU"];
const tag = ["tagall"];
const help = ["tagall"];

   if (help.includes(command)) {
      if (!isGroupAdmins) {
      return msg.reply(mess.GrupAdmin);              
       }
      let teks_tagall = `〘 *Tag All* 〙\n\nDi Perintahkan Oleh\n@${msg.sender.split('@')[0]}\n\nKata Dia\n${text ? text : ''}\n\n`;
      for (let mem of participants) {
        teks_tagall += `• @${mem.id.split('@')[0]}\n`;
      }
      conn.sendMessage(msg.chat, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: msg});   
   }
}