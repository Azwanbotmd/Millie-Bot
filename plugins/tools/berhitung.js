export let on = async (m, {
    conn,
    prefix,
    text,
    command,
    cmd
}) => {
    try {
        if (cmd === 'tambah') {
            if (!text) return m.reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
            var num_one = text.split(' ')[0];
            var num_two = text.split(' ')[1];
            if (!num_one) return m.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
            if (!num_two) return m.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
            var nilai_one = Number(num_one);
            var nilai_two = Number(num_two);
            m.reply(`${nilai_one + nilai_two}`);
        }
        if (cmd === 'kurang') {
            if (!text) return m.reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
            var num_one = text.split(' ')[0];
            var num_two = text.split(' ')[1];
            if (!num_one) return m.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
            if (!num_two) return m.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
            var nilai_one = Number(num_one);
            var nilai_two = Number(num_two);
            m.reply(`${nilai_one - nilai_two}`);
        }
        if (cmd === 'kali') {
            if (!text) return m.reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
            var num_one = text.split(' ')[0];
            var num_two = text.split(' ')[1];
            if (!num_one) return m.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
            if (!num_two) return m.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
            var nilai_one = Number(num_one);
            var nilai_two = Number(num_two);
            m.reply(`${nilai_one * nilai_two}`);
        }
        if (cmd === 'bagi') {
            if (!text) return m.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
            var num_one = text.split(' ')[0];
            var num_two = text.split(' ')[1];
            if (!num_one) return m.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
            if (!num_two) return m.reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
            var nilai_one = Number(num_one);
            var nilai_two = Number(num_two);
            m.reply(`${nilai_one / nilai_two}`);
        }
    } catch (err) {
        console.error(err);
        m.reply(`Contoh:\n\n.tambah 2 3\n.kali 2 3\n.bagi 2 3\n.kurang 2 3`);
    }
};

on.names = ['Kalkulator'];
on.tags = ['tambah', 'kurang', 'kali', 'bagi'];
on.command = ['tambah', 'kurang', 'kali', 'bagi'];
on.limit = 4;