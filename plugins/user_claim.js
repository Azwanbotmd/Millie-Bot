/*
exports.on = async (msg, { 
  command, 
  isRegister, 
  mess, 
  claim 
  }) => {
const name = ["USER MENU"];
const tag = ["claim"];
const help = ["claim"];

try {
  if (help.includes(command)) {
    if (!isRegister) return msg.reply(mess.daftar);

    var give = 20;

    const remainingTime = await claim(msg.sender, give);

    if (typeof remainingTime === "number") {      
      return msg.reply(`Kamu sudah melakukan claim sebelumnya. Tunggu ${remainingTime} jam lagi sebelum dapat melakukan claim kembali.`);
    } else {     
      //return msg.reply(`Silahkan Claim Harian .claim`);
     msg.reply(`Claim berhasil. Kamu dapat ${give} Limit \nKamu Bisa melakukan claim lagi dalam 24 jam mendatang.`)
    }
  } catch (error) {
    msg.reply("Data pengguna tidak ditemukan.")
  }
};
*/

exports.on = async (msg, { command, isRegister, mess, claim }) => {
  const name = ["USER MENU"];
  const tag = ["claim"];
  const help = ["claim"];

  try {
    if (help.includes(command)) {
      if (!isRegister) return msg.reply(mess.daftar);

      var give = 20;
      const remainingTime = await claim(msg.sender, give);

      if (typeof remainingTime === "number") {
        return msg.reply(`Kamu sudah melakukan claim sebelumnya. Tunggu ${remainingTime} jam lagi sebelum dapat melakukan claim kembali.`);
      } else {
        //return msg.reply(`Silahkan Claim Harian .claim`);
        msg.reply(`Claim berhasil. Kamu dapat ${give} Limit \nKamu Bisa melakukan claim lagi dalam 24 jam mendatang.`);
      }
    }
  } catch (error) {
    msg.reply("Data pengguna tidak ditemukan.");
  }
};
