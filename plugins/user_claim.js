const handler = require('../handler');
module.exports = async (conn, msg, setting) => {
const { from, command, reply, sender, claim } = handler(msg, conn, setting);
const name = ["MAIN MENU"];
const tag = ["claim"];
const help = ["claim", "daily"];

  if (help.includes(command)) {
    var claim_limit = 50;
    const claimedAmount = await claim(sender, claim_limit);
    if (claimedAmount !== undefined) {
      reply(`Claim Sukses Anda Mendapatkan Limit ${claimedAmount} Untuk Hari Ini\n Request Penggunaan Bot Perhari Adalah ${claim_limit} Limit\nKamu Bisa Klaim Lagi Di Esok Hari\nKetik .limit untuk cek Limit`);
    }
  }
  return { claim_limit };
}

