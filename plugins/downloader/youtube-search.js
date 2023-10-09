import { youtubeSearch } from '../../lib/yts.js'
export let on = async (m, { 
  text
}) => { 
    try {
        if (!text) return m.reply('*Masukan Info Yang Ingin Di Cari*\n *contoh .yts laila canggung*');
        const {
            video,
            channel
        } = await youtubeSearch(text)
        m.reply(`Loading...`)
        let teks = [...video, ...channel].map(v => {
            switch (v.type) {
                case 'video':
                    return `
🔖 *${v.title}* 
🔗 *${v.url}*
🕒 Duration: ${v.durationH}
📤 Uploaded ${v.publishedTime}
👁️ ${v.view} views
      `.trim()
                case 'channel':
                    return `
╭──────━• *CHANNEL*
│🎀 *${v.channelName}* 
│🔗 *${v.url}*
│📛 _${v.subscriberH} Subscriber_
│🎥 ${v.videoCount} video
┗──────━•
`.trim()
            }
        }).filter(v => v).join('\n\n─────────────━─────────────\n\n')
        m.reply(` 🎗 *YOUTUBE SEARCH* 🎗 \n\n\n` + teks)
    } catch (error) {
        m.reply(`${error}`)
    }    
}

on.names = ['Downloader'];
on.tags = ['ytsearch'];
on.command = ['ytsearch', 'yts'];
on.limit = 1