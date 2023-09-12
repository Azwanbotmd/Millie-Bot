const handler = require('../handler');
module.exports = async (conn, msg, setting) => {
const { from, q, command, isOwner, reply, addlimitone } = handler(msg, conn, setting);
const name = ["MAIN MENU"];
const tag = ["addlimit"];
const help = ["addlimit", "tambahlimit"]

  if (help.includes(command)) {
    if (!isOwner) {
      reply(`Khusus Owner`);
    } else if (!q) {
      reply(`Masukkan nilai limitnya. Contoh: .addlimit nomor.limit\nContoh: .addlimit 62xxxxx@s.whatsapp.net|25`);
    } else {
      const [usernya, limit] = q.split('|');
      await addlimitone(usernya, limit);
      reply(`Berhasil Menambahkan Limit Ke ${usernya}`);
    }
  }
}



