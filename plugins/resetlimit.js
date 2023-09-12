const handler = require('../handler');
module.exports = async (conn, msg, setting) => {
const { from, q, isOwner, command, resetLimit, reply } = handler(msg, conn, setting);
const name = ["OWNER"];  
const tag = ["resetlimit"];
const help = ["resetlimit"]

if (help.includes(command)) {
      if (!isOwner) reply(`Hanya Dapat Di Gunakan Oleh Owner`)
      if (!q) reply(`Masukan Nilai Limit Yang Ingin Di Reset Ke Semua Pengguna\n contoh .resetlimit 25`)
      await resetLimit(q);    
      const a = `Berhasil Mereset Limit\n${q} Per User`;
      conn.sendMessage(from, { text: a }, { quoted: msg });      
  }
}
