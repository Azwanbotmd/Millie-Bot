exports.on = async ( msg, { conn, command, text, isOwner, addPremium }) => {
const name = ["OWNER"];
const tag = ["addpremium"];
const help = ["addpremium", "addprem"]

   if (help.includes(command)) {
    if (!isOwner) {
      msg.reply(`Khusus Owner`);
    } else if (!text) {
      msg.reply(`Masukkan Nomornya. Contoh: .addpremium nomor\nContoh: .addpremium 62xxxxx`);
    } else { 
      const usernya = `${text}@s.whatsapp.net`
      await addPremium(usernya, true);
      msg.reply(`Nomor ${usernya} berhasil menjadi premium`);
    }
  }
}