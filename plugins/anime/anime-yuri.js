export let on = async (m, {
    conn
}) => {
    let res = 'https://api.xfarr.com/api/randomimage/nsfwyuri?apikey=fBwANmhn7q'
    m.reply(`Loading...`)
    let yuri = await res
    conn.sendFile(m.chat, yuri, {
        caption: `🎗 *Yuri* `,
        quoted: m
    })
};

on.names = ['Anime Menu'];
on.tags = ['yuri'];
on.command = ['yuri'];
on.limit = 5
on.register = true