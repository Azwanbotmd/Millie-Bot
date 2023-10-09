export let on = async (m, {
    conn
 }) => {
    let res = 'https://api.xfarr.com/api/randomimage/megumin?apikey=fBwANmhn7q'
    let megumin = await res
    m.reply(`Loading...`)
    conn.sendMessage(m.chat, {
        image: {
            url: megumin
        },
        caption: `🎗 *Megumin* `
    }, {
        quoted: m
    })
};

on.names = ['Anime Menu'];
on.tags = ['megumin'];
on.command = ['megumin'];
on.limit = 5
on.register = true