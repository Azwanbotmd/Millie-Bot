exports.on = async ( msg, { conn, command, text, isOwner, addBanned }) => {
const name = ["OWNER"];
const tag = ["banned"];
const help = ["banned", "ban"]

   if (help.includes(command)) {
    if (!isOwner) {
      msg.reply(`Khusus Owner`);
    } else if (!text) {
      msg.reply(`Masukkan Nomornya. Contoh: .banned nomor\nContoh: .banned 62xxxxx`);
    } else { 
      const usernya = `${text}@s.whatsapp.net`
      await addBanned(usernya, true);
      msg.reply(`Nomor ${usernya} berhasil dimasukan ke database banned\nSekarang Nomor Itu tidak Bisa Menggunakan Bot Ini`);
    }
  }
}