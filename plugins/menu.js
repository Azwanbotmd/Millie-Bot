import fetch from 'node-fetch';
import fs from 'fs';

export let on = async (m, {
    conn,
    command,
    mess,
    setting,
    prefix,
    checkPremiumUser
 }) => { 
    let isPremium = checkPremiumUser(m.sender);
    let prem = isPremium ? 'Aktif' : 'Tidak';
    let thumbnail = `${setting.thumbnail}`;
    let pemilik = `${setting.owner}`;
    let sosmed = `${setting.sosmed}`;
    let jembut = ` ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ `; // hiasan atas
    let title = `${setting.botName}\n${setting.footer}`;
    let music = setting.music;
    m.reply(mess.wait)
    function _0x2c38(_0x3c9406,_0x35359a){const _0x48a9b6=_0x3f94();return _0x2c38=function(_0x187dea,_0x29fcad){_0x187dea=_0x187dea-(-0x1*0x22b6+-0xc5+-0x424*-0x9);let _0x9af1e0=_0x48a9b6[_0x187dea];return _0x9af1e0;},_0x2c38(_0x3c9406,_0x35359a);}const _0x8677f6=_0x2c38;function _0x3f94(){const _0x48e2e6=['replace','log','VgovL','┌──⭓\x20','buffer','then','User\x20@','join','./plugins/','sender','133202gtXmsL','6vOtpYc','sendMessag','./plugins','chat','from','utf-8','427494QNUDMc','readFile','\x20\x0aPremium:','filter','2078096lIdflb','3230zHblgF','1141294wWyWEh','split','204lzAHhN','match','\x0aOwner:\x20+','set','promises','────⭓\x0a\x0a','216ymDJAC','136820yjLanS','link','reply','\x0a│⭔','35KYtmHy','\x0a└────────','254583zTlLVL','18639LYgavJ','matchAll','hEfhP','indexOf','push','all','get','.js','has','readdir','endsWith','map','group'];_0x3f94=function(){return _0x48e2e6;};return _0x3f94();}(function(_0x3df8a4,_0x4ad783){const _0x322ee7=_0x2c38,_0xcf6684=_0x3df8a4();while(!![]){try{const _0x38a3f8=parseInt(_0x322ee7(0x1db))/(-0x11b1*0x1+0xa14+-0x3*-0x28a)+-parseInt(_0x322ee7(0x1f1))/(0x1afc+-0xe1d+-0xcdd)+-parseInt(_0x322ee7(0x1dc))/(0x1ce0+-0x1dd4+0xf7)*(-parseInt(_0x322ee7(0x1e6))/(-0x4f3*-0x7+0x2082*0x1+0x11*-0x3f3))+-parseInt(_0x322ee7(0x1f5))/(0xbc*0x12+-0x2*0x695+-0x9)*(parseInt(_0x322ee7(0x1e2))/(-0x21b3+-0xcd+0x2286))+-parseInt(_0x322ee7(0x1f7))/(-0x134e*0x2+-0x2040+0x17a1*0x3)*(parseInt(_0x322ee7(0x1f0))/(-0x848+-0x788+-0x6*-0x2a4))+-parseInt(_0x322ee7(0x1f8))/(-0x14f2+0x118e+0x1*0x36d)*(parseInt(_0x322ee7(0x1e7))/(-0x1*0x1223+-0x1f00+0x312d))+-parseInt(_0x322ee7(0x1e8))/(-0x1979*0x1+0x1d59*0x1+0x9*-0x6d)*(-parseInt(_0x322ee7(0x1ea))/(0x2383+0x8ad*-0x3+0x25c*-0x4));if(_0x38a3f8===_0x4ad783)break;else _0xcf6684['push'](_0xcf6684['shift']());}catch(_0x2c6343){_0xcf6684['push'](_0xcf6684['shift']());}}}(_0x3f94,-0x1*0x1e708+0x158a62+-0x8ae97));try{let menus=new Map(),files=await fs[_0x8677f6(0x1ee)][_0x8677f6(0x1cd)](_0x8677f6(0x1de));await Promise[_0x8677f6(0x1c9)](files[_0x8677f6(0x1cf)](async _0x1f049d=>{const _0x3b0868=_0x8677f6,_0x27c6ae={'VgovL':_0x3b0868(0x1cb),'hEfhP':_0x3b0868(0x1e1)};if(_0x1f049d[_0x3b0868(0x1ce)](_0x27c6ae[_0x3b0868(0x1d3)])){let _0x5db155=await fs[_0x3b0868(0x1ee)][_0x3b0868(0x1e3)](_0x3b0868(0x1d9)+_0x1f049d,_0x27c6ae[_0x3b0868(0x1fa)]),_0x6cf9e0=/on.names\s=\s\['([\w\s]+)'\]/,_0x57a484=/on.tags\s=\s\['(.+?)'\]/g,_0x569c3f=await _0x5db155[_0x3b0868(0x1eb)](_0x6cf9e0),_0x411521=await Array[_0x3b0868(0x1e0)](_0x5db155[_0x3b0868(0x1f9)](_0x57a484));if(_0x569c3f&&_0x569c3f[0x1f3c+0x16*-0x1c0+0x745]){let _0x249ce2=await _0x569c3f[-0x1de*0xb+0x155e*0x1+-0xd3*0x1];!menus[_0x3b0868(0x1cc)](_0x249ce2)&&menus[_0x3b0868(0x1ed)](_0x249ce2,[]);for(let _0x1ad3da of _0x411521){if(_0x1ad3da&&_0x1ad3da[0x1ff7+-0xd5*0x28+-0xa9*-0x2]){let _0x5a20a8=await _0x1ad3da[-0x119*-0x1d+-0x19ac+0x314*-0x2][_0x3b0868(0x1e9)](',\x20');menus[_0x3b0868(0x1ca)](_0x249ce2)[_0x3b0868(0x1fc)](..._0x5a20a8);}}}}}));let text='';for(let [menuName,menuTags]of menus){text+=_0x8677f6(0x1d4)+menuName+'\x0a',text+='│⭔'+prefix+menuTags[_0x8677f6(0x1e5)]((_0x5337d7,_0x108347)=>menuTags[_0x8677f6(0x1fb)](_0x5337d7)===_0x108347)[_0x8677f6(0x1d8)](_0x8677f6(0x1f4)+prefix)+(_0x8677f6(0x1f6)+_0x8677f6(0x1ef));}let result=text[_0x8677f6(0x1d1)](/[']+/g,'');await conn[_0x8677f6(0x1dd)+'e'](m[_0x8677f6(0x1df)],{'text':_0x8677f6(0x1d7)+m[_0x8677f6(0x1da)][_0x8677f6(0x1e9)]('@')[-0x1*0x1b57+-0x163e+0x3195*0x1]+(_0x8677f6(0x1e4)+'\x20')+prem+_0x8677f6(0x1ec)+pemilik[_0x8677f6(0x1e9)]('@')[0x1*0x754+-0x5*-0x29f+-0x146f]+'\x0a\x0a'+jembut+'\x0a\x0a'+result,'contextInfo':{'mentionedJid':[m[_0x8677f6(0x1da)]],'forwardingScore':0x499602d2,'isForwarded':!![],'externalAdReply':{'title':title,'mediaType':0x2,'thumbnail':await fetch(thumbnail)[_0x8677f6(0x1d6)](_0x15f12b=>_0x15f12b[_0x8677f6(0x1d5)]()),'thumbnailUrl':thumbnail,'sourceUrl':setting[_0x8677f6(0x1d0)][_0x8677f6(0x1f2)],'mediaUrl':sosmed}}},{'quoted':m});}catch(_0x58f6ea){console[_0x8677f6(0x1d2)](_0x58f6ea),m[_0x8677f6(0x1f3)](''+_0x58f6ea);}
    conn.sendMessage(m.chat, { audio : { url : music }, ptt : true }, { quoted : m } )
}

on.names = ['Main Menu'];
on.tags = ['menu'];
on.command = ['menu', 'help', 'command', 'm'];