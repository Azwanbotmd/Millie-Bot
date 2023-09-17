exports.on = async ( msg, { conn, command, prefix, text }) => { try {
const name = ["KALKULATOR"];
const tag = ["tambah", "kurang", "kali", "bagi"];

    if (command === 'tambah') {   
      if (!text) return msg.reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
      var num_one = text.split(' ')[0];
      var num_two = text.split(' ')[1];
      if (!num_one) return msg.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      if (!num_two) return msg.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      var nilai_one = Number(num_one);
      var nilai_two = Number(num_two);
      msg.reply(`${nilai_one + nilai_two}`);
    }

    if (command === 'kurang') {   
      if (!text) return msg.reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
      var num_one = text.split(' ')[0];
      var num_two = text.split(' ')[1];
      if (!num_one) return msg.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      if (!num_two) return msg.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      var nilai_one = Number(num_one);
      var nilai_two = Number(num_two);
      msg.reply(`${nilai_one - nilai_two}`);
    }

    if (command === 'kali') {    
      if (!text) return msg.reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
      var num_one = text.split(' ')[0];
      var num_two = text.split(' ')[1];
      if (!num_one) return msg.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      if (!num_two) return msg.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      var nilai_one = Number(num_one);
      var nilai_two = Number(num_two);
      msg.reply(`${nilai_one * nilai_two}`);
    }

    if (command === 'bagi') {    
      if (!text) return msg.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
      var num_one = text.split(' ')[0];
      var num_two = text.split(' ')[1];
      if (!num_one) return msg.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      if (!num_two) return msg.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      var nilai_one = Number(num_one);
      var nilai_two = Number(num_two);
      msg.reply(`${nilai_one / nilai_two}`);
    }

  } catch (err) {
    console.error(err);
    msg.reply(`Contoh:\n\ntambah 2 3\nkali 2 3\nbagi 2 3\nkurang 2 3`);
  }
};
