import { ytmp4 } from '../lib/download.js'
export let on = async ( m, { 
   conn,
   text
 }) => {        
    if (!text) return m.reply('*Masukan Link Youtubenya*');      
    m.reply(`Tunggu...`)       
    let { title, video , quality, thumbnail, size } = await ytmp4(text);      
    conn.sendFile(m.chat, video, { caption : `🎗Youtube Video \nJudul : ${title}\nKualitas : ${quality}\nSize : ${size}` , quoted : m })    
}

on.names = ['Downloader'];
on.tags = ['ytmp4'];
on.command = ['ytmp4', 'ytv']
on.limit = 5