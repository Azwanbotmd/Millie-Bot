exports.on = async (msg, { command, text, dbMinus, dbPlus, cekuang }) => {
const name = ["SHOP MENU"];
const tag = ["buylimit"];
const help = ["buylimit"];

  if (help.includes(command)) {
    if (!text) return msg.reply(`Masukkan Parameter contoh: .buylimit 1`);
    if (cekuang) return msg.reply(`Uang kamu tidak cukup atau habis untuk membeli limit\nsilahkan bayar hutang kalo minus punya hutang\nketik .claim untuk uang harian\natau Ketik .my untuk cek sisa uang`);
    /*
     disini msh ngebug blm fix pengecekan ya jadi ketika user beli limit ga kira kira padahal uangnya sisa dikit 
     misalnya sisa 10 uang dia beli limit 1000 nah berarti harganya 10000 donk nanti di database nya jadi -9990 jadi dia ngutang -9990 
     nah bugnya limitnya ketambah misalnya limit nya awal 0 tetep jadi 1000 tapi uangnya ngutang - minus
     tapi waktu dia mau beli limit lagi pasti ditolak karna minus - ngutang    
    */
    let deduct;
    let upgrade;

    if (/^[1-9]\d*$/.test(text)) {
      const jumlahLimit = parseInt(text);
      const hargaLimit = jumlahLimit * 10; //dont change 10 per 1 limit

      deduct = { uang: hargaLimit }; 
      upgrade = { limit: jumlahLimit }; 

      await dbMinus(msg.sender, deduct);
      await dbPlus(msg.sender, upgrade);

      msg.reply(`Kamu berhasil membeli ${jumlahLimit} limit dengan harga ${hargaLimit} uang`);
    } else {
      return msg.reply(`Masukkan parameter angka yang valid`);
    }
  }
};  
