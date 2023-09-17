exports.on = async ( msg, { conn, command, text, isOwner, addPremium }) => {
const name = ["OWNER"];
const tag = ["hapusremium"];
const help = ["hapuspremium", "removeprem"]

   if (help.includes(command)) {
    if (!isOwner) {
      msg.reply(`Khusus Owner`);
    } else if (!text) {
      msg.reply(`Masukkan Nomornya. Contoh: .hapuspremium nomor\nContoh: .hapuspremium 62xxxxx`);
    } else { 
      const usernya = `${text}@s.whatsapp.net`
      await addPremium(usernya, false);
      msg.reply(`Nomor ${usernya} tidak lagi menjadi premium`);
    }
  }
}