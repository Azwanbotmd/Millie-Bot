exports.on = async (msg, { 
  command, 
  isRegister, 
  mess, 
  Hour 
  }) => {
const name = ["USER MENU"];
const tag = ["hour"];
const help = ["hour"];

  if (help.includes(command)) {
    if (!isRegister) return msg.reply(mess.daftar);

    var hourly = 5;

    const remainingTime = await Hour(msg.sender, hourly);

    if (typeof remainingTime === "number") {
      
      return msg.reply(`Kamu sudah melakukan claim dalam 1 jam terakhir. Tunggu ${remainingTime} menit lagi sebelum dapat melakukan claim kembali.`);
    } else {
      
     // return msg.reply(`Silahkan Claim Perjam .hour`);
    }
  }
};