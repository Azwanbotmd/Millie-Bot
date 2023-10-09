export let on = async (m, {
    text,
    addBanned
}) => { 
    if (!text) return m.reply(`Masukkan Nomornya. Contoh: .unbanned nomor\nContoh: .unbanned 62xxxxx`);
    let usernya = `${text}@s.whatsapp.net`
    await addBanned(usernya, false);
    m.reply(`Nomor ${usernya} berhasil dihapus dari database banned\nSekarang Nomor Itu Bisa Menggunakan Bot Ini`);
};

on.names = ['Owner'];
on.tags = ['unbanned', 'unban'];
on.command = ['unbanned', 'unban']
on.owner = true