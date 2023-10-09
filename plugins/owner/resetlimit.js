export let on = async (m, {
    conn,
    text,
    resetLimits
}) => {
    try {
         if (!text) m.reply(`Masukan Nilai Limit Yang Ingin Di Reset Ke Semua Pengguna\ncontoh .resetlimit 25`);
         await resetLimits(text);
         let a = `Berhasil Mereset Limit\n${text} Per User`;
         conn.sendMessage(m.chat, {  text: a  }, { quoted: m });
     } catch (error) {
         m.reply(`Gagal Melakukan Reset Limit`);
    }
};

on.names = ['Owner'];
on.tags = ['resetlimit'];
on.command = ['resetlimit'];
on.owner = true