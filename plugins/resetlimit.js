exports.on = async (msg, { conn, command, text, isOwner, resetLimits }) => {
const name = ["OWNER"];
const tag = ["resetlimit"];
const help = ["resetlimit"];
  
  try {   
    if (help.includes(command)) {
      if (!isOwner) {
        msg.reply(`Hanya Dapat Di Gunakan Oleh Owner`);
        return;
      }
      if (!text) {
        msg.reply(`Masukan Nilai Limit Yang Ingin Di Reset Ke Semua Pengguna\ncontoh .resetlimit 25`);
        return;
      }
      await resetLimits(text);
      const a = `Berhasil Mereset Limit\n${text} Per User`;
      conn.sendMessage(msg.chat, { text: a }, { quoted: msg });
    }
  } catch (error) {
    msg.reply(`Gagal Melakukan Reset Limit`);
  }
};
