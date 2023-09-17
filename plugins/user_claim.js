exports.on = async ( msg, { command, mess, claim, isRegister, sleep }) => {
const name = ["MAIN MENU"]
const tag = ["claim"];
const help = ["claim", "daily"];

  if (help.includes(command)) {
    if (!isRegister) return msg.reply(`Untuk Bisa Mengclaim Silahkan Daftar Dulu!\nketik .daftar nama.umur\ncontoh .daftar samsul.23`)
    var claim_limit = 25 //ini limit perhari g ush di kasih limit banyak banyak ke enakan nantinya fitur buy dan game nyusul
    const claimedAmount = await claim(msg.sender, claim_limit);
    await sleep(3000);
    msg.reply(`Claim Sukses ,Request Penggunaan Bot Perhari Adalah ${claim_limit} Limit\nKamu Bisa Klaim Lagi Di Esok Hari\nKetik .limit untuk cek Limit`);   
    if (claimedAmount !== undefined) {
    msg.reply('claim gagal')
     }
  }
};
