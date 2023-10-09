export let on = async (m, {
    conn
}) => {
    let res = `https://api.xfarr.com/api/randomimage/waifu?apikey=fBwANmhn7q`
    let waifu = await res
    m.reply(`Loading...`)
    conn.sendMessage(m.chat, {
        image: {
            url: waifu
        },
        caption: `🎗 *Waifi* `
    }, {
        quoted: m
    })
};

on.names = ['Anime Menu'];
on.tags = ['waifu'];
on.command = ['waifu'];
on.limit = 5
on.register = true