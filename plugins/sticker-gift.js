import fs from 'fs'
export let on = async (m, {
    conn,
    prefix,
    command,
    mime,
    mess,
    quoted
 }) => {
    let pack = `Millie-Bot`;
    let own = `Ruhend`;

    if (/video/.test(mime) || m.mtype === 'videoMessage') {
        if (!quoted) return
        let buffer = await quoted.download();
        m.reply(mess.wait);
        conn.sendImageAsSticker(m.chat, buffer, m, {
            packname: pack,
            author: own
        });
    } else {
        m.reply(`Kirim video dengan caption ${prefix + command} atau balas video yang sudah dikirim`);
    }
};

on.names = ['Maker'];
on.tags = ['stickergif', 'sgif'];
on.command = ['stickergif', 'sgif']
on.limit = 2