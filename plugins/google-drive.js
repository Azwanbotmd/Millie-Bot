import fetch from 'node-fetch'
export let on = async (m, {
    conn,
    text
 }) => {
    try {
        if (!text) return m.reply(`Masukan Link Google Drove nya contoh .Googledrive https://drive.google.com/file/d/1BKaXs8uIt4_C_dEKUje-nn-XYYNOO07y/view?usp=drivesdk`)
        let res = await fetch(`https://api.xfarr.com/api/download/gdrive?apikey=fBwANmhn7q&url=${text}`)
        m.reply(`Loading...`) 
        let data = await res.json()
        let download = data.result
        let name = download.name
        let mime = download.mimetype
        let link = download.url
        conn.sendMessage(m.chat, {
            document: {
                url: link
            },
            caption: `🎗 *Google Drive*\nName: ${name}`,
            fileName: name,
            mimetype: mime
        }, {
            quoted: m
        })
    } catch (e) {
        if (e) return m.reply(e)
    }
};

on.names = ['Downloader'];
on.tags = ['googledrive'];
on.command = ['gdrive', 'googledrive'];
on.limit = 25
on.register = true