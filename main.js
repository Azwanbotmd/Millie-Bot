process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.on('uncaughtException', console.error)
const { 
  default: 
  makeWASocket, 
  DisconnectReason,
  useMultiFileAuthState,  
  downloadContentFromMessage, 
  jidDecode,
  makeInMemoryStore,
  generateForwardMessageContent, 
  generateWAMessageFromContent 
} = require('@adiwajshing/baileys')
const fs = require("fs");
const path = require('path');
const chalk = require('chalk')
const logg = require('pino')
require('./function/ObjectPath.js');
require('./function/FuncTerm.js');
//require('./function/FuncListen.js');

const { serialize, 
  fetchJson, 
  getBuffer 
 } = require("./function/func_Server");
const { nocache, 
  uncache 
 } = require('./function/Chache_Data.js');
 
const { auto_BlockCaller } = require('./function/Data_Server_Bot/Call_AutoBlock.js')
let setting = JSON.parse(fs.readFileSync('./config.json'));
/**
di config.json ada ram itu kalian isi dengan ram yang kalian gunakan
misalnya kalian ngerun di ram 1GB isi 900 , 2GB isi 1900 , kalo ngerun di ram yang kecil misalnya 512MB ya kasih ajh 480 atau 500 begitu
ngerti ya sesuai selera yang penting ada ruang kosong
biar ada space jadi ga gampang overload kalo di spam user
**/
function _0x3e73(_0x4adf05,_0x59d171){const _0x283c64=_0x12d3();return _0x3e73=function(_0x372333,_0x144974){_0x372333=_0x372333-(0x1da+-0x3bf*-0x1+-0x1f*0x27);let _0x2a113e=_0x283c64[_0x372333];return _0x2a113e;},_0x3e73(_0x4adf05,_0x59d171);}function _0x12d3(){const _0x15462c=['7TqUcRJ','NG...\x0a\x0a\x0a','78MLYGem','send','1899742RObCwy','466303wapcBB','182370MotLfJ','\x20MB','RSS:\x20','exCXP','2390plBCGJ','REBOOT\x20ULA','reset','toFixed','6VWrqJF','pLgWi','RDOSIS\x0a\x0aME','memoryUsag','ram','10241253KkBuuL','yIzLP','1552072AvwdGo','sjGmf','log','82951nZIhej','qqUXZ','rss','\x0a\x0a\x0aRAM\x20OVE','1017884odCaZS'];_0x12d3=function(){return _0x15462c;};return _0x12d3();}(function(_0x2bfd45,_0x443c40){const _0x199667=_0x3e73,_0x4ef7dc=_0x2bfd45();while(!![]){try{const _0x2970a8=parseInt(_0x199667(0xe0))/(0x26c8+-0x1ba2+-0xb25)+parseInt(_0x199667(0xfc))/(0x17*-0x2d+0x1487+-0x107a)+parseInt(_0x199667(0xe9))/(0xac3+-0x4e2*0x4+0x8c8*0x1)*(parseInt(_0x199667(0xf7))/(0x10d*0x1+0x232b+-0x2434))+parseInt(_0x199667(0xe1))/(0x1*0x19d9+0x2*0x3fe+-0x21d0)*(-parseInt(_0x199667(0xfa))/(0xfa*0x4+0x1672+-0x1a54))+parseInt(_0x199667(0xf8))/(0x2705+0xca1*-0x3+-0x1*0x11b)*(-parseInt(_0x199667(0xf0))/(0x163f+0x2*-0x349+0x10b*-0xf))+parseInt(_0x199667(0xee))/(-0x1839+-0x1731+0xfd1*0x3)+-parseInt(_0x199667(0xe5))/(-0x2cc*0x5+-0x1*0x1733+-0x1*-0x2539)*(parseInt(_0x199667(0xf3))/(0x1*0xd03+0x1c9e+-0x14cb*0x2));if(_0x2970a8===_0x443c40)break;else _0x4ef7dc['push'](_0x4ef7dc['shift']());}catch(_0x333a45){_0x4ef7dc['push'](_0x4ef7dc['shift']());}}}(_0x12d3,-0x28c8d+0x8a37a+0x2f3c6*0x1));const checkRamUsage=()=>{const _0x296205=_0x3e73,_0x496e99={'qqUXZ':function(_0x2f41cb,_0x57c743){return _0x2f41cb/_0x57c743;},'yIzLP':function(_0x54e7d5,_0x2b244f){return _0x54e7d5*_0x2b244f;},'exCXP':function(_0x303013,_0x5f20c1){return _0x303013>=_0x5f20c1;},'pLgWi':_0x296205(0xf6)+_0x296205(0xeb)+_0x296205(0xe6)+_0x296205(0xf9),'sjGmf':_0x296205(0xe7)},_0x85c2f6=_0x496e99[_0x296205(0xf4)](process[_0x296205(0xec)+'e']()[_0x296205(0xf5)],_0x496e99[_0x296205(0xef)](-0x9b3+0x3e*0x8e+0x14b1*-0x1,0x1ba2+0x17*-0x15d+0x7b9));console[_0x296205(0xf2)](_0x296205(0xe3)+_0x85c2f6[_0x296205(0xe8)](0x2428+-0x81*0x43+0x1*-0x263)+_0x296205(0xe2)),_0x496e99[_0x296205(0xe4)](_0x85c2f6,setting[_0x296205(0xed)])&&(console[_0x296205(0xf2)](_0x496e99[_0x296205(0xea)]),process[_0x296205(0xfb)](_0x496e99[_0x296205(0xf1)]));};checkRamUsage();

const fetch = require('node-fetch')
const { imageToWebp, 
  videoToWebp, 
  writeExifImg, 
  writeExifVid 
 } = require('./function/Exif_Write')
const { updateGroup } = require("./function/update_Group")
const store = require('./function/store')
const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

function _0x4a15(_0xbe63ff,_0x129e10){var _0x42def6=_0x42de();return _0x4a15=function(_0x4a154c,_0x2d2cba){_0x4a154c=_0x4a154c-0x16d;var _0x280ed6=_0x42def6[_0x4a154c];return _0x280ed6;},_0x4a15(_0xbe63ff,_0x129e10);}(function(_0x4c0aaf,_0x4ef099){var _0x163de8=_0x4a15,_0x3ce396=_0x4c0aaf();while(!![]){try{var _0x366c76=-parseInt(_0x163de8(0x179))/0x1+-parseInt(_0x163de8(0x16e))/0x2*(-parseInt(_0x163de8(0x178))/0x3)+parseInt(_0x163de8(0x172))/0x4*(-parseInt(_0x163de8(0x16f))/0x5)+parseInt(_0x163de8(0x17c))/0x6+parseInt(_0x163de8(0x17a))/0x7*(parseInt(_0x163de8(0x170))/0x8)+parseInt(_0x163de8(0x171))/0x9+parseInt(_0x163de8(0x17b))/0xa;if(_0x366c76===_0x4ef099)break;else _0x3ce396['push'](_0x3ce396['shift']());}catch(_0x393822){_0x3ce396['push'](_0x3ce396['shift']());}}}(_0x42de,0xa4f62),setTimeout(()=>{var _0x35aec3=_0x4a15;console[_0x35aec3(0x176)](color('\x0a▒█▀▄▀█\x20▀█▀\x20▒█░░░\x20▒█░░░\x20▀█▀\x20▒█▀▀▀\x20\x0a▒█▒█▒█\x20▒█░\x20▒█░░░\x20▒█░░░\x20▒█░\x20▒█▀▀▀\x20\x0a▒█░░▒█\x20▄█▄\x20▒█▄▄█\x20▒█▄▄█\x20▄█▄\x20▒█▄▄▄\x20\x0a\x0a▒█▀▀█\x20▒█▀▀▀█\x20▀▀█▀▀\x20\u3000\x20▒█▀▄▀█\x20▒█▀▀▄\x20\x0a▒█▀▀▄\x20▒█░░▒█\x20░▒█░░\x20\u3000\x20▒█▒█▒█\x20▒█░▒█\x20\x0a▒█▄▄█\x20▒█▄▄▄█\x20░▒█░░\x20\u3000\x20▒█░░▒█\x20▒█▄▄▀\x0a\x0a',_0x35aec3(0x175))),console['log'](color(_0x35aec3(0x173),'cyan'),color(_0x35aec3(0x174),_0x35aec3(0x175))),console[_0x35aec3(0x176)](color(_0x35aec3(0x17d),_0x35aec3(0x177)),color(_0x35aec3(0x16d),'yellow'));},0x2710));function _0x42de(){var _0x1bcddd=['pink','log','yellow','3NRVURu','537710gxmyXE','56NqIHkU','6237830IsyNhj','2769732GPOspK','\x0aMillie\x20BOT\x20MD\x20Versi\x202\x0a','\x0aTHANKS\x20TO:\x20\x0a•\x20Allah\x0a•\x20Ruhend\x0a•\x20Lainnya\x0a','1783174HQVtXk','87535bTguKH','2928KWKuRb','4288221tbKgqg','284vMSGxc','Millie\x20Bot\x20MD\x20','Author\x20Ruli\x20Henderson'];_0x42de=function(){return _0x1bcddd;};return _0x42de();}

const connectToWhatsApp = async () => { try {
let { state, saveCreds } = await useMultiFileAuthState('./sessions')
const conn = makeWASocket({
printQRInTerminal: true,
logger: logg({ level: 'silent' }),
browser: ['Millie Bot','Opera','5.0.0'],
auth: state,
getMessage: async (key) => {
         if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg.message || undefined
         }
         return {
            conversation: ''
     }
},
patchMessageBeforeSending: (message) => {
         const requiresPatch = !!(
            message.buttonsMessage ||
            message.templateMessage ||
            message.listMessage
         );
         if (requiresPatch) {
            message = {
               viewOnceMessage: {
                  message: {
                     messageContextInfo: {
                        deviceListMetadataVersion: 2,
                        deviceListMetadata: {},
                     },
                     ...message,
                  },
               },
            }
         }
         return message
      }   
   }
)
        
store.bind(conn.ev)

conn.ev.on('messages.upsert', async m => { 
try {
  var msg = m.messages[0]  
  var chat = msg.key.remoteJid
  var from = msg.key.remoteJid
  var sender = msg.isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid;
  var reply = (teks) => { conn.sendMessage(from, { text: teks }, { quoted: msg }) }
  function _0x1bad(){var _0x5d8571=['2539473pWKqsD','578736saHrnc','QvRkq','split','1566014YVfSNQ','valid','mp4','189menroC','YMKhC','webp','jpeg','png','ile\x20tidak\x20','2978388EcgZvk','11832SqbolW','eTrHt','OzvGo','Ekstensi\x20f','opus','pop','MCrjw','6hgjMPY','nbnZB','ogg','3gp','kPysw','Xjrak','719480zzUwkI','Taqcb','jpg','1uDphxo','NkzFs','hqixP','Zaqkc','220XfkbQu','514400CnqWnv','mp3','toLowerCas','sendMessag','oiJKi','ptt','YxCGI','nktpu','log'];_0x1bad=function(){return _0x5d8571;};return _0x1bad();}function _0x9af5(_0x4053a1,_0x1ae91a){var _0x31d03d=_0x1bad();return _0x9af5=function(_0x397a52,_0x118fb1){_0x397a52=_0x397a52-(-0x1bf8+-0x22a4+-0x1*-0x3fa6);var _0xf61bf5=_0x31d03d[_0x397a52];return _0xf61bf5;},_0x9af5(_0x4053a1,_0x1ae91a);}(function(_0x5e6b06,_0x1892ec){var _0x46577e=_0x9af5,_0x3673b4=_0x5e6b06();while(!![]){try{var _0x509f06=-parseInt(_0x46577e(0x115))/(-0x4a5*-0x3+0x670+-0x145e)*(-parseInt(_0x46577e(0x127))/(-0x92b*0x1+0x1595*0x1+-0x634*0x2))+-parseInt(_0x46577e(0x123))/(0x1556+0x11b8+-0x270b)+-parseInt(_0x46577e(0x124))/(0x1917+-0x1a3*-0xd+0x2*-0x172d)+-parseInt(_0x46577e(0x112))/(0x6d0+-0x1a6a+0x139f)*(-parseInt(_0x46577e(0x10c))/(-0x291*0x7+-0x21ae+-0x33ab*-0x1))+parseInt(_0x46577e(0x12a))/(-0x1d2+-0xb1e+0xcf7)*(-parseInt(_0x46577e(0x131))/(-0x4f*0x3b+-0x1d8f+0x2fcc))+-parseInt(_0x46577e(0x130))/(0xf09*0x1+0x650+-0x1550)+-parseInt(_0x46577e(0x11a))/(0x4b6+0x1628+-0x22*0xca)*(-parseInt(_0x46577e(0x119))/(-0x14da+0x18c2*0x1+-0x3dd*0x1));if(_0x509f06===_0x1892ec)break;else _0x3673b4['push'](_0x3673b4['shift']());}catch(_0x1ce020){_0x3673b4['push'](_0x3673b4['shift']());}}}(_0x1bad,0x5f147*-0x3+-0xbd0cc+-0x367*-0xb60));var sendMedia=(_0x18fba0,_0x320c31)=>{var _0x585c2d=_0x9af5,_0x3da2c8={'oiJKi':function(_0x223585,_0x2c4b3b){return _0x223585===_0x2c4b3b;},'hqixP':_0x585c2d(0x129),'YMKhC':_0x585c2d(0x10f),'eTrHt':function(_0x4aa49c,_0x1dbf5f){return _0x4aa49c===_0x1dbf5f;},'Taqcb':_0x585c2d(0x114),'nbnZB':_0x585c2d(0x12d),'MCrjw':_0x585c2d(0x12e),'YxCGI':function(_0x2362d2,_0x4feb3e){return _0x2362d2===_0x4feb3e;},'QvRkq':_0x585c2d(0x12c),'OzvGo':_0x585c2d(0x11b),'kPysw':function(_0x1e9e75,_0x281b47){return _0x1e9e75===_0x281b47;},'NkzFs':_0x585c2d(0x135),'Xjrak':_0x585c2d(0x11f),'Zaqkc':_0x585c2d(0x10e),'nktpu':_0x585c2d(0x134)+_0x585c2d(0x12f)+_0x585c2d(0x128)};const _0x36984a=_0x18fba0[_0x585c2d(0x126)]('.')[_0x585c2d(0x10a)]()[_0x585c2d(0x11c)+'e']();if(_0x3da2c8[_0x585c2d(0x11e)](_0x36984a,_0x3da2c8[_0x585c2d(0x117)])||_0x3da2c8[_0x585c2d(0x11e)](_0x36984a,_0x3da2c8[_0x585c2d(0x12b)]))conn[_0x585c2d(0x11d)+'e'](from,{'video':{'url':_0x18fba0},'caption':_0x320c31},{'quoted':msg});else{if(_0x3da2c8[_0x585c2d(0x132)](_0x36984a,_0x3da2c8[_0x585c2d(0x113)])||_0x3da2c8[_0x585c2d(0x11e)](_0x36984a,_0x3da2c8[_0x585c2d(0x10d)])||_0x3da2c8[_0x585c2d(0x11e)](_0x36984a,_0x3da2c8[_0x585c2d(0x10b)])||_0x3da2c8[_0x585c2d(0x120)](_0x36984a,_0x3da2c8[_0x585c2d(0x125)]))conn[_0x585c2d(0x11d)+'e'](from,{'image':{'url':_0x18fba0},'caption':_0x320c31},{'quoted':msg});else{if(_0x3da2c8[_0x585c2d(0x120)](_0x36984a,_0x3da2c8[_0x585c2d(0x133)])||_0x3da2c8[_0x585c2d(0x110)](_0x36984a,_0x3da2c8[_0x585c2d(0x116)])||_0x3da2c8[_0x585c2d(0x110)](_0x36984a,_0x3da2c8[_0x585c2d(0x111)])||_0x3da2c8[_0x585c2d(0x132)](_0x36984a,_0x3da2c8[_0x585c2d(0x118)]))conn[_0x585c2d(0x11d)+'e'](from,{'audio':{'url':_0x18fba0},'caption':_0x320c31},{'quoted':msg});else{console[_0x585c2d(0x122)](_0x3da2c8[_0x585c2d(0x121)]);return;}}}};
  if (!m.messages) return;
  if (msg.key && msg.key.remoteJid == 'status@broadcast') return (msg = serialize(conn, msg))   
  msg = serialize(conn, msg, chat, from, sender, reply, sendMedia)
  require('./handler')(conn, msg, setting, store)
} catch (error) {
    console.error(error);
  }
})

//
conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })
conn.ws.on('CB:call', async (json) => {
auto_BlockCaller(json)
})
//state
const _0x5c3ff8=_0x5c00;(function(_0x2f95ba,_0x1d9a46){const _0x3ad640=_0x5c00,_0x418288=_0x2f95ba();while(!![]){try{const _0x514dcf=parseInt(_0x3ad640(0x167))/(-0xce9*-0x2+-0x291*0xf+0x43a*0x3)+-parseInt(_0x3ad640(0x175))/(0xa7*0x5+0xe1*0xc+-0xdcd)*(parseInt(_0x3ad640(0x177))/(-0x2644+0x10d*0x13+0x24a*0x8))+parseInt(_0x3ad640(0x164))/(0x1*0x132d+0x1*-0x12e0+-0x49)+-parseInt(_0x3ad640(0x168))/(0x2ab*0x1+0x43f+-0x6e5)*(parseInt(_0x3ad640(0x165))/(0xbbf+-0x18e9*-0x1+0x1*-0x24a2))+-parseInt(_0x3ad640(0x17e))/(-0xa3b+0x2*0x336+-0x1eb*-0x2)*(parseInt(_0x3ad640(0x16e))/(0x1434+0x2472+0x1*-0x389e))+parseInt(_0x3ad640(0x16a))/(-0x219e+0xccd+0x14da)*(-parseInt(_0x3ad640(0x17c))/(-0xa13+0x1089+-0x112*0x6))+parseInt(_0x3ad640(0x17a))/(-0x4*-0x616+-0x1967+0x11a)*(parseInt(_0x3ad640(0x173))/(-0x2391+-0x243b+0x47d8));if(_0x514dcf===_0x1d9a46)break;else _0x418288['push'](_0x418288['shift']());}catch(_0x58567e){_0x418288['push'](_0x418288['shift']());}}}(_0x25f2,-0x33d31*0x1+-0x1*0x5e4e+0xebacc),conn['ev']['on'](_0x5c3ff8(0x17d)+_0x5c3ff8(0x171),async _0x45f79f=>{const _0x40c6fb=_0x5c3ff8,_0x4f81a4={'PMdXq':function(_0x37d51e,_0x3aab79){return _0x37d51e===_0x3aab79;},'YMbfi':_0x40c6fb(0x170),'iPXKv':function(_0x129745,_0xd10088){return _0x129745!==_0xd10088;},'LUPbR':function(_0x455808){return _0x455808();},'SelVl':_0x40c6fb(0x17f)+_0x40c6fb(0x169),'pRgjo':_0x40c6fb(0x174)},{connection:_0x29e2eb,lastDisconnect:_0x2bcff6}=_0x45f79f;_0x4f81a4[_0x40c6fb(0x16c)](_0x29e2eb,_0x4f81a4[_0x40c6fb(0x16b)])&&(_0x4f81a4[_0x40c6fb(0x176)](_0x2bcff6[_0x40c6fb(0x178)]?.[_0x40c6fb(0x16f)]?.[_0x40c6fb(0x181)],DisconnectReason[_0x40c6fb(0x180)])?_0x4f81a4[_0x40c6fb(0x16d)](connectToWhatsApp):console[_0x40c6fb(0x172)](_0x4f81a4[_0x40c6fb(0x166)])),console[_0x40c6fb(0x172)](_0x4f81a4[_0x40c6fb(0x17b)]);}),conn['ev']['on'](_0x5c3ff8(0x179)+'te',saveCreds));function _0x5c00(_0x362b15,_0x2fba57){const _0x19eb0f=_0x25f2();return _0x5c00=function(_0x1d987a,_0x1a7011){_0x1d987a=_0x1d987a-(-0x1164+0x2d*-0x50+0x20d8);let _0x557f4e=_0x19eb0f[_0x1d987a];return _0x557f4e;},_0x5c00(_0x362b15,_0x2fba57);}function _0x25f2(){const _0x3b71ce=['4547870iwRJCW','rputus...','6161985zfTeIS','YMbfi','PMdXq','LUPbR','441528AnWgzO','output','close','.update','log','46941828BautOX','Online\x20🟢','1728094huzUPj','iPXKv','3yrqTAV','error','creds.upda','11jVzsTo','pRgjo','20ZHwAbc','connection','70UkOugN','Koneksi\x20Te','loggedOut','statusCode','456788olmXKa','6ldqhrs','SelVl','397754TxaLCs'];_0x25f2=function(){return _0x3b71ce;};return _0x25f2();}
//gc
function _0xeb23(_0xd73565,_0xdfb83b){const _0x2cf52c=_0x2d73();return _0xeb23=function(_0x4e92ea,_0x4b5d5b){_0x4e92ea=_0x4e92ea-(-0x1207+-0x1841+0x1*0x2b43);let _0x4b23aa=_0x2cf52c[_0x4e92ea];return _0x4b23aa;},_0xeb23(_0xd73565,_0xdfb83b);}function _0x2d73(){const _0x1b7d0c=['KtdPt','ata','split','PDF','buffer','42292lNlozf','tang\x20@','groupMetad','145160ugsGjG','\x20di\x20Grup\x20','catch','icipants.u','115rtIueE','existsSync','sendMessag','154520txdBPM','Selamat\x20Da','11648112EIJUSE','join','372ljgHCH','action','IuhwL','profilePic','pdate','Bye\x20Beban\x20','XxxdE','link','readFileSy','klueh','Bye','VnUaF','find','thumbnail','welcome','remove','group-part','HQhFo','QLdms','participan','11zYoCmM','bZqUt','Group\x0a@','FwOtU','/group','.json','!text_grup','2189072CoODHT','group','image','reply','add','./database','subject','uar\x20Dari\x20','2100gRLnnE','\x0aTelah\x20Kel','FzhFZ','YVYTD','tureUrl','log','EQWsL','78855MpVTOj','2064vaCmva','parse','footer','27smnmaq','Welcome'];_0x2d73=function(){return _0x1b7d0c;};return _0x2d73();}const _0x27b97d=_0xeb23;(function(_0x46c7ff,_0xf329bc){const _0x568028=_0xeb23,_0x1f91d9=_0x46c7ff();while(!![]){try{const _0x13badc=-parseInt(_0x568028(0x139))/(-0x21d8+-0x191*-0x10+0x8c9)+parseInt(_0x568028(0x124))/(0x721*0x3+0x1866+-0x2dc7)*(parseInt(_0x568028(0x12c))/(-0x1f1c+0x1da+0x1*0x1d45))+parseInt(_0x568028(0x136))/(0x472+-0x53b+0xcd)*(-parseInt(_0x568028(0x13d))/(-0x9*0x5c+0x1704+0x13c3*-0x1))+-parseInt(_0x568028(0x101))/(-0x4b2+-0xeb8+0x1370)*(-parseInt(_0x568028(0x12b))/(0x1f46+0x14*-0xef+-0xc93))+parseInt(_0x568028(0x11c))/(0x423*-0x9+-0x1d*0x131+0x47d0)+parseInt(_0x568028(0x12f))/(-0x79e+0x609+0x19e)*(parseInt(_0x568028(0xfd))/(0x1390+-0x5e*0x1+-0x1328))+parseInt(_0x568028(0x115))/(0xf36+0x2495*-0x1+-0xab5*-0x2)*(-parseInt(_0x568028(0xff))/(-0x20d4+0x185*0x12+0x586));if(_0x13badc===_0xf329bc)break;else _0x1f91d9['push'](_0x1f91d9['shift']());}catch(_0x2091da){_0x1f91d9['push'](_0x1f91d9['shift']());}}}(_0x2d73,0xea7*0x11+-0x60c3c+0xae692),conn['ev']['on'](_0x27b97d(0x111)+_0x27b97d(0x13c)+_0x27b97d(0x105),async _0x57dc51=>{const _0x25bab8=_0x27b97d,_0x4f0e90={'EQWsL':_0x25bab8(0x121)+_0x25bab8(0x119),'KtdPt':function(_0x16c151){return _0x16c151();},'XxxdE':_0x25bab8(0x11e),'HQhFo':function(_0x268271,_0x140402){return _0x268271==_0x140402;},'FzhFZ':_0x25bab8(0x110),'IuhwL':_0x25bab8(0x11b),'FwOtU':_0x25bab8(0x10b),'VnUaF':_0x25bab8(0x134),'QLdms':function(_0x283b5e,_0x40056e){return _0x283b5e(_0x40056e);},'klueh':_0x25bab8(0x120),'YVYTD':_0x25bab8(0x130),'bZqUt':function(_0x263956,_0x424060){return _0x263956(_0x424060);}},_0x243502=_0x4f0e90[_0x25bab8(0x12a)],_0x19a5aa=path[_0x25bab8(0x100)](_0x243502,_0x57dc51['id']+_0x25bab8(0x11a));function _0x14edd7(){const _0x9a55c3=_0x25bab8;return fs[_0x9a55c3(0xfb)](_0x19a5aa)?JSON[_0x9a55c3(0x12d)](fs[_0x9a55c3(0x109)+'nc'](_0x19a5aa)):null;}const _0x328a1c=_0x4f0e90[_0x25bab8(0x131)](_0x14edd7),_0x472776=_0x328a1c[_0x25bab8(0x10d)](_0x259fbe=>_0x259fbe['id']===_0x57dc51['id']);if(!_0x472776)return;if(!_0x472776[_0x25bab8(0x10f)])return;const _0x42d386=setting[_0x25bab8(0x10e)],_0x2f7a2e=setting[_0x25bab8(0x12e)],_0x492fba=setting[_0x25bab8(0x11d)][_0x25bab8(0x108)];try{const _0x329930=await conn[_0x25bab8(0x138)+_0x25bab8(0x132)](_0x57dc51['id']);let _0x2904fa;for(let _0xf88f80 of _0x57dc51[_0x25bab8(0x114)+'ts']){try{let _0x4c2aaa=await conn[_0x25bab8(0x138)+_0x25bab8(0x132)](_0x57dc51['id']),_0x261794=_0x57dc51[_0x25bab8(0x114)+'ts'];for(let _0x26cf1d of _0x261794){_0x2904fa=await conn[_0x25bab8(0x104)+_0x25bab8(0x128)](_0x26cf1d,_0x4f0e90[_0x25bab8(0x107)])[_0x25bab8(0x13b)](_0x23be4d=>_0x42d386);if(_0x4f0e90[_0x25bab8(0x112)](_0x57dc51[_0x25bab8(0x102)],_0x4f0e90[_0x25bab8(0x126)])){var _0xd4d2c7=[{'buttonId':_0x4f0e90[_0x25bab8(0x103)],'buttonText':{'displayText':_0x4f0e90[_0x25bab8(0x118)]},'type':0x1}];await conn[_0x25bab8(0xfc)+'e'](_0x57dc51['id'],{'text':_0x25bab8(0x106)+_0x25bab8(0x117)+_0x26cf1d[_0x25bab8(0x133)]('@')[0x2*0x85d+0x83c+-0x18f6]+(_0x25bab8(0x125)+_0x25bab8(0x123))+_0x4c2aaa[_0x25bab8(0x122)],'contextInfo':{'forwardingScore':0x499602d2,'isForwarded':!![],'mentionedJid':[_0x26cf1d],'externalAdReply':{'body':_0x492fba,'containsAutoReply':![],'mediaType':0x1,'mediaUrl':_0x492fba,'renderLargerThumbnail':!![],'showAdAttribution':!![],'sourceId':_0x492fba,'sourceType':_0x4f0e90[_0x25bab8(0x10c)],'previewType':_0x4f0e90[_0x25bab8(0x10c)],'sourceUrl':_0x492fba,'thumbnail':await(await _0x4f0e90[_0x25bab8(0x113)](fetch,_0x2904fa))[_0x25bab8(0x135)](),'thumbnailUrl':await(await _0x4f0e90[_0x25bab8(0x113)](fetch,_0x2904fa))[_0x25bab8(0x135)](),'title':_0x2f7a2e}}});}else{if(_0x4f0e90[_0x25bab8(0x112)](_0x57dc51[_0x25bab8(0x102)],_0x4f0e90[_0x25bab8(0x10a)])){var _0xd4d2c7=[{'buttonId':_0x4f0e90[_0x25bab8(0x103)],'buttonText':{'displayText':_0x4f0e90[_0x25bab8(0x127)]},'type':0x1}];await conn[_0x25bab8(0xfc)+'e'](_0x57dc51['id'],{'text':_0x25bab8(0xfe)+_0x25bab8(0x137)+_0x26cf1d[_0x25bab8(0x133)]('@')[-0x47*-0x67+0x1*-0x82e+-0x1463*0x1]+_0x25bab8(0x13a)+_0x4c2aaa[_0x25bab8(0x122)],'contextInfo':{'forwardingScore':0x499602d2,'isForwarded':!![],'mentionedJid':[_0x26cf1d],'externalAdReply':{'body':_0x492fba,'containsAutoReply':![],'mediaType':0x1,'mediaUrl':_0x492fba,'renderLargerThumbnail':!![],'showAdAttribution':!![],'sourceId':_0x492fba,'sourceType':_0x4f0e90[_0x25bab8(0x10c)],'previewType':_0x4f0e90[_0x25bab8(0x10c)],'sourceUrl':_0x492fba,'thumbnail':await(await _0x4f0e90[_0x25bab8(0x116)](fetch,_0x2904fa))[_0x25bab8(0x135)](),'thumbnailUrl':await(await _0x4f0e90[_0x25bab8(0x113)](fetch,_0x2904fa))[_0x25bab8(0x135)](),'title':_0x2f7a2e}}});}}}}catch(_0x15aac4){console[_0x25bab8(0x129)](_0x15aac4),msg[_0x25bab8(0x11f)](_0x15aac4);}}}catch(_0x574c4){console[_0x25bab8(0x129)](_0x574c4),msg[_0x25bab8(0x11f)](_0x574c4);}}));
//
conn.ev.on('group-update', async (anu) => {
updateGroup(conn, anu, MessageType)
})
conn.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await conn.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

conn.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

conn.downloadAndSaveMediaMessage = async(msg, type_file, path_file) => {
//const fileSize = fs.statSync(path_file).size / 1024 / 1024
//if (fileSize >= 110) return msg.reply(`File Lebih Dari 110 MB Donlod Sendiri  !`)
if (type_file === 'image') {
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'video') {
var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
let buffer = Buffer.from([])
for await(const chunk of stream) {
  buffer = Buffer.concat([buffer, chunk])
}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'sticker') {
var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'audio') {
var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
fs.writeFileSync(path_file, buffer)
return path_file
}
}
conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
.then( response => {

return response
})
}

conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
.then( response => {

return response
})
}
return conn
}
catch (error) {
    console.error(error);
  }
} 
connectToWhatsApp();