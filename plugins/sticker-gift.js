const fs =  require('fs');
const { exec } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
exports.on = async ( msg, { conn, command, mess, isVideo, isQuotedVideo, prefix, getRandom, ceklimit, limitnya }) => {
const name = ["MAKER"];  
const tag = ["stickergif"];
const help = ["sgif", "stickergif"]
const limit = 2

   if (help.includes(command)) {
     if (ceklimit) return msg.reply(mess.limit)
     if (isVideo || isQuotedVideo) {
     await conn.downloadAndSaveMediaMessage(msg, "video", `./tmp/${msg.sender.split("@")[0]}.mp4`)
     let buffer = fs.readFileSync(`./tmp/${msg.sender.split("@")[0]}.mp4`)
     msg.reply(mess.wait)
     var rand1 = 'tmp/'+getRandom('.mp4')
     var rand2 = 'tmp/'+getRandom('.webp')
     fs.writeFileSync(`${rand1}`, buffer)
     ffmpeg(`./${rand1}`).on("error", console.error).on("end", () => {
     exec(`webpmux -set exif ./tmp/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
     conn.sendMessage(msg.chat, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg }) })}).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat('webp').save(`${rand2}`)
     await limitnya(msg.sender, limit)
     } else {
      msg.reply(`Kirim video dengan caption ${prefix+command} atau balas video yang sudah dikirim`)
     }
   }
}