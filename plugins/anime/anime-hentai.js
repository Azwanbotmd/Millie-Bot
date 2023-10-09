export let on = async (m, {
    conn
}) => {
    let res = 'https://api.xfarr.com/api/randomimage/nsfwhentai?apikey=fBwANmhn7q'
    let hentai = await res
    m.reply(`Loading...`)
    conn.sendMessage(m.chat, {
        image: {
            url: hentai
        },
        caption: `🎗 *Hentai* `
    }, {
        quoted: m
    })
};

on.names = ['Anime Menu'];
on.tags = ['hentai'];
on.command = ['hentai'];
on.limit = 5
on.register = true