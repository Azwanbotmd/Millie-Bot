import fetch from 'node-fetch'
export let on = async (m, {
    conn,
    text,
    mess
}) => {
    if (!text) return m.reply('Masukan agram contoh .ig https://www.instagram.com/p/Cx2oXj-PQNN/?igshid=MTc4MmM1YmI2Ng==');
    let res = await fetch(`https://vihangayt.me/download/instagram?url=${text}`)
    let igeh = await res.json();
    m.reply(mess.wait);
    let image = igeh.data.data.map(item => item.url);
    for (let ig of image) {
        conn.sendFile(m.chat, ig, {
            quoted: m
        })
    }
};

on.names = ['Downloader'];
on.tags = ['instagram'];
on.command = ['instagram', 'ig', 'igdl'];
on.limit = 8