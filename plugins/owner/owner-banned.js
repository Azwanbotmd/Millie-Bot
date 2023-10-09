export let on = async (m, {
    text,
    addBanned
}) => { 
    if (!text) return m.reply(`Masukkan Nomornya. Contoh: .banned nomor\nContoh: .banned 62xxxxx`);
    let usernya = `${text}@s.whatsapp.net`
    await addBanned(usernya, true);
    m.reply(`Nomor ${usernya} berhasil di banned\nSekarang Nomor Itu Tidak Bisa Menggunakan Bot Ini`);
};

on.names = ['Owner'];
on.tags = ['banned', 'ban'];
on.command = ['banned', 'ban']
on.owner = true