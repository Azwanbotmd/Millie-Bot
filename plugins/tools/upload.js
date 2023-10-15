import fs from 'fs';
import { upload } from '../../lib/UploaderMedia.js'
export let on = async (m, {
    conn,
    mess,
    prefix,
    command,
    getRandom,
    bytesToSize,
    mime,
    quoted,
    isSticker,
    isQuotedSticker
}) => {
    if (!mime && !quoted) return
    if (isSticker || isQuotedSticker) {
        await conn.downloadAndSaveMediaMessage(m, 'sticker', `./tmp/${m.sender.split("@")[0]}.webp`);
        m.reply(mess.wait);

        let buffer_up = fs.readFileSync(`./tmp/${m.sender.split("@")[0]}.webp`);
        let rand2 = 'tmp/' + getRandom('.webp');
        fs.writeFileSync(`./${rand2}`, buffer_up);

        let {
            name,
            url,
            size
        } = await upload(rand2);
        let sizeNy = bytesToSize(size);

        let teks = `UPLOAD SUKSES\n*Url :* ${url}\n*Name :* ${name} \n*Size :* ${sizeNy}\n*Type:* Sticker`;

        conn.sendMessage(m.chat, {
            text: teks
        }, {
            quoted: m
        });

    } else if (/image/.test(mime) || m.mtype === 'imageMessage' ||
        /audio/.test(mime) || m.mtype === 'audioMessage' ||
        /video/.test(mime) || m.mtype === 'videoMessage') {

        let mediaType;
        let fileExt;

        if (/image/.test(mime) || m.mtype === 'imageMessage') {
            mediaType = 'image';
            fileExt = '.jpeg';
        } else if (/audio/.test(mime) || m.mtype === 'audioMessage') {
            mediaType = 'audio';
            fileExt = '.mp3';
        } else if (/video/.test(mime) || m.mtype === 'videoMessage') {
            mediaType = 'video';
            fileExt = '.mp4';
        }

        await conn.downloadAndSaveMediaMessage(m, mediaType, `./tmp/${m.sender.split("@")[0]}${fileExt}`);
        m.reply(mess.wait);

        let buffer_up = fs.readFileSync(`./tmp/${m.sender.split("@")[0]}${fileExt}`);
        let rand2 = 'tmp/' + getRandom(`${fileExt}`);
        fs.writeFileSync(`./${rand2}`, buffer_up);

        let {
            name,
            url,
            size
        } = await upload(rand2);
        let sizeNy = bytesToSize(size);

        let teks = `UPLOAD SUKSES\n*Url :* ${url}\n*Name :* ${name} \n*Size :* ${sizeNy}\n*Type:* ${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}`;
        conn.sendMessage(m.chat, {
            text: teks
        }, {
            quoted: m
        });
    } else {
        m.reply('Balas Media Atau Kirim Media Dengan Caption .tourl atau .upload')
    }    
};

on.names = ['Tools'];
on.tags = ['tourl', 'upload'];
on.command = ['tourl', 'upload'];
on.limit = 5;
on.register = true;
