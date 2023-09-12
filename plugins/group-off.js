const handler = require('../handler');
module.exports = async (conn, msg, setting) => { try {
const { from, command, reply } = handler(msg, conn, setting);
const name = ["GROUP MENU"];  
const tag = ["group off"];    
const help = ["group off", "tutup"]

    if (help.includes(command)) {
        conn.groupSettingUpdate(from, "announcement");
        reply(`Sekarang Hanya Admin Yang Dapat Mengirim Pesan`)     
    }
  } catch (error) {
    const { reply } = handler(msg, conn, setting);
    console.error(error);
    if (error) {
      reply(`${error}`)
    }
  }
}

