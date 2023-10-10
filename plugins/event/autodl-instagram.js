import fetch from 'node-fetch'
export let event = async (m, {
    conn,
    budy,
    limitnya,
    ceklimit,
    mess
}) => {
    if (!m.isBaileys && budy.includes('instagram')) {
        if (ceklimit) return m.reply(mess.limit);
        m.reply(`Tunggu...`)
        let res = await fetch(`https://vihangayt.me/download/instagram?url=${budy}`)
        let igeh = await res.json();
        m.reply(mess.wait);
        let image = igeh.data.data.map(item => item.url);
        for (let ig of image) {
            conn.sendFile(m.chat, ig, {
                quoted: m
            })
        }
        limitnya(m.sender, 7)
    }
}
