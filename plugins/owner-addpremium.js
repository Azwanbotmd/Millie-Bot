export let on = async (m, {
    text,
    addPremium
 }) => { 
    if (!text) return m.reply(`Masukkan Nomornya. Contoh: .addprem nomor\nContoh: .addprem 62xxxxx`);
    const usernya = `${text}@s.whatsapp.net`
    await addPremium(usernya, true);
    m.reply(`Nomor ${usernya} menjadi premium`);
};

on.names = ['Owner'];
on.tags = ['addpremium', 'addrem'];
on.command = ['addpremium', 'addprem'];
on.owner = true