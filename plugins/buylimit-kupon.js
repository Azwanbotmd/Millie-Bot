exports.on = async (msg, { 
  command, 
  text,
  dbMinus,
  dbPlus, 
  cekkupon 
  }) => {
const name = ["SHOP MENU"];
const tag = ["tukarkupon"];
const help = ["tukarkupon"];

  if (help.includes(command)) {
    if (!text) return msg.reply(`Masukkan Parameter contoh: .tukarkupon 1`);
    if (cekkupon) return msg.reply(`Kupon kamu tidak cukup atau habis untuk menukar kupon ke limit\nsilahkan bayar hutang kupon kalo minus punya hutang\nketik .claimkupon untuk mendapatkan kupon\natau Ketik .my untuk cek sisa kupon`);
    
    let deduct;
    let upgrade;

    if (/^[1-9]\d*$/.test(text)) {
      const jumlahKupon = parseInt(text);
      const jumlahLimit = jumlahKupon * 20 ;//dont change 20 per 1 limit

      deduct = { kupon: jumlahKupon }; 
      upgrade = { limit: jumlahLimit }; 

      await dbMinus(msg.sender, deduct);
      await dbPlus(msg.sender, upgrade);

      msg.reply(`Kamu berhasil mendapat ${jumlahLimit} limit dengan menukar ${jumlahKupon} kupon`);
    } else {
      return msg.reply(`Masukkan parameter angka yang valid`);
    }
  }
};  
//
