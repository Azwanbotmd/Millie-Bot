const handler = require('../handler');
module.exports = async (conn, msg, setting) => {
const { from, q, command, isOwner, reply, addBanned } = handler(msg, conn, setting);
const name = ["OWNER"];
const tag = ["banned"];
const help = ["banned", "ban"]

  if (help.includes(command)) {
    if (!isOwner) {
      reply(`Khusus Owner`);
    } else if (!q) {
      reply(`Masukkan Nomornya. Contoh: .banned nomor\nContoh: .banned 62xxxxx`);
    } else { 
      const usernya = `${q}@s.whatsapp.net`
      await addBanned(usernya, "true");
      reply(`Nomor ${usernya} berhasil dimasukan ke database banned\nSekarang Nomor Itu tidak Bisa Menggunakan Bot Ini`);
    }
  }
}
