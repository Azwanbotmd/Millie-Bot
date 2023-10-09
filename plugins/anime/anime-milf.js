export let on = async (m, {
    conn
}) => {
    let res = 'https://api.xfarr.com/api/randomimage/nsfwmilf?apikey=fBwANmhn7q'
    let milf = await res
    m.reply(`Loading...`)
    conn.sendMessage(m.chat, {
        image: {
            url: milf
        },
        caption: `🎗 *Milf* `
    }, {
        quoted: m
    })
};

on.names = ['Anime Menu'];
on.tags = ['milf'];
on.command = ['milf'];
on.limit = 5
on.register = true