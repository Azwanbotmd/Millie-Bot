const fs = require('fs');
const { pofm } = require ('../function/pofm.js')
exports.on = async ( msg, { conn, command, mess, prefix, getRandom, isQuotedAudio, isImage, isQuotedImage, bytesToSize, isVideo, isQuotedVideo, isSticker, isQuotedSticker, limitnya, ceklimit }) => {
const name = ["TOOLS"];
const tag = ["tourl", "upload"];
const help = ["tourl", "upload"];
const limit = 2

  if (help.includes(command)) {   
   if (ceklimit) return msg.reply(mess.limit)    
    if (isSticker || isQuotedSticker) {
      await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./tmp/${msg.sender.split("@")[0]}.webp`);
      msg.reply(mess.wait);

      let buffer_up = fs.readFileSync(`./tmp/${msg.sender.split("@")[0]}.webp`);
      var rand2 = 'tmp/' + getRandom('.webp');
      fs.writeFileSync(`./${rand2}`, buffer_up);

      var { url, size } = await pofm(rand2);
      let sizeNy = bytesToSize(size);

      var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :*  \n*Size :* ${sizeNy}\n*Type:* Sticker`;

      conn.sendMessage(msg.chat, { text: teks }, { quoted: msg });
      await limitnya(msg.sender, limit)
      
    } else if (isVideo || isQuotedVideo) {
      await conn.downloadAndSaveMediaMessage(msg, 'video', `./tmp/${msg.sender.split("@")[0]}.mp4`);
      msg.reply(mess.wait);

      let buffer_up = fs.readFileSync(`./tmp/${msg.sender.split("@")[0]}.mp4`);
      var rand2 = 'tmp/' + getRandom('.mp4');
      fs.writeFileSync(`./${rand2}`, buffer_up);

      var { url, size } = await pofm(rand2);
      let sizeNy = bytesToSize(size);

      var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :*  \n*Size :* ${sizeNy}\n*Type:* Video`;

      conn.sendMessage(msg.chat, { text: teks }, { quoted: msg });
      await limitnya(msg.sender, limit)
      
    } else if (isImage || isQuotedImage) {
      var mediany = await conn.downloadAndSaveMediaMessage(msg, 'image', `./tmp/${msg.sender.split("@")[0]}.jpg`);
      msg.reply(mess.wait);

      let buffer_up = fs.readFileSync(mediany);
      var rand2 = 'tmp/' + getRandom('.png');
      fs.writeFileSync(`./${rand2}`, buffer_up);

      var { url, size } = await pofm(rand2);
      let sizeNy = bytesToSize(size);

      var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :*  \n*Size :* ${sizeNy}\n*Type:* Image`;

      conn.sendMessage(msg.chat, { text: teks }, { quoted: msg });
      await limitnya(msg.sender, limit)
      
    } else if (isQuotedAudio) {
      await conn.downloadAndSaveMediaMessage(msg, 'audio', `./tmp/${msg.sender.split("@")[0]}.mp3`);
      msg.reply(mess.wait);

      let buffer_up = fs.readFileSync(`./tmp/${msg.sender.split("@")[0]}.mp3`);
      var rand2 = 'tmp/' + getRandom('.mp3');
      fs.writeFileSync(`./${rand2}`, buffer_up);

      var { url, size } = await pofm(rand2);
      let sizeNy = bytesToSize(size);

      var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :*  \n*Size :* ${sizeNy}\n*Type:* Audio`;

      conn.sendMessage(msg.chat, { text: teks }, { quoted: msg });
      await limitnya(msg.sender, limit)
      
    } else {
      msg.reply(`*reply audio/video/ gambar dengan pesan ${prefix+command}*`);
    }
    
  }
}
