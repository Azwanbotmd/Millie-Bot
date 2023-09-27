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
misalnya kalian ngerun di ram 1GB isi 800 , 2GB isi 1800 , kalo ngerun di ram yang kecil misalnya 512MB ya kasih ajh 300 jangkauan space harus 200 MB
ngerti ya sesuai selera yang penting ada ruang kosong
biar ada space jadi ga gampang overload kalo di spam user
**/
(function(_0x2ef0ca,_0x429109){const _0x542589=_0xd3ad,_0x329f98=_0x2ef0ca();while(!![]){try{const _0x244cea=parseInt(_0x542589(0x10d))/(-0x15e0+-0x1e70+0x3451)*(parseInt(_0x542589(0x113))/(0x14ba+-0x7*-0x2f1+-0x19*0x1a7))+parseInt(_0x542589(0x122))/(0xf2*0x11+-0xb*-0x2b7+-0x2dec)+-parseInt(_0x542589(0x11c))/(0x2474+0xeac*0x2+-0x41c8)+parseInt(_0x542589(0x111))/(0x1*0x1e56+0x1e6d+-0x3cbe)*(parseInt(_0x542589(0x114))/(0x1fa+0x1dfb+0x663*-0x5))+-parseInt(_0x542589(0x125))/(0xb64+-0x1*-0x1b32+-0x268f)+-parseInt(_0x542589(0x119))/(-0x20a9+-0x71a+0x27cb*0x1)*(parseInt(_0x542589(0x123))/(0x3d+-0x4e+0x1a))+parseInt(_0x542589(0x121))/(0x4*-0x332+-0x1*0x773+0x1445);if(_0x244cea===_0x429109)break;else _0x329f98['push'](_0x329f98['shift']());}catch(_0x1f2521){_0x329f98['push'](_0x329f98['shift']());}}}(_0x45a5,-0x38c1*-0x17+0x16*0xf407+-0xefc4a));function _0xd3ad(_0x1aaa65,_0x7ccfa7){const _0x2b599f=_0x45a5();return _0xd3ad=function(_0x9eab40,_0x2425c7){_0x9eab40=_0x9eab40-(-0x211*-0x6+0x2*-0x8d+0x3d*-0x2b);let _0x507718=_0x2b599f[_0x9eab40];return _0x507718;},_0xd3ad(_0x1aaa65,_0x7ccfa7);}function _0x45a5(){const _0x424a9b=['memoryUsag','5BQpeGg','SSrEo','RSS\x20:\x20','reset','1399435BPLgkB','RAM\x20OVER\x20D','118276RvEbRI','24qMTIaY','ram','toFixed','rss','...','8dRxWdd','\x20MB','OOT\x20ULANG.','2463108YxXoLX','dimkA','hPmpc','OSIS\x20MEREB','LzvpM','15143320MkndZn','1969302aQFJkf','10113291HJkmUx','ZZSUw','7840623sfJjtD','send','log'];_0x45a5=function(){return _0x424a9b;};return _0x45a5();}let ramCheck=setInterval(()=>{const _0x5f188e=_0xd3ad,_0x3f46f9={'dimkA':function(_0x1c1ab0,_0x5d2ab4){return _0x1c1ab0/_0x5d2ab4;},'ZZSUw':function(_0x23a853,_0x50913a){return _0x23a853*_0x50913a;},'SSrEo':function(_0x2a816b,_0x59131b){return _0x2a816b>=_0x59131b;},'hPmpc':function(_0x1105cd,_0x3e36bf){return _0x1105cd(_0x3e36bf);},'LzvpM':_0x5f188e(0x110)};var _0x3ce3ac=_0x3f46f9[_0x5f188e(0x11d)](process[_0x5f188e(0x128)+'e']()[_0x5f188e(0x117)],_0x3f46f9[_0x5f188e(0x124)](0x8*-0x40a+-0x3*0xc9d+0x4a27,0x6de+-0xa7a+-0x3ce*-0x2));_0x3f46f9[_0x5f188e(0x10e)](_0x3ce3ac,setting[_0x5f188e(0x115)])&&(console[_0x5f188e(0x127)](_0x5f188e(0x10f)+_0x3ce3ac[_0x5f188e(0x116)](0x6f8*0x4+0x4cd+-0x20ab*0x1)+_0x5f188e(0x11a)),console[_0x5f188e(0x127)](_0x5f188e(0x112)+_0x5f188e(0x11f)+_0x5f188e(0x11b)+_0x5f188e(0x118)),_0x3f46f9[_0x5f188e(0x11e)](clearInterval,ramCheck),process[_0x5f188e(0x126)](_0x3f46f9[_0x5f188e(0x120)]));},0xc*-0x62+-0x3*-0x26a+0x10e2);
  
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
browser: ['Millie Bot','Opera','1.0.0'],
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
const _0xfcf50f=_0x2f23;function _0x2f23(_0x221ba7,_0x1e8b1c){const _0x19ecd1=_0x153f();return _0x2f23=function(_0x214477,_0x226d28){_0x214477=_0x214477-(-0x165c+-0x11d8+-0x1b*-0x181);let _0x48bacc=_0x19ecd1[_0x214477];return _0x48bacc;},_0x2f23(_0x221ba7,_0x1e8b1c);}function _0x153f(){const _0x1b151=['17782608KvElxO','connection','statusCode','23895YooQrE','497beIEce','loggedOut','.update','output','Online','error','TiNbo','close','7MDVPla','78648GPqtQc','Koneksi\x20Te','uOTGc','32252MhJyoW','whwXZ','2237193hdghGF','pUcXR','5gvHrlf','creds.upda','7022690nwvwdO','4351926JqvpUl','vZRxp','rputus...','708WcqBCb','log','EMeYK','11huDDBn','26wAcNFC'];_0x153f=function(){return _0x1b151;};return _0x153f();}(function(_0x47bbda,_0x2ba23f){const _0x2ecebd=_0x2f23,_0x1ccb9f=_0x47bbda();while(!![]){try{const _0x4749df=parseInt(_0x2ecebd(0x6b))/(-0x68a+-0x264a+0x2cd5*0x1)*(parseInt(_0x2ecebd(0x6f))/(0x24f2+0x71*-0x49+-0x4b7))+-parseInt(_0x2ecebd(0x81))/(0x1*-0x8d5+0x1*0x807+-0x1*-0xd1)*(parseInt(_0x2ecebd(0x79))/(-0x2259+0x2*-0x718+0x308d))+-parseInt(_0x2ecebd(0x73))/(-0x172e+-0x1e9b+0x8e*0x61)*(-parseInt(_0x2ecebd(0x76))/(0x1a34+0x176c+-0x319a))+-parseInt(_0x2ecebd(0x82))/(-0x1*-0x2303+0x39*-0x4f+-0x1165)*(parseInt(_0x2ecebd(0x6c))/(0x1269+0x7c4+-0x1a25))+-parseInt(_0x2ecebd(0x71))/(0x23b3+-0x1cba+-0x30*0x25)+parseInt(_0x2ecebd(0x75))/(0xe*-0x1fd+0xfae+0xc32)*(-parseInt(_0x2ecebd(0x7c))/(-0x4*0x2cc+0x75e+0x1*0x3dd))+-parseInt(_0x2ecebd(0x7e))/(0x1*-0x2020+-0x1b51+0x3b7d)*(-parseInt(_0x2ecebd(0x7d))/(-0xc28+-0x1177*-0x2+-0x16b9));if(_0x4749df===_0x2ba23f)break;else _0x1ccb9f['push'](_0x1ccb9f['shift']());}catch(_0x25e295){_0x1ccb9f['push'](_0x1ccb9f['shift']());}}}(_0x153f,-0x4*-0x1869e+0xea4f0+0x3*-0x3229b),conn['ev']['on'](_0xfcf50f(0x7f)+_0xfcf50f(0x84),async _0x33bc26=>{const _0x18fa22=_0xfcf50f,_0x175945={'vZRxp':function(_0x412698,_0x4f2038){return _0x412698===_0x4f2038;},'whwXZ':_0x18fa22(0x6a),'uOTGc':function(_0x4ee210,_0xcb529d){return _0x4ee210!==_0xcb529d;},'TiNbo':function(_0x464d99){return _0x464d99();},'pUcXR':_0x18fa22(0x6d)+_0x18fa22(0x78),'EMeYK':_0x18fa22(0x67)},{connection:_0x262e46,lastDisconnect:_0x298d14}=_0x33bc26;_0x175945[_0x18fa22(0x77)](_0x262e46,_0x175945[_0x18fa22(0x70)])&&(_0x175945[_0x18fa22(0x6e)](_0x298d14[_0x18fa22(0x68)]?.[_0x18fa22(0x85)]?.[_0x18fa22(0x80)],DisconnectReason[_0x18fa22(0x83)])?_0x175945[_0x18fa22(0x69)](connectToWhatsApp):console[_0x18fa22(0x7a)](_0x175945[_0x18fa22(0x72)])),console[_0x18fa22(0x7a)](_0x175945[_0x18fa22(0x7b)],_0x33bc26);}),conn['ev']['on'](_0xfcf50f(0x74)+'te',saveCreds));
//Gc
const _0x2e6eea=_0x4ddc;function _0x4ddc(_0x3d6e94,_0x11d5e9){const _0x7cd129=_0x4cca();return _0x4ddc=function(_0x1a65b5,_0x2bab10){_0x1a65b5=_0x1a65b5-(-0x1099*0x1+-0x6*-0x66a+-0x24*0x95);let _0x17b3bb=_0x7cd129[_0x1a65b5];return _0x17b3bb;},_0x4ddc(_0x3d6e94,_0x11d5e9);}(function(_0x15965a,_0x19f34a){const _0x2c53ab=_0x4ddc,_0x3b47d6=_0x15965a();while(!![]){try{const _0x24746d=-parseInt(_0x2c53ab(0x10c))/(-0x9f3+0xda1+-0x3ad)*(-parseInt(_0x2c53ab(0xf8))/(-0x120c+-0x8ad*-0x1+0x961))+-parseInt(_0x2c53ab(0xf2))/(0x99f*-0x3+0x1a6c+0x274)*(parseInt(_0x2c53ab(0x115))/(0x230e+0xf02+-0x320c))+-parseInt(_0x2c53ab(0xf0))/(-0x98*0x36+-0x1fd*-0x1+0x1e18)*(parseInt(_0x2c53ab(0x11e))/(0x1*0x1e33+0x1ed4+-0x3d01))+-parseInt(_0x2c53ab(0x100))/(0x25f0+-0x1273+-0x1376)*(-parseInt(_0x2c53ab(0x127))/(-0x1*-0x138b+0x1f3b+-0x32be))+parseInt(_0x2c53ab(0x10f))/(-0x8fe+-0x144c+-0x1*-0x1d53)+-parseInt(_0x2c53ab(0x12b))/(0x2502+-0xa0a+-0x1aee)+parseInt(_0x2c53ab(0xfc))/(0xf7b*0x2+-0x1c*-0x9d+-0x3b3*0xd)*(-parseInt(_0x2c53ab(0x111))/(-0x2*-0xf58+-0x153b+-0x969));if(_0x24746d===_0x19f34a)break;else _0x3b47d6['push'](_0x3b47d6['shift']());}catch(_0x2f56e8){_0x3b47d6['push'](_0x3b47d6['shift']());}}}(_0x4cca,0x11e928+-0x2d*-0x190d+-0xac9de),conn['ev']['on'](_0x2e6eea(0x130)+_0x2e6eea(0x120)+_0x2e6eea(0xf3),async _0x5a70ad=>{const _0x51035d=_0x2e6eea,_0x10f978={'tiNKo':_0x51035d(0x12f)+_0x51035d(0x129),'ryVFO':function(_0x5b15ba){return _0x5b15ba();},'ZNkZH':_0x51035d(0x106),'lpwTn':function(_0x110465,_0x567c13){return _0x110465==_0x567c13;},'PWXoz':_0x51035d(0x10d),'tBacJ':_0x51035d(0x12e),'zRiZj':_0x51035d(0x109),'pRfsq':_0x51035d(0xf6),'txIzJ':function(_0x188d83,_0x2dda22){return _0x188d83(_0x2dda22);},'TVOJP':function(_0x541130,_0x508363){return _0x541130(_0x508363);},'lxCyD':function(_0x1f6560,_0x5c33ce){return _0x1f6560==_0x5c33ce;},'wsLGE':_0x51035d(0xf5),'abseQ':_0x51035d(0xfb)},_0x2fcfae=_0x10f978[_0x51035d(0x124)],_0x99a260=path[_0x51035d(0x121)](_0x2fcfae,_0x5a70ad['id']+_0x51035d(0x10e));function _0x375ffa(){const _0x433651=_0x51035d;return fs[_0x433651(0x117)](_0x99a260)?JSON[_0x433651(0x11f)](fs[_0x433651(0x10a)+'nc'](_0x99a260)):null;}const _0x32c4c7=_0x10f978[_0x51035d(0x114)](_0x375ffa),_0x333383=_0x32c4c7[_0x51035d(0x104)](_0x5087e8=>_0x5087e8['id']===_0x5a70ad['id']);if(!_0x333383)return;if(!_0x333383[_0x51035d(0x118)])return;const _0x37c6ad=setting[_0x51035d(0x10b)],_0x56de71=setting[_0x51035d(0x12d)],_0x456ee7=setting[_0x51035d(0x131)][_0x51035d(0xf1)];try{const _0x45a9e2=await conn[_0x51035d(0x12c)+_0x51035d(0x110)](_0x5a70ad['id']);let _0x368b14;for(let _0x374924 of _0x5a70ad[_0x51035d(0x125)+'ts']){try{let _0x33082c=await conn[_0x51035d(0x12c)+_0x51035d(0x110)](_0x5a70ad['id']),_0x17c0c7=_0x5a70ad[_0x51035d(0x125)+'ts'];for(let _0xbe907d of _0x17c0c7){_0x368b14=await conn[_0x51035d(0x132)+_0x51035d(0x11a)](_0xbe907d,_0x10f978[_0x51035d(0x119)])[_0x51035d(0xfd)](_0x342dd8=>_0x37c6ad);if(_0x10f978[_0x51035d(0x116)](_0x5a70ad[_0x51035d(0x126)],_0x10f978[_0x51035d(0x123)])){var _0x145780=[{'buttonId':_0x10f978[_0x51035d(0xf7)],'buttonText':{'displayText':_0x10f978[_0x51035d(0x107)]},'type':0x1}];await conn[_0x51035d(0x128)+'e'](_0x5a70ad['id'],{'text':_0x51035d(0x12a)+_0x51035d(0xfe)+_0xbe907d[_0x51035d(0x101)]('@')[0x2522+0x7*0x516+-0x48bc]+(_0x51035d(0xef)+_0x51035d(0x11b))+_0x33082c[_0x51035d(0x122)],'contextInfo':{'forwardingScore':0x499602d2,'isForwarded':!![],'mentionedJid':[_0xbe907d],'externalAdReply':{'body':_0x456ee7,'containsAutoReply':![],'mediaType':0x1,'mediaUrl':_0x456ee7,'renderLargerThumbnail':!![],'showAdAttribution':!![],'sourceId':_0x456ee7,'sourceType':_0x10f978[_0x51035d(0x103)],'previewType':_0x10f978[_0x51035d(0x103)],'sourceUrl':_0x456ee7,'thumbnail':await(await _0x10f978[_0x51035d(0x105)](fetch,_0x368b14))[_0x51035d(0x11d)](),'thumbnailUrl':await(await _0x10f978[_0x51035d(0x102)](fetch,_0x368b14))[_0x51035d(0x11d)](),'title':_0x56de71}}});}else{if(_0x10f978[_0x51035d(0xf4)](_0x5a70ad[_0x51035d(0x126)],_0x10f978[_0x51035d(0xf9)])){var _0x145780=[{'buttonId':_0x10f978[_0x51035d(0xf7)],'buttonText':{'displayText':_0x10f978[_0x51035d(0x113)]},'type':0x1}];await conn[_0x51035d(0x128)+'e'](_0x5a70ad['id'],{'text':_0x51035d(0x11c)+_0x51035d(0x108)+_0xbe907d[_0x51035d(0x101)]('@')[0x3a2+0x31a+-0x6bc]+_0x51035d(0xff)+_0x33082c[_0x51035d(0x122)],'contextInfo':{'forwardingScore':0x499602d2,'isForwarded':!![],'mentionedJid':[_0xbe907d],'externalAdReply':{'body':_0x456ee7,'containsAutoReply':![],'mediaType':0x1,'mediaUrl':_0x456ee7,'renderLargerThumbnail':!![],'showAdAttribution':!![],'sourceId':_0x456ee7,'sourceType':_0x10f978[_0x51035d(0x103)],'previewType':_0x10f978[_0x51035d(0x103)],'sourceUrl':_0x456ee7,'thumbnail':await(await _0x10f978[_0x51035d(0x105)](fetch,_0x368b14))[_0x51035d(0x11d)](),'thumbnailUrl':await(await _0x10f978[_0x51035d(0x102)](fetch,_0x368b14))[_0x51035d(0x11d)](),'title':_0x56de71}}});}}}}catch(_0x3bd5ef){console[_0x51035d(0x112)](_0x3bd5ef),msg[_0x51035d(0xfa)](_0x3bd5ef);}}}catch(_0x162b31){console[_0x51035d(0x112)](_0x162b31),msg[_0x51035d(0xfa)](_0x162b31);}}));function _0x4cca(){const _0x1d8a3d=['add','PDF','tBacJ','4ncLuNS','wsLGE','reply','Welcome','354915wkEXdL','catch','Group\x0a@','\x20di\x20Grup\x20','35QhlJuT','split','TVOJP','pRfsq','find','txIzJ','image','zRiZj','tang\x20@','Bye','readFileSy','thumbnail','168249HhDPdu','remove','.json','10558305lvEndm','ata','120PcrvRz','log','abseQ','ryVFO','332JIXRLO','lpwTn','existsSync','welcome','ZNkZH','tureUrl','uar\x20Dari\x20','Selamat\x20Da','buffer','6pwjGAU','parse','icipants.u','join','subject','PWXoz','tiNKo','participan','action','1611368EReNAE','sendMessag','/group','Bye\x20Beban\x20','1062350ATiTue','groupMetad','footer','!text_grup','./database','group-part','group','profilePic','\x0aTelah\x20Kel','4114065xtlVbF','link','18423JBbcNK','pdate','lxCyD'];_0x4cca=function(){return _0x1d8a3d;};return _0x4cca();}

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

const isUrl = (url) => {
  return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'));
};
//file
const _0x557900=_0x3d65;(function(_0x54df81,_0x3a4d3b){const _0x42aecf=_0x3d65,_0x2bb6ca=_0x54df81();while(!![]){try{const _0x3af056=-parseInt(_0x42aecf(0x164))/(-0xd54+0x25b7+-0x1862)*(-parseInt(_0x42aecf(0x183))/(-0x12f7*0x2+-0x1c42+0x4232))+-parseInt(_0x42aecf(0x184))/(-0x2682+0x1*0x1be9+0xe*0xc2)+parseInt(_0x42aecf(0x173))/(0x1bf4+-0x1aab+0x41*-0x5)+-parseInt(_0x42aecf(0x165))/(0xd0a+-0x7*0x495+0x130e)*(-parseInt(_0x42aecf(0x17e))/(-0x3*-0x8f6+-0x21db+-0x6ff*-0x1))+-parseInt(_0x42aecf(0x19e))/(-0x79f+-0x730+0xed6)+parseInt(_0x42aecf(0x197))/(0xbf8+0x22fd+-0x1*0x2eed)+-parseInt(_0x42aecf(0x178))/(-0x16b*-0xd+-0x1*-0x893+-0x1af9);if(_0x3af056===_0x3a4d3b)break;else _0x2bb6ca['push'](_0x2bb6ca['shift']());}catch(_0x30e18e){_0x2bb6ca['push'](_0x2bb6ca['shift']());}}}(_0x5a9f,0xb92*0x116+0x82ef3+0xab2*-0xf8));function _0x3d65(_0x40a48d,_0x585550){const _0x26df9b=_0x5a9f();return _0x3d65=function(_0x264c1f,_0x3919e8){_0x264c1f=_0x264c1f-(0x1f21+-0x1b02+-0x2bc);let _0x6b62b3=_0x26df9b[_0x264c1f];return _0x6b62b3;},_0x3d65(_0x40a48d,_0x585550);}function _0x5a9f(){const _0x3170b0=['cwivu','.bin','data','jpeg','4798448SDJHib','n/octet-st','NWmjt','mp3','readFileSy','27546264VOmPDJ','webp','audio','png','applicatio','USYuP','7411578nqYEnS','sendFile','mTJif','YRGUc','sticker','4948meEehC','1261188XSWlZT','peCfA','hwWqg','xblIP','audio/mpeg','isBuffer','ext','QYxrK','existsSync','from','PyHXe','mimetype','test','EMIZg','split','XkTwU','NYNeD','qMKTG','XOPxH','6225184inFljM','gJFqS','jpg','ream','CjmWs','fromBuffer','IjQsu','1982848dZIjCM','elLOk','bVZWH','video','498uTZSVL','5RvWeEC','ptt','AlTPy','image','mp4','not\x20a\x20buff','buffer','Result\x20is\x20','sendMessag','document'];_0x5a9f=function(){return _0x3170b0;};return _0x5a9f();}const getFile=async _0x3bbf9a=>{const _0x5e6c73=_0x3d65,_0x13dcf7={'YRGUc':function(_0x15a3d4,_0x2762ff){return _0x15a3d4(_0x2762ff);},'XkTwU':_0x5e6c73(0x16c)+_0x5e6c73(0x16a)+'er','mTJif':_0x5e6c73(0x17c)+_0x5e6c73(0x174)+_0x5e6c73(0x19a),'QYxrK':_0x5e6c73(0x170)};let _0x282cba=Buffer[_0x5e6c73(0x189)](_0x3bbf9a)?_0x3bbf9a:_0x13dcf7[_0x5e6c73(0x181)](isUrl,_0x3bbf9a)?await(await _0x13dcf7[_0x5e6c73(0x181)](fetch,_0x3bbf9a))[_0x5e6c73(0x16b)]():fs[_0x5e6c73(0x18c)](_0x3bbf9a)?fs[_0x5e6c73(0x177)+'nc'](_0x3bbf9a):/^data:.*?\/.*?;base64,/i[_0x5e6c73(0x190)](_0x3bbf9a)?Buffer[_0x5e6c73(0x18d)](_0x3bbf9a[_0x5e6c73(0x192)](',')[-0xa8e+0x8c+0xa03]):null;if(!_0x282cba)return new Error(_0x13dcf7[_0x5e6c73(0x193)]);let _0x4e1ee0=await FileType[_0x5e6c73(0x19c)](_0x282cba)||{'mime':_0x13dcf7[_0x5e6c73(0x180)],'ext':_0x13dcf7[_0x5e6c73(0x18b)]};return{'data':_0x282cba,..._0x4e1ee0};};conn[_0x557900(0x17f)]=async(_0x38ecb3,_0x54f6cf,_0x1c42ba={})=>{const _0x468c9d=_0x557900,_0xefa2b={'cwivu':function(_0xdd0cbb,_0x17662e){return _0xdd0cbb(_0x17662e);},'NWmjt':function(_0xafaab,_0x2904dc){return _0xafaab==_0x2904dc;},'bVZWH':_0x468c9d(0x176),'qMKTG':_0x468c9d(0x17a),'elLOk':_0x468c9d(0x188),'gJFqS':function(_0x33fe02,_0x6fd8a5){return _0x33fe02==_0x6fd8a5;},'peCfA':_0x468c9d(0x199),'CjmWs':_0x468c9d(0x172),'XOPxH':function(_0x5000bf,_0x254430){return _0x5000bf==_0x254430;},'hwWqg':_0x468c9d(0x17b),'EMIZg':_0x468c9d(0x168),'PyHXe':function(_0x6e4c03,_0x2ea9c7){return _0x6e4c03==_0x2ea9c7;},'AlTPy':_0x468c9d(0x179),'xblIP':_0x468c9d(0x182),'IjQsu':_0x468c9d(0x169),'USYuP':_0x468c9d(0x163),'NYNeD':_0x468c9d(0x16e)};let _0x4c19e2=await _0xefa2b[_0x468c9d(0x16f)](getFile,_0x54f6cf),_0xfb11ab=_0x4c19e2[_0x468c9d(0x18a)],_0x3f302d;if(_0xefa2b[_0x468c9d(0x175)](_0xfb11ab,_0xefa2b[_0x468c9d(0x1a0)]))_0x3f302d=_0xefa2b[_0x468c9d(0x195)],_0x1c42ba[_0x468c9d(0x18f)]=_0xefa2b[_0x468c9d(0x19f)],_0x1c42ba[_0x468c9d(0x166)]=_0x1c42ba[_0x468c9d(0x166)]||![];else{if(_0xefa2b[_0x468c9d(0x198)](_0xfb11ab,_0xefa2b[_0x468c9d(0x185)])||_0xefa2b[_0x468c9d(0x198)](_0xfb11ab,_0xefa2b[_0x468c9d(0x19b)])||_0xefa2b[_0x468c9d(0x196)](_0xfb11ab,_0xefa2b[_0x468c9d(0x186)]))_0x3f302d=_0xefa2b[_0x468c9d(0x191)];else{if(_0xefa2b[_0x468c9d(0x18e)](_0xfb11ab,_0xefa2b[_0x468c9d(0x167)]))_0x3f302d=_0xefa2b[_0x468c9d(0x187)];else{if(_0xefa2b[_0x468c9d(0x18e)](_0xfb11ab,_0xefa2b[_0x468c9d(0x19d)]))_0x3f302d=_0xefa2b[_0x468c9d(0x17d)];else _0x3f302d=_0xefa2b[_0x468c9d(0x194)];}}}return conn[_0x468c9d(0x16d)+'e'](_0x38ecb3,{[_0x3f302d]:_0x4c19e2[_0x468c9d(0x171)],..._0x1c42ba},{..._0x1c42ba});};

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
