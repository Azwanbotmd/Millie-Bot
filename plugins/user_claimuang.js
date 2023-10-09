export let on = async (m, { 
   Uang
 }) => {
    try {
        let give = 50 //50 itu kalo membeli limit berarti 5 soalnya data awal sudah banyak uang di kasih 10000 ubah ajh di uang awal nya kalo g mau kebnykan
        let remainingTime = await Uang(m.sender, give);
        if (typeof remainingTime === "number") {
            return m.reply(`Kamu sudah melakukan claim uang sebelumnya. Tunggu ${remainingTime} jam lagi sebelum dapat melakukan claim uang kembali.`);
        } else {
            m.reply(`Claim Uang,berhasil. Kamu dapat ${give} Uang\nKamu Bisa melakukan claim lagi dalam 24 jam mendatang.`);
        }
    } catch (error) {
        m.reply("Data pengguna tidak ditemukan.");
    }
};

on.names = ['User Menu'];
on.tags = ['claimuang'];
on.command = ['claimuang'];
on.register = true