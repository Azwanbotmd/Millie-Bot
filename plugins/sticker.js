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

    if (/image/.test(mime) || m.mtype === 'imageMessage') {
        if (!quoted) return
        let buffer = await quoted.download()
        m.reply(mess.wait);
        conn.sendImageAsSticker(m.chat, buffer, m, {
            packname: pack,
            author: own
        });
    } else {
        m.reply(`Kirim gambar atau video dengan caption ${prefix + command} atau balas gambar yang sudah dikirim`);
    }
};

on.names = ['Maker'];
on.tags = ['sticker'];
on.command = ['sticker', 's']
on.limit = 2