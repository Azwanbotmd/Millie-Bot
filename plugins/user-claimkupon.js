exports.on = async (msg, { command, isRegister, mess, Kupon }) => {
const name = ["USER MENU"];
const tag = ["claimkupon"];
const help = ["claimkupon"];

  try {
    if (help.includes(command)) {
      if (!isRegister) return msg.reply(mess.daftar);

      const give = 5 // 5 itu kalo menukar limit berarti dapat 100 limit soalnya data awal sudah banyak kupon di kasih 10 keknya ubah ajh di uang awal nya kalo g mau kebnykan dan kupon dapat di claim setiap 3 hari sekali

      const remainingTime = await Kupon(msg.sender, give);      
           
      if (typeof remainingTime === "number") {
        return msg.reply(`Kamu sudah melakukan claim kupon sebelumnya. Tunggu ${remainingTime} jam lagi sebelum dapat melakukan claim kupon kembali.`);
      } else {
        msg.reply(`Claim Kupon berhasil. Kamu dapat ${give} Kupon\nKamu Bisa melakukan claim lagi dalam 72 jam mendatang.`);
      }
    }
  } catch (error) {
    msg.reply("Data pengguna tidak ditemukan.");
  }
};
