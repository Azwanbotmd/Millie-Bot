const handler = require('../handler');
const fs =  require('fs')
module.exports = async (conn, msg, setting) => {
const { from, isVideo,prefix,exec,getRandom,ffmpeg,isQuotedVideo ,isQuotedMsg,type,sender, isSticker ,body, args, q, quotedMsg, command, isCmd, reply, limitnya, ceklimit, daftar, mess } = handler(msg, conn, setting);
const name = ["CONVERTER MAKER"];  
const tag = ["tomp3"];
const help = ["tomp3", "toaudio"]
const limit = 2

if (help.includes(command)) {
if (daftar) return reply(mess.daftar)
if (ceklimit) return reply(mess.limit)
if (isVideo || isQuotedVideo){
await conn.downloadAndSaveMediaMessage(msg, 'video', `./tmp/${sender.split("@")[0]}.mp4`)
var media = fs.readFileSync(`./tmp/${sender.split("@")[0]}.mp4`)
let ran = './tmp/'+getRandom('.mp3')
fs.writeFileSync(`./${ran}`, media)
let { toAudio } = require('../function/converter')
let audio = await toAudio(media, 'mp4')
conn.sendMessage(from, { audio: fs.readFileSync(ran),  mimetype: 'audio/mp4', fileName: `${sender.split("@")[0]}ToMp3`, ptt: args[1] == '--ptt' ? true : false }, { quoted: msg })
await limitnya(sender, limit)
reply(`${limit} Limit Terpakai`)
} else {
reply(`*Reply video dengan pesan ${prefix+command}*`)
}
}
}
