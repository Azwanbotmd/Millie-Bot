exports.on = async (msg, { 
  command, 
  isRegister, 
  mess, 
  Hour 
  }) => {
const name = ["USER MENU"];
const tag = ["hour"];
const help = ["hour"];

try {
  if (help.includes(command)) {
    if (!isRegister) return msg.reply(mess.daftar);
    var hourly = 5
    const remainingTime = await Hour(msg.sender, hourly);
    if (typeof remainingTime === "number") {      
      return msg.reply(`Kamu sudah melakukan claim dalam 1 jam terakhir. Tunggu ${remainingTime} menit lagi sebelum dapat melakukan claim kembali.\nkamu juga bisa claim uang  ketik .claimuang`);
    } else {
      msg.reply(`Claim Perjam berhasil. Kamu mendapatkan ${hourly} Limit. Kamu bisa melakukan claim lagi dalam 1 jam mendatang.`);
     // return msg.reply(`Silahkan Claim Perjam .hour`);
       }
     }
   } catch (error) {
   msg.reply("Data pengguna tidak ditemukan.");
  }
};
