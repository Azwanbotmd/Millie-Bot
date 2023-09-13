const handler = require('../handler');
module.exports = async (conn, msg, setting) => {
const { from, q, command, isOwner, reply, addBanned } = handler(msg, conn, setting);
const name = ["OWNER"];
const tag = ["unbanned"];
const help = ["unbanned", "unban"]

  if (help.includes(command)) {
    if (!isOwner) {
      reply(`Khusus Owner`);
    } else if (!q) {
      reply(`Masukkan Nomornya. Contoh: .unbanned nomor\nContoh: .unbanned 62xxxxx`);
    } else { 
      const usernya = `${q}@s.whatsapp.net`
      await addBanned(usernya, "false");
      reply(`Nomor ${usernya} berhasil dihapus dari database banned\nSekarang Nomor Itu Bisa Menggunakan Bot Ini Lagi`);
    }
  }
}
