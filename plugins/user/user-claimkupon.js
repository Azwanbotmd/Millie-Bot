export let on = async (m, {
    Kupon
}) => {
    try {
        let give = 5 // 5 itu kalo menukar limit berarti dapat 100 limit soalnya data awal sudah banyak kupon di kasih 10 keknya ubah ajh di uang awal nya kalo g mau kebnykan dan kupon dapat di claim setiap 3 hari sekali
        let remainingTime = await Kupon(m.sender, give);
        if (typeof remainingTime === "number") {
            return m.reply(`Kamu sudah melakukan claim kupon sebelumnya. Tunggu ${remainingTime} jam lagi sebelum dapat melakukan claim kupon kembali.`);
        } else {
            m.reply(`Claim Kupon berhasil. Kamu dapat ${give} Kupon\nKamu Bisa melakukan claim lagi dalam 72 jam mendatang.`);
        }
    } catch (error) {
        m.reply("Data pengguna tidak ditemukan.");
    }
};

on.names = ['User Menu'];
on.tags = ['claimkupon'];
on.command = ['claimkupon'];
on.register = true