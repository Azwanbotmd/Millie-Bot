export let on = async (m, {
    mess,
    claim,
    dbPlus
}) => {
    try {
        let give = 20
        let remainingTime = await claim(m.sender, give);
        if (typeof remainingTime === "number" && !m.fromMe) {
            return m.reply(`Kamu sudah melakukan claim sebelumnya. Tunggu ${remainingTime} jam lagi sebelum dapat melakukan claim kembali.`);
        } else {
            if (!m.fromMe) {
                m.reply(`Claim berhasil. Kamu dapat ${give} Limit\nKamu Bisa melakukan claim lagi dalam 24 jam mendatang.`);
            }
        }
    } catch (error) {
        m.reply("Data pengguna tidak ditemukan.");
    }
};

on.names = ['User Menu'];
on.tags = ['claim'];
on.command = ['claim'];
on.register = true