exports.on = async (msg, { command, text, mess, addLimit, makeid, isRegister, registering, sleep }) => {
const name = ["USER MENU"];
const tag = ["daftar", "verify"];
const help = ["verify", "daftar", "v"];

  if (help.includes(command)) {
    if (isRegister) return msg.reply(mess.registered);

    let nama = text.split(".")[0];
    let umur = text.split(".")[1];
    let sender = msg.sender;
    
    if (!nama || !umur) {
      return msg.reply('Akses ditolak! Masukkan nama dan umur yang benar. \ncontoh .daftar menu.22');
    }

    const user = {
      id: sender,
      registered: true,
      nama: nama,
      umur: umur,
      seri: makeid(10)
    };

    await registering(user);
    var give_limit = 15;
    await addLimit(msg.sender, give_limit);
    await sleep(3000)
    msg.reply(`Daftar Berhasil √\nNama: ${nama}\nUmur: ${umur}\nSerial Number: ${user.seri}\nAnda mendapatkan ${give_limit} limit setelah mendaftar.\nSilahkan Ketik .menu `)
  }
};

