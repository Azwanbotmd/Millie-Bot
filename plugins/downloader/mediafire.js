import { mediafireDl } from '../../lib/scrape_Mediafire.js'
export let on = async (m, {
    conn,
    text
}) => {
    if (!text) return m.reply('*Contoh:*\n.mediafire https://www.mediafire.com/file/96mscj81p92na3r/images+(35).jpeg/file');
    let isLinks = text.match(/(?:https?:\/{2})?(?:w{3}\.)?mediafire(?:com)?\.(?:com|be)(?:\/www\?v=|\/)([^\s&]+)/)
    if (!isLinks) return reply('Link yang kamu berikan tidak valid')
    let emfi1 = await mediafireDl(`${isLinks}`)
    if (emfi1[0].size.split('MB')[0] >= 100) return m.reply('File Melebihi Batas ' + util.format(emfi1))
    let result4 = `*MEDIAFIRE*
Nama : ${emfi1[0].nama}
Size : ${emfi1[0].size}
Type : ${emfi1[0].mime}

Mengirim file...`
    m.reply(result4)
    conn.sendMessage(m.chat, {
        document: {
            url: emfi1[0].link
        },
        fileName: emfi1[0].nama,
        mimetype: emfi1[0].mime
    }, {
        quoted: m
    })
};

on.names = ['Downloader'];
on.tags = ['mediafire']
on.command = ['mediafire', 'mf'];
on.limit = 25