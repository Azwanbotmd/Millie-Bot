const handler = require('../handler');
module.exports = async (conn, msg, setting) => { try {
const { q, from, prefix, command, reply } = handler(msg, conn, setting);
const name = ["KALKULATOR"];
const tag = ["tambah", "kurang", "kali", "bagi"];

    if (command === 'tambah') {
      if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
      var num_one = q.split(' ')[0];
      var num_two = q.split(' ')[1];
      if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      var nilai_one = Number(num_one);
      var nilai_two = Number(num_two);
      reply(`${nilai_one + nilai_two}`);
    }

    if (command === 'kurang') {
      if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
      var num_one = q.split(' ')[0];
      var num_two = q.split(' ')[1];
      if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      var nilai_one = Number(num_one);
      var nilai_two = Number(num_two);
      reply(`${nilai_one - nilai_two}`);
    }

    if (command === 'kali') {
      if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
      var num_one = q.split(' ')[0];
      var num_two = q.split(' ')[1];
      if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      var nilai_one = Number(num_one);
      var nilai_two = Number(num_two);
      reply(`${nilai_one * nilai_two}`);
    }

    if (command === 'bagi') {
      if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
      var num_one = q.split(' ')[0];
      var num_two = q.split(' ')[1];
      if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
      var nilai_one = Number(num_one);
      var nilai_two = Number(num_two);
      reply(`${nilai_one / nilai_two}`);
    }

  } catch (err) {
    console.error(err);
    const { reply } = handler(msg, conn, setting);
    reply(`Contoh:\n\ntambah 2 3\nkali 2 3\nbagi 2 3\nkurang 2 3`);
  }
};
