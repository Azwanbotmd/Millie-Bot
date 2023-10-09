export let on = async (m, {
    conn
 }) => {
    let res = 'https://api.xfarr.com/api/randomimage/neko?apikey=fBwANmhn7q'
    let neko = await res
    m.reply(`Loading...`)
    conn.sendMessage(m.chat, {
        image: {
            url: neko
        },
        caption: `🎗 *Neko* `
    }, {
        quoted: m
    })
};

on.names = ['Anime Menu'];
on.tags = ['neko'];
on.command = ['neko'];
on.limit = 5
on.register = true