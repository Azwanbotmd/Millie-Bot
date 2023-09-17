exports.on = async ( msg, { conn, command, text, isOwner, addBanned }) => {
const name = ["OWNER"];
const tag = ["unbanned"];
const help = ["unbanned", "unban"]

   if (help.includes(command)) {
    if (!isOwner) {
      msg.reply(`Khusus Owner`);
    } else if (!text) {
      msg.reply(`Masukkan Nomornya. Contoh: .unbanned nomor\nContoh: .unbanned 62xxxxx`);
    } else { 
      const usernya = `${text}@s.whatsapp.net`
      await addBanned(usernya, false);
      msg.reply(`Nomor ${usernya} berhasil dihapus dari database banned\nSekarang Nomor Itu Bisa Menggunakan Bot Ini`);
    }
  }
}