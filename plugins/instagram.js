const fetch = require('node-fetch')
exports.on = async ( msg, { conn, command, mess, text, limitnya, ceklimit }) => { try {
const name = ["DOWNLOADER"];
const tag = ["instagram"];
const help = ["instagram", "ig", "igdl"];
const limit = 3

    if (help.includes(command)) {
     if (!text) return msg.reply('Masukan agram contoh .ig https://www.instagram.com/p/CvkZ7fcrEpQ/?igshid=MzRlODBiNWFlZA==');
     let res = await fetch(`https://vihangayt.me/download/instagram?url=${text}`)
     let igeh = await res.json();     
     msg.reply(mess.wait);
     let image = igeh.data.data.map(item => item.url);
     function _0x5c1b(_0x46b414,_0x4a7092){const _0x246b3c=_0x5ec8();return _0x5c1b=function(_0x3576e6,_0x5c5f75){_0x3576e6=_0x3576e6-(0xfcd*-0x1+-0x15e1+0x2633);let _0x126626=_0x246b3c[_0x3576e6];return _0x126626;},_0x5c1b(_0x46b414,_0x4a7092);}const _0x4a05a3=_0x5c1b;(function(_0x145bda,_0x439e5f){const _0xdf71f9=_0x5c1b,_0x3760b8=_0x145bda();while(!![]){try{const _0x1cf8fd=-parseInt(_0xdf71f9(0x91))/(0x1*-0x207e+0x7*-0x271+0x3196)*(-parseInt(_0xdf71f9(0x93))/(-0x37f*0x5+-0xc3f+-0xb*-0x2b4))+parseInt(_0xdf71f9(0x87))/(-0x24a0+0x19b7+0xaec)+-parseInt(_0xdf71f9(0x8d))/(0x8*-0x139+0x6a*0x4c+-0x15ac*0x1)+-parseInt(_0xdf71f9(0x86))/(0x41*-0x73+0x2c1*0x3+0x14f5)+parseInt(_0xdf71f9(0x95))/(0x7*-0x284+0x1ad5*0x1+0x3*-0x311)+-parseInt(_0xdf71f9(0x8e))/(-0x66d+-0x3*0x1a3+0xb5d)*(parseInt(_0xdf71f9(0x8f))/(0xc33+-0xde6+-0x1bb*-0x1))+-parseInt(_0xdf71f9(0x88))/(0x12c6+-0x1ad0+0x813)*(-parseInt(_0xdf71f9(0x8a))/(0x3cd+-0x1*0x1fa5+0x1be2*0x1));if(_0x1cf8fd===_0x439e5f)break;else _0x3760b8['push'](_0x3760b8['shift']());}catch(_0x152220){_0x3760b8['push'](_0x3760b8['shift']());}}}(_0x5ec8,0x16ed96+0x13e0ab+-0x1d8648));function _0x5ec8(){const _0x8808cb=['.webp','.jpg','3570520kIkyPo','1680936qmFpWc','84798kiuZTw','.xyz','310nGMwtv','sender','includes','6529120yXqfuH','462133tybZoN','104ApCuzF','.mp4','7FasFxi','.png','444740onDSkl','chat','9996240IDnMnz','sendMessag'];_0x5ec8=function(){return _0x8808cb;};return _0x5ec8();}for(let ig of image){if(ig[_0x4a05a3(0x8c)](_0x4a05a3(0x90))||ig[_0x4a05a3(0x8c)](_0x4a05a3(0x89)))conn[_0x4a05a3(0x96)+'e'](msg[_0x4a05a3(0x94)],{'video':{'url':ig}},{'quoted':msg}),await limitnya(msg[_0x4a05a3(0x8b)],limit);else(ig[_0x4a05a3(0x8c)](_0x4a05a3(0x85))||ig[_0x4a05a3(0x8c)](_0x4a05a3(0x92))||ig[_0x4a05a3(0x8c)](_0x4a05a3(0x97)))&&(conn[_0x4a05a3(0x96)+'e'](msg[_0x4a05a3(0x94)],{'image':{'url':ig}},{'quoted':msg}),await limitnya(msg[_0x4a05a3(0x8b)],limit));}       
      }  
    } catch (error) {
        console.error(error);
        if (error) msg.reply(`${error}`);
    }
}