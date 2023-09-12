const handler = require('../handler');
module.exports = async (conn, msg, setting) => { try {
const { from, command, reply } = handler(msg, conn, setting);
const name = ["GROUP MENU"];  
const tag = ["group on"];
const help = ["group on", "buka"]
    
    if (help.includes(command)) {
        conn.groupSettingUpdate(from, "not_announcement");
        reply(`Group Telah Di Buka Semua Anggota Dapat Mengirim Pesan`)     
    }
  } catch (error) {
    const { reply } = handler(msg, conn, setting);
    console.error(error);
    if (error) {
      reply(`${error}`)
    }
  }
};
