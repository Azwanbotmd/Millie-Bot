export let on = async (m, {
    conn
}) => {
    let res = 'https://api.zahwazein.xyz/api/anime/sfw/wallpaper?apikey=zenzkey_519828f1ca'
    m.reply(`Loading...`)
    let animewall = await res 
    conn.sendFile(m.chat, animewall, {
        caption: `🎗 *Anime Wallpaper* `,
        quoted: m
    })
};

on.names = ['Anime Menu'];
on.tags = ['animewall'];
on.command = ['animewall'];
on.limit = 5
on.register = true