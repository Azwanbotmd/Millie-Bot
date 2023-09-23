process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.on('uncaughtException', console.error)
const { 
  default: 
  makeWASocket, 
  DisconnectReason,
  useMultiFileAuthState,  
  downloadContentFromMessage, 
  jidDecode,
  generateForwardMessageContent, 
  generateWAMessageFromContent 
} = require('@adiwajshing/baileys')
const fs = require("fs");
const path = require('path');
const FileType = require('file-type');
const chalk = require('chalk')
const logg = require('pino')
require('./function/ObjectPath.js');
require('./function/FuncTerm.js');
require('./function/FuncListen.js');

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
  if (!m.messages) return;
  if (msg.key && msg.key.remoteJid == 'status@broadcast') return (msg = serialize(conn, msg))   
  msg = serialize(conn, msg, chat, from, sender, reply)
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
//files
const _0x28b2c4=_0x2bc4;(function(_0x2fbef7,_0x409cba){const _0x3d0b67=_0x2bc4,_0x347f01=_0x2fbef7();while(!![]){try{const _0x3d6b45=parseInt(_0x3d0b67(0x1d3))/(-0x11*0x6b+-0x2321+0x1*0x2a3d)*(-parseInt(_0x3d0b67(0x1ff))/(-0x9c1+-0x922*0x2+0x1c07))+-parseInt(_0x3d0b67(0x1e2))/(-0x24bb+0xea0+0x2*0xb0f)*(-parseInt(_0x3d0b67(0x1cb))/(0xee5+0x7f*0xe+-0x15d3))+-parseInt(_0x3d0b67(0x1f7))/(-0x125e+-0x4*0x163+0x17ef*0x1)+parseInt(_0x3d0b67(0x1d8))/(0x78d+-0x45*-0x62+-0x21f1)+-parseInt(_0x3d0b67(0x1c6))/(-0x5f3*-0x1+-0x1d99+0x13*0x13f)+parseInt(_0x3d0b67(0x1f1))/(0x1*0xfde+-0xebc+-0x11a)+parseInt(_0x3d0b67(0x1f5))/(0x13d5+-0x1*-0x331+-0x16fd)*(parseInt(_0x3d0b67(0x1c4))/(-0x1771+0x22*-0x9+0x18ad));if(_0x3d6b45===_0x409cba)break;else _0x347f01['push'](_0x347f01['shift']());}catch(_0xf7da03){_0x347f01['push'](_0x347f01['shift']());}}}(_0xffc0,0x108201+0x15b*0xd3+0xba62*-0x6));const isUrl=_0x103deb=>{const _0x3e6bd5=_0x2bc4;return _0x103deb[_0x3e6bd5(0x1f3)](new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,'gi'));},getFile=async _0x3bc5e5=>{const _0x5b9c30=_0x2bc4,_0x35de1c={'pQRGK':function(_0x464fdd,_0xd9f198){return _0x464fdd(_0xd9f198);},'zaHHP':_0x5b9c30(0x1d6)+_0x5b9c30(0x1d7)+'er','MGbOl':_0x5b9c30(0x1dc)+_0x5b9c30(0x1d0)+_0x5b9c30(0x1c8),'nvGep':_0x5b9c30(0x1ca)};let _0x5de410=Buffer[_0x5b9c30(0x1db)](_0x3bc5e5)?_0x3bc5e5:_0x35de1c[_0x5b9c30(0x1d1)](isUrl,_0x3bc5e5)?await(await _0x35de1c[_0x5b9c30(0x1d1)](fetch,_0x3bc5e5))[_0x5b9c30(0x1fb)]():fs[_0x5b9c30(0x1fa)](_0x3bc5e5)?fs[_0x5b9c30(0x1e8)+'nc'](_0x3bc5e5):/^data:.*?\/.*?;base64,/i[_0x5b9c30(0x1e6)](_0x3bc5e5)?Buffer[_0x5b9c30(0x1cd)](_0x3bc5e5[_0x5b9c30(0x1c5)](',')[-0x6d5+-0xe21+-0x14f7*-0x1]):null;if(!_0x5de410)return new Error(_0x35de1c[_0x5b9c30(0x1e5)]);let _0x1a6e2d=await FileType[_0x5b9c30(0x1f9)](_0x5de410)||{'mime':_0x35de1c[_0x5b9c30(0x1e9)],'ext':_0x35de1c[_0x5b9c30(0x1d4)]};return{'data':_0x5de410,..._0x1a6e2d};};function _0xffc0(){const _0x50cdab=['ream','GQXwU','.bin','8khceEC','fBHRs','from','qUwzI','data','n/octet-st','pQRGK','dQpHR','12569ilqNQr','nvGep','xbCiW','Result\x20is\x20','not\x20a\x20buff','3470658gmIXob','mimetype','QJzlF','isBuffer','applicatio','czIPz','png','audio','webp','BmsSt','1982931KZnpxA','document','image','zaHHP','test','klHem','readFileSy','MGbOl','ulvRI','ext','sendMessag','mp4','sendFile','htxnq','mp3','10052504smcULf','jpeg','match','cKmac','92826aKXNhD','MKexD','2674205CUgbuD','YwlBH','fromBuffer','existsSync','buffer','utjrN','audio/mpeg','video','182IUyuCd','QJUFD','jpg','sticker','70JMCnSg','split','4772236ofXUWr','ptt'];_0xffc0=function(){return _0x50cdab;};return _0xffc0();}function _0x2bc4(_0x4ee55b,_0x3a0eed){const _0x3aa4b0=_0xffc0();return _0x2bc4=function(_0x5ad606,_0x573d92){_0x5ad606=_0x5ad606-(0x138b+-0xb4f+-0x229*0x3);let _0x440d5d=_0x3aa4b0[_0x5ad606];return _0x440d5d;},_0x2bc4(_0x4ee55b,_0x3a0eed);}conn[_0x28b2c4(0x1ee)]=async(_0x43a220,_0x4b13b8,_0x2f692f={})=>{const _0x4d301c=_0x28b2c4,_0x23a023={'BmsSt':function(_0x50396a,_0x4dd7fd){return _0x50396a(_0x4dd7fd);},'GQXwU':function(_0xabfe35,_0x1c6d76){return _0xabfe35==_0x1c6d76;},'ulvRI':_0x4d301c(0x1f0),'utjrN':_0x4d301c(0x1df),'dQpHR':_0x4d301c(0x1fd),'xbCiW':_0x4d301c(0x1c2),'klHem':_0x4d301c(0x1f2),'QJUFD':function(_0x227402,_0x3ef7b9){return _0x227402==_0x3ef7b9;},'YwlBH':_0x4d301c(0x1de),'qUwzI':_0x4d301c(0x1e4),'czIPz':function(_0x29af3b,_0x3bdea7){return _0x29af3b==_0x3bdea7;},'MKexD':_0x4d301c(0x1e0),'QJzlF':_0x4d301c(0x1c3),'fBHRs':_0x4d301c(0x1ed),'htxnq':_0x4d301c(0x1fe),'cKmac':_0x4d301c(0x1e3)};let _0x3438b6=await _0x23a023[_0x4d301c(0x1e1)](getFile,_0x4b13b8),_0x4ea207=_0x3438b6[_0x4d301c(0x1eb)],_0x3e62a8;if(_0x23a023[_0x4d301c(0x1c9)](_0x4ea207,_0x23a023[_0x4d301c(0x1ea)]))_0x3e62a8=_0x23a023[_0x4d301c(0x1fc)],_0x2f692f[_0x4d301c(0x1d9)]=_0x23a023[_0x4d301c(0x1d2)],_0x2f692f[_0x4d301c(0x1c7)]=_0x2f692f[_0x4d301c(0x1c7)]||![];else{if(_0x23a023[_0x4d301c(0x1c9)](_0x4ea207,_0x23a023[_0x4d301c(0x1d5)])||_0x23a023[_0x4d301c(0x1c9)](_0x4ea207,_0x23a023[_0x4d301c(0x1e7)])||_0x23a023[_0x4d301c(0x1c1)](_0x4ea207,_0x23a023[_0x4d301c(0x1f8)]))_0x3e62a8=_0x23a023[_0x4d301c(0x1ce)];else{if(_0x23a023[_0x4d301c(0x1dd)](_0x4ea207,_0x23a023[_0x4d301c(0x1f6)]))_0x3e62a8=_0x23a023[_0x4d301c(0x1da)];else{if(_0x23a023[_0x4d301c(0x1c1)](_0x4ea207,_0x23a023[_0x4d301c(0x1cc)]))_0x3e62a8=_0x23a023[_0x4d301c(0x1ef)];else _0x3e62a8=_0x23a023[_0x4d301c(0x1f4)];}}}return conn[_0x4d301c(0x1ec)+'e'](_0x43a220,{[_0x3e62a8]:_0x3438b6[_0x4d301c(0x1cf)],..._0x2f692f},{..._0x2f692f});};

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