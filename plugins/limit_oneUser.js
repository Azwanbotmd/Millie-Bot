exports.on = async ( msg, { command, text, isOwner, addLimit }) => {
const name = ["MAIN MENU"];
const tag = ["addlimit"];
const help = ["addlimit", "tambahlimit"];

if (help.includes(command)) {
    if (!isOwner) {
      msg.reply("Khusus Owner");
    } else if (!text) {
      msg.reply("Masukkan nilai limitnya. Contoh: .addlimit nomor limit\nContoh: .addlimit 62xxxxx 25");
    } else {
      const [number, limit] = text.split(" ");
      const num = number + "@s.whatsapp.net";
      await addLimit(num, limit);
      msg.reply(`Berhasil Menambahkan ${limit} Limit Ke ${num}`);
    }
  }
}