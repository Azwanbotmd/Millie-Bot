const handler = require('../handler');
const { pofm } = require('../function/pofm');
module.exports = async (conn, msg, setting) => {
const { from, prefix, getRandom, isQuotedAudio, isImage, isQuotedImage, bytesToSize, mess, fs, isVideo, isQuotedVideo, isSticker, sender, isQuotedSticker, command, isOwner, q, reply, limitnya, ceklimit, daftar } = handler(msg, conn, setting);
const name = ["TOOLS"];
const tag = ["tourl", "upload"];
const help = ["tourl", "upload"];
const limit = 2

  if (help.includes(command)) {
   if (daftar) return reply(mess.daftar)
   if (ceklimit) return reply(mess.limit)    
    if (isSticker || isQuotedSticker) {
      await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./tmp/${sender.split("@")[0]}.webp`);
      reply(mess.wait);

      let buffer_up = fs.readFileSync(`./tmp/${sender.split("@")[0]}.webp`);
      var rand2 = 'tmp/' + getRandom('.webp');
      fs.writeFileSync(`./${rand2}`, buffer_up);

      var { url, size } = await pofm(rand2);
      let sizeNy = bytesToSize(size);

      var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :*  \n*Size :* ${sizeNy}\n*Type:* Sticker`;

      conn.sendMessage(from, { text: teks }, { quoted: msg });
      await limitnya(sender, limit)
      reply(`${limit} Limit Terpakai`)
    } else if (isVideo || isQuotedVideo) {
      await conn.downloadAndSaveMediaMessage(msg, 'video', `./tmp/${sender.split("@")[0]}.mp4`);
      reply(mess.wait);

      let buffer_up = fs.readFileSync(`./tmp/${sender.split("@")[0]}.mp4`);
      var rand2 = 'tmp/' + getRandom('.mp4');
      fs.writeFileSync(`./${rand2}`, buffer_up);

      var { url, size } = await pofm(rand2);
      let sizeNy = bytesToSize(size);

      var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :*  \n*Size :* ${sizeNy}\n*Type:* Video`;

      conn.sendMessage(from, { text: teks }, { quoted: msg });
      await limitnya(sender, limit)
      reply(`${limit} Limit Terpakai`)
    } else if (isImage || isQuotedImage) {
      var mediany = await conn.downloadAndSaveMediaMessage(msg, 'image', `./tmp/${sender.split("@")[0]}.jpg`);
      reply(mess.wait);

      let buffer_up = fs.readFileSync(mediany);
      var rand2 = 'tmp/' + getRandom('.png');
      fs.writeFileSync(`./${rand2}`, buffer_up);

      var { url, size } = await pofm(rand2);
      let sizeNy = bytesToSize(size);

      var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :*  \n*Size :* ${sizeNy}\n*Type:* Image`;

      conn.sendMessage(from, { text: teks }, { quoted: msg });
      await limitnya(sender, limit)
      reply(`${limit} Limit Terpakai`)
    } else if (isQuotedAudio) {
      await conn.downloadAndSaveMediaMessage(msg, 'audio', `./tmp/${sender.split("@")[0]}.mp3`);
      reply(mess.wait);

      let buffer_up = fs.readFileSync(`./tmp/${sender.split("@")[0]}.mp3`);
      var rand2 = ' ' + getRandom('.mp3');
      fs.writeFileSync(`./${rand2}`, buffer_up);

      var { url, size } = await pofm(rand2);
      let sizeNy = bytesToSize(size);

      var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :*  \n*Size :* ${sizeNy}\n*Type:* Audio`;

      conn.sendMessage(from, { text: teks }, { quoted: msg });
      await limitnya(sender, limit)
      reply(`${limit} Limit Terpakai`)
    } else {
      reply(`*reply audio/video/ gambar dengan pesan ${prefix+command}*`);
    }
    
  }
}
