import fetch from 'node-fetch'
export let on = async (m, {
    text
 }) => {
    if (!text) return m.reply('contoh .ai apa kabar?')
    let res = await fetch(`https://vihangayt.me/tools/chatgpt?q=${text}`)
    m.reply('Menunggu Respon...')
    let open = await res.json()
    let ai = await open.data
    m.reply(`${ai}`)
};

on.names = ['Tools'];
on.tags = ['ai', 'chatgpt'];
on.command = ['ai', 'chatgpt'];
on.limit = 5
on.register = true