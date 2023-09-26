exports.on = async (msg, { command, isRegister, mess, Uang }) => {
const name = ["USER MENU"];
const tag = ["claimuang"];
const help = ["claimuang"];

  try {
    if (help.includes(command)) {
      if (!isRegister) return msg.reply(mess.daftar);

      const give = 50 //50 itu kalo membeli limit berarti 5 soalnya data awal sudah banyak uang di kasih 10000 ubah ajh di uang awal nya kalo g mau kebnykan
      const remainingTime = await Uang(msg.sender, give);      
      
     // await dbPlus(msg.sender, upgrade);
      if (typeof remainingTime === "number") {
        return msg.reply(`Kamu sudah melakukan claim uang sebelumnya. Tunggu ${remainingTime} jam lagi sebelum dapat melakukan claim uang kembali.`);
      } else {
        msg.reply(`Claim Uang,berhasil. Kamu dapat ${give} Uang\nKamu Bisa melakukan claim lagi dalam 24 jam mendatang.`);
      }
    }
  } catch (error) {
    msg.reply("Data pengguna tidak ditemukan.");
  }
};
