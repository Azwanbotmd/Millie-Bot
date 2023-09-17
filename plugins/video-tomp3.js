const { toAudio } = require('../function/converter')
const fs = require('fs')
exports.on = async ( msg, { conn, command, prefix, args, mess, isVideo, isQuotedVideo, getRandom, ceklimit, limitnya }) => {
const name = ["MAKER"];  
const tag = ["tomp3"];
const help = ["tomp3", "toaudio"]
const limit = 2

   if (help.includes(command)) {
    if (ceklimit) return msg.reply(mess.limit)
    if (isVideo || isQuotedVideo){
    await conn.downloadAndSaveMediaMessage(msg, 'video', `./tmp/${msg.sender.split("@")[0]}.mp4`)
    var media = fs.readFileSync(`./tmp/${msg.sender.split("@")[0]}.mp4`)
    let ran = './tmp/'+getRandom('.mp3')
    fs.writeFileSync(`./${ran}`, media)
    let audio = await toAudio(media, 'mp4')
    conn.sendMessage(msg.chat, { audio: fs.readFileSync(ran),  mimetype: 'audio/mp4', fileName: `${msg.sender.split("@")[0]}ToMp3`, ptt: args[1] == '--ptt' ? true : false }, { quoted: msg })
    await limitnya(msg.sender, limit)
    } else {
    msg.reply(`*reply video dengan pesan ${prefix+command}*`)
   }
  }
}