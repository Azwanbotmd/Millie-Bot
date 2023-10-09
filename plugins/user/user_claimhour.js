export let on = async (m, {
   mess,
   Hour
}) => {
    try {
        let hourly = 5
        const remainingTime = await Hour(m.sender, hourly);
        if (typeof remainingTime === "number") {
            return m.reply(`Kamu sudah melakukan claim dalam 1 jam terakhir. Tunggu ${remainingTime} menit lagi sebelum dapat melakukan claim kembali.\nkamu juga bisa claim uang  ketik .claimuang`);
        } else {
            m.reply(`Claim Perjam berhasil. Kamu mendapatkan ${hourly} Limit. Kamu bisa melakukan claim lagi dalam 1 jam mendatang.`);
        }
    } catch (error) {
        m.reply("Data pengguna tidak ditemukan.");
    }
};

on.names = ['User Menu'];
on.tags = ['hour'];
on.command = ['hour'];
on.register = true
