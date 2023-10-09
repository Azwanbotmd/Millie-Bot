export let on = async (m, {
    conn
}) => {
    let res = 'https://api.xfarr.com/api/randomimage/nsfwwaifu?apikey=fBwANmhn7q'        
    let waifu2 = await res
    m.reply(`Loading...`)
    conn.sendFile(m.chat, waifu2, {
        caption: `🎗 *waifu2 NSFW* `,
        quoted: m
    })
};

on.names = ['Anime Menu'];
on.tags = ['waifu2'];
on.command = ['waifu2'];
on.limit = 5
on.register = true