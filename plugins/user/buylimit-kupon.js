export let on = async (m, {
    conn,
    text,
    dbMinus,
    dbPlus,
    cekkupon
}) => { 
    if (!text) return m.reply(`Masukkan Parameter contoh: .tukarkupon 1`);
    if (cekkupon) return m.reply(`Kupon kamu tidak cukup atau habis untuk menukar kupon ke limit\nsilahkan bayar hutang kupon kalo minus punya hutang\nketik .claimkupon untuk mendapatkan kupon\natau Ketik .my untuk cek sisa kupon`);
    let deduct;
    let upgrade;
    if (/^[1-9]\d*$/.test(text)) {
        let jumlahKupon = parseInt(text);
        let jumlahLimit = jumlahKupon * 20; //dont change 20 per 1 limit
        deduct = {
            kupon: jumlahKupon
        };
        upgrade = {
            limit: jumlahLimit
        };
        await dbMinus(m.sender, deduct);
        await dbPlus(m.sender, upgrade);
        m.reply(`Kamu berhasil mendapat ${jumlahLimit} limit dengan menukar ${jumlahKupon} kupon`);
    } else {
        return m.reply(`Masukkan parameter angka yang valid`);
    }    
};

on.names = ['User Menu'];
on.tags = ['tukarkupon'];
on.command = ['tukarkupon'];