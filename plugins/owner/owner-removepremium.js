export let on = async (m, {
    text,
    addPremium
}) => { 
    if (!text) return m.reply(`Masukkan Nomornya. Contoh: .hapusprem nomor\nContoh: .hapusprem 62xxxxx`);
    const usernya = `${text}@s.whatsapp.net`
    await addPremium(usernya, false);
    m.reply(`Nomor ${usernya} tidak lagi menjadi premium`);
};

on.names = ['Owner'];
on.tags = ['hapusprem', 'removeprem'];
on.command = ['removeprem', 'hapusprem'];
on.owner = true