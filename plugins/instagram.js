const handler = require('../handler');
module.exports = async (conn, msg, setting) => { try {
const { from, fetch, q, command, reply, sender, limitnya, ceklimit, daftar, mess } = handler(msg, conn, setting);
const name = ["DOWNLOADER"];
const tag = ["instagram"];
const help = ["instagram", "ig", "igdl"];
const limit = 3

  if (help.includes(command)) {
     if (daftar) return reply(mess.daftar)
     if (ceklimit) return reply(mess.limit)
     if (!q) return reply('Masukan agram contoh .ig https://www.instagram.com/p/CvkZ7fcrEpQ/?igshid=MzRlODBiNWFlZA==');
     const _0x2403f3=_0x435b;function _0x1f4b(){const _0xcbe1dd=['map','239998PVqMTR','url','56284iGeCKP','941716wfXSIB','1336086fVoZGZ','hangayt.me','https://vi','sendMessag','Loading...','4154112xmYNJN','includes','1940SIVtoz','.jpg','/download/','623144PqiafT','5YlLVLE','data','json','114bexMUW','url=','instagram?','.png','.webp','.xyz','119IjxZhw','.mp4','8275059XFgmBk'];_0x1f4b=function(){return _0xcbe1dd;};return _0x1f4b();}(function(_0x290551,_0x50d194){const _0x31d505=_0x435b,_0x5e272b=_0x290551();while(!![]){try{const _0x315c2f=parseInt(_0x31d505(0x196))/(-0x15f9+0x1*-0x26+0x1620)+parseInt(_0x31d505(0x194))/(0x112d*-0x2+0x150b+0x1e7*0x7)*(parseInt(_0x31d505(0x188))/(0x588+0xfc9+0x2*-0xaa7))+parseInt(_0x31d505(0x195))/(0x59*-0x3a+-0x2314+0x1*0x3742)*(-parseInt(_0x31d505(0x185))/(-0x3*0xc37+-0x1b01+0x3fab))+parseInt(_0x31d505(0x19b))/(-0x1*-0x1eb1+0x2*0x10e4+-0x4073)+parseInt(_0x31d505(0x18e))/(0xd3e+0x1*-0x23c9+-0x1*-0x1692)*(parseInt(_0x31d505(0x184))/(0x8*0x3b5+0xd5f*-0x1+-0x1041))+parseInt(_0x31d505(0x190))/(0x2496+0x454+-0x28e1)+parseInt(_0x31d505(0x181))/(-0x1*0x1a87+0x10b+-0x42*-0x63)*(-parseInt(_0x31d505(0x192))/(-0x1*0x121d+0x6ee*-0x4+0x2de0));if(_0x315c2f===_0x50d194)break;else _0x5e272b['push'](_0x5e272b['shift']());}catch(_0x175ceb){_0x5e272b['push'](_0x5e272b['shift']());}}}(_0x1f4b,0x86ae0+0x2c85*-0x69+0x172b2e));let res=await fetch(_0x2403f3(0x198)+_0x2403f3(0x197)+_0x2403f3(0x183)+_0x2403f3(0x18a)+_0x2403f3(0x189)+q),igeh=await res[_0x2403f3(0x187)]();reply(_0x2403f3(0x19a));let image=igeh[_0x2403f3(0x186)][_0x2403f3(0x186)][_0x2403f3(0x191)](_0x11cdca=>_0x11cdca[_0x2403f3(0x193)]);function _0x435b(_0x41333d,_0x2c9662){const _0x30d2a5=_0x1f4b();return _0x435b=function(_0x3cc400,_0x565462){_0x3cc400=_0x3cc400-(0x6a6+-0xf4f*0x2+0x8*0x32f);let _0x5d88c2=_0x30d2a5[_0x3cc400];return _0x5d88c2;},_0x435b(_0x41333d,_0x2c9662);}for(let ig of image){if(ig[_0x2403f3(0x180)](_0x2403f3(0x18f))||ig[_0x2403f3(0x180)](_0x2403f3(0x18d)))conn[_0x2403f3(0x199)+'e'](from,{'video':{'url':ig}},{'quoted':msg});else(ig[_0x2403f3(0x180)](_0x2403f3(0x182))||ig[_0x2403f3(0x180)](_0x2403f3(0x18b))||ig[_0x2403f3(0x180)](_0x2403f3(0x18c)))&&conn[_0x2403f3(0x199)+'e'](from,{'image':{'url':ig}},{'quoted':msg});}
     await limitnya(sender, limit)
     await reply(`${limit} Limit Terpakai`)  
        }
    } catch (error) {
        const { reply } = handler(msg, conn, setting);
        console.error(error);
        if (error) reply(`${error}`);
    }
}

