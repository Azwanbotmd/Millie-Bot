import fs from 'fs'
export let on = async (m, { text }) => {
    if (!text) return m.reply('contoh .sf plugins/cinta.js atau file yang ingin kamu save');
    let path = `${text}`
    fs.writeFileSync(path, m.quoted.text);
    m.reply(`tersimpan di ${path}`)
};

on.names = ['Owner'];
on.tags = ['simpan'];
on.command = ['sf', 'simpan'];
on.owner = true