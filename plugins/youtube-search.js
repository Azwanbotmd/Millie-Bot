const youtubeSearch = require('../function/yts');
exports.on = async ( msg, { conn, command, text }) => {
const name = ["DOWNLOADER"];
const tag = ["ytsearch"];
const help = ["ytsearch", "yts"];

   if (help.includes(command)) { try {     
      if (!text) return msg.reply('*Masukan Info Yang Ingin Di Cari*\n *contoh .yts laila canggung*');
      const { video, channel } = await youtubeSearch(text)
      msg.reply(`Loading...`)
      let teks = [...video, ...channel].map(v => {
    switch (v.type) {
      case 'video': return `
🔖 *${v.title}* 
🔗 *${v.url}*
🕒 Duration: ${v.durationH}
📤 Uploaded ${v.publishedTime}
👁️ ${v.view} views
      `.trim()
      case 'channel': return `
╭──────━• *CHANNEL*
│🎀 *${v.channelName}* 
│🔗 *${v.url}*
│📛 _${v.subscriberH} Subscriber_
│🎥 ${v.videoCount} video
┗──────━•
`.trim()
    }
  }).filter(v => v).join('\n\n─────────────━─────────────\n\n')
  msg.reply(` 🎗 *YOUTUBE SEARCH* 🎗 \n\n\n` + teks)
  } catch (error) {    
    msg.reply(`${error}`)     
    }
  }
}