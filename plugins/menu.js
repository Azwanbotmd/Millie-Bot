const handler = require('../handler');
module.exports = async (conn, msg, setting) => {
const { from, command, n2, fs, fetch, sender, cekUser, prefix, reply } = handler(msg, conn, setting);
const name = ["MAIN MENU"]
const tag = ["menu"]
const help = ["menu", "help", "command", "m"]
  
  const thumbnail = 'https://telegra.ph/file/092f1faaeb6100a95a683.jpg' //gambar kamu  
  const prem = `${cekUser("premium", sender)? 'Aktif':'Tidak'}` //fitur premium blm di jadikan lagi soalnya apa yang mau di premiumin fitur msh dikit jadi abaikan ajh  
  const pemilik = '62xxxx@s.whatsapp.net' //wa kamu  
  const link = 'http://instagram.com/ru_hend_'  //sosmed kamu  
  const jembut = '꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦' // hiasan atas  
  const title = `Millie Bot MD © Ruhend` //judul bot  
  const linkgc = 'https://chat.whatsapp.com/LuHHeKGLnnjIqEN7FbpFVk' //linkgc mu jika punya kalo ga punya kosongin juga bisa jadi const linkgc = ''
     
  if (help.includes(command)) {      
  const _0x293c11=_0x3c6c;(function(_0x17f66e,_0x4ab577){const _0x34cf63=_0x3c6c,_0x5bab44=_0x17f66e();while(!![]){try{const _0x3b7266=parseInt(_0x34cf63(0x13f))/0x1*(-parseInt(_0x34cf63(0x12d))/0x2)+parseInt(_0x34cf63(0x132))/0x3*(-parseInt(_0x34cf63(0x12f))/0x4)+parseInt(_0x34cf63(0x12a))/0x5*(-parseInt(_0x34cf63(0x129))/0x6)+-parseInt(_0x34cf63(0x13e))/0x7+-parseInt(_0x34cf63(0x144))/0x8*(-parseInt(_0x34cf63(0x143))/0x9)+-parseInt(_0x34cf63(0x148))/0xa+parseInt(_0x34cf63(0x145))/0xb;if(_0x3b7266===_0x4ab577)break;else _0x5bab44['push'](_0x5bab44['shift']());}catch(_0x37e55){_0x5bab44['push'](_0x5bab44['shift']());}}}(_0x29b5,0x1f515));let menus=new Map();function _0x29b5(){const _0x2f37d1=['get','from','┌──⭓','readdirSync','./plugins/','User\x20@','endsWith','\x22,\x20\x22','forEach','\x20\x0aPremium:\x20','1633429FMRJJt','2RbjmQS','\x0a└────────────⭓\x0a\x0a','.js','split','313731iYyQvh','56ocvnFg','7256359hIFVMu','has','join','1653300SNCtsr','522pubkof','7705ZeBSYr','readFileSync','utf-8','110798BOXKGM','./plugins','116ExTKON','indexOf','match','13641IObXzh','sendMessage'];_0x29b5=function(){return _0x2f37d1;};return _0x29b5();}fs[_0x293c11(0x137)](_0x293c11(0x12e))[_0x293c11(0x13c)](_0x118eed=>{const _0x1743e8=_0x293c11;if(_0x118eed[_0x1743e8(0x13a)](_0x1743e8(0x141))){const _0x2d4815=fs[_0x1743e8(0x12b)](_0x1743e8(0x138)+_0x118eed,_0x1743e8(0x12c)),_0x335e15=/const\sname\s=\s\["([\w\s]+)"\]/,_0x31235a=/const\stag\s=\s\["(.+?)"\]/g,_0x5c66bd=_0x2d4815[_0x1743e8(0x131)](_0x335e15),_0xacffcf=Array[_0x1743e8(0x135)](_0x2d4815['matchAll'](_0x31235a));if(_0x5c66bd&&_0x5c66bd[0x1]){const _0x308924=_0x5c66bd[0x1];!menus[_0x1743e8(0x146)](_0x308924)&&menus['set'](_0x308924,[]);for(const _0x1e598b of _0xacffcf){if(_0x1e598b&&_0x1e598b[0x1]){const _0x4cf3a7=_0x1e598b[0x1][_0x1743e8(0x142)](_0x1743e8(0x13b));menus[_0x1743e8(0x134)](_0x308924)['push'](..._0x4cf3a7);}}}}});let text='';function _0x3c6c(_0x4207be,_0x56d9e3){const _0x29b5d5=_0x29b5();return _0x3c6c=function(_0x3c6cba,_0x3cd7d9){_0x3c6cba=_0x3c6cba-0x129;let _0x511253=_0x29b5d5[_0x3c6cba];return _0x511253;},_0x3c6c(_0x4207be,_0x56d9e3);}for(const [menuName,menuTags]of menus){text+=_0x293c11(0x136)+menuName+'\x0a',text+='│⭔'+prefix+menuTags['filter']((_0x26d53c,_0x2065d4)=>menuTags[_0x293c11(0x130)](_0x26d53c)===_0x2065d4)[_0x293c11(0x147)]('\x0a│⭔'+prefix)+_0x293c11(0x140);}conn[_0x293c11(0x133)](from,{'text':_0x293c11(0x139)+sender[_0x293c11(0x142)]('@')[0x0]+_0x293c11(0x13d)+prem+'\x0aOwner:\x20+'+pemilik[_0x293c11(0x142)]('@')[0x0]+'\x0a\x0a'+jembut+'\x0a\x0a'+text,'contextInfo':{'mentionedJid':[sender],'forwardingScore':0x499602d2,'isForwarded':!![],'externalAdReply':{'title':title,'mediaType':0x2,'thumbnail':await await fetch(thumbnail),'thumbnailUrl':thumbnail,'sourceUrl':linkgc,'mediaUrl':link}}},{'quoted':msg});  
  }
}
