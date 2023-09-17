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
require('./function/FuncListen.js');
const { serialize, 
  fetchJson, 
  getBuffer 
 } = require("./function/func_Server");
const { nocache, 
  uncache 
 } = require('./function/Chache_Data.js');
 
const { welcome_JSON } = require('./function/Data_Location.js')
const { auto_BlockCaller } = require('./function/Data_Server_Bot/Call_AutoBlock.js')
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

function _0x4a15(_0xbe63ff,_0x129e10){var _0x42def6=_0x42de();return _0x4a15=function(_0x4a154c,_0x2d2cba){_0x4a154c=_0x4a154c-0x16d;var _0x280ed6=_0x42def6[_0x4a154c];return _0x280ed6;},_0x4a15(_0xbe63ff,_0x129e10);}(function(_0x4c0aaf,_0x4ef099){var _0x163de8=_0x4a15,_0x3ce396=_0x4c0aaf();while(!![]){try{var _0x366c76=-parseInt(_0x163de8(0x179))/0x1+-parseInt(_0x163de8(0x16e))/0x2*(-parseInt(_0x163de8(0x178))/0x3)+parseInt(_0x163de8(0x172))/0x4*(-parseInt(_0x163de8(0x16f))/0x5)+parseInt(_0x163de8(0x17c))/0x6+parseInt(_0x163de8(0x17a))/0x7*(parseInt(_0x163de8(0x170))/0x8)+parseInt(_0x163de8(0x171))/0x9+parseInt(_0x163de8(0x17b))/0xa;if(_0x366c76===_0x4ef099)break;else _0x3ce396['push'](_0x3ce396['shift']());}catch(_0x393822){_0x3ce396['push'](_0x3ce396['shift']());}}}(_0x42de,0xa4f62),setTimeout(()=>{var _0x35aec3=_0x4a15;console[_0x35aec3(0x176)](color('\x0a▒█▀▄▀█\x20▀█▀\x20▒█░░░\x20▒█░░░\x20▀█▀\x20▒█▀▀▀\x20\x0a▒█▒█▒█\x20▒█░\x20▒█░░░\x20▒█░░░\x20▒█░\x20▒█▀▀▀\x20\x0a▒█░░▒█\x20▄█▄\x20▒█▄▄█\x20▒█▄▄█\x20▄█▄\x20▒█▄▄▄\x20\x0a\x0a▒█▀▀█\x20▒█▀▀▀█\x20▀▀█▀▀\x20\u3000\x20▒█▀▄▀█\x20▒█▀▀▄\x20\x0a▒█▀▀▄\x20▒█░░▒█\x20░▒█░░\x20\u3000\x20▒█▒█▒█\x20▒█░▒█\x20\x0a▒█▄▄█\x20▒█▄▄▄█\x20░▒█░░\x20\u3000\x20▒█░░▒█\x20▒█▄▄▀\x0a\x0a',_0x35aec3(0x175))),console['log'](color(_0x35aec3(0x173),'cyan'),color(_0x35aec3(0x174),_0x35aec3(0x175))),console[_0x35aec3(0x176)](color(_0x35aec3(0x17d),_0x35aec3(0x177)),color(_0x35aec3(0x16d),'yellow'));},0x2710));function _0x42de(){var _0x1bcddd=['pink','log','yellow','3NRVURu','537710gxmyXE','56NqIHkU','6237830IsyNhj','2769732GPOspK','\x0aMillie\x20BOT\x20MD\x20Versi\x205\x0a','\x0aTHANKS\x20TO:\x20\x0a•\x20Allah\x0a•\x20Ruhend\x0a•\x20Lainnya\x0a','1783174HQVtXk','87535bTguKH','2928KWKuRb','4288221tbKgqg','284vMSGxc','Millie\x20Bot\x20MD\x20','Author\x20Ruli\x20Henderson'];_0x42de=function(){return _0x1bcddd;};return _0x42de();}

let setting = JSON.parse(fs.readFileSync('./config.json'));

const connectToWhatsApp = async () => { try {
let { state, saveCreds } = await useMultiFileAuthState('./sessions')
const conn = makeWASocket({
printQRInTerminal: true,
logger: logg({ level: 'silent' }),
browser: ['Millie-Bot~Ruhend','Opera','5.0.0'],
auth: state,
getMessage: async (key) => {
         if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg.message || undefined
         }
         return {
            conversation: 'Loading...'
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
conn.ev.on('messages.upsert', async m => { try {
  var msg = m.messages[0]
  var from = msg.key.remoteJid
  var chat = msg.key.remoteJid
  var sender = msg.isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid;
  var reply = (teks) => { conn.sendMessage(from, { text: teks }, { quoted: msg }) }
  if (!m.messages) return;
  if (msg.key && msg.key.remoteJid == 'status@broadcast') return (msg = serialize(conn, msg))   
  msg = serialize(conn, msg, from, chat, reply, sender)
  require('./handler')(conn, msg, setting)
} catch (error) {
    console.error(error);
  }
})

conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })
conn.ws.on('CB:call', async (json) => {
auto_BlockCaller(json)
})
//state
function _0x3f47(_0x63122d,_0x5c16dd){const _0x5c48fd=_0x566c();return _0x3f47=function(_0x13e6a5,_0x317927){_0x13e6a5=_0x13e6a5-(0x3*-0xc2e+0x152b*-0x1+0x3a4b);let _0x36003c=_0x5c48fd[_0x13e6a5];return _0x36003c;},_0x3f47(_0x63122d,_0x5c16dd);}function _0x566c(){const _0x4c9e11=['iqgKJ','error','tOXtw','5003400jbhurB','connection','kWBnE','loggedOut','close','...','.update','478064kWfdks','Terhubung.','rputus...','49930FaWlGQ','SifzY','2IeBUJn','646186ZbOyWG','1961805NYKJMp','63cbNGkx','Koneksi\x20Te','creds.upda','statusCode','output','BVRWf','2257792VKczlP','9XuVyGQ','1636029tTNwRk','log','XgHrU'];_0x566c=function(){return _0x4c9e11;};return _0x566c();}const _0x5549cc=_0x3f47;(function(_0x3330c8,_0x15f3f0){const _0x31a2e3=_0x3f47,_0x288a72=_0x3330c8();while(!![]){try{const _0x2c732b=parseInt(_0x31a2e3(0xa6))/(-0xcc6+-0x12c7+-0x241*-0xe)+-parseInt(_0x31a2e3(0xa5))/(0x41a*0x1+0x1de+-0xda*0x7)*(parseInt(_0x31a2e3(0xb0))/(-0x4c*0x5f+0x1e86+-0x24f))+-parseInt(_0x31a2e3(0xae))/(-0x6*0x8b+0xb1a+0x4*-0x1f5)+-parseInt(_0x31a2e3(0xa7))/(0x7c*-0x1f+-0x63*0x3d+-0x67*-0x60)+parseInt(_0x31a2e3(0x99))/(-0x888+-0x5b8+0x723*0x2)+parseInt(_0x31a2e3(0xa8))/(0x141d+0xb38+-0x1f4e)*(parseInt(_0x31a2e3(0xa0))/(0x18c2+-0x408+-0x373*0x6))+-parseInt(_0x31a2e3(0xaf))/(-0x2*0x12e+-0xba3+-0x2*-0x704)*(parseInt(_0x31a2e3(0xa3))/(-0x19f+0xa9f+0x1f*-0x4a));if(_0x2c732b===_0x15f3f0)break;else _0x288a72['push'](_0x288a72['shift']());}catch(_0x266f0a){_0x288a72['push'](_0x288a72['shift']());}}}(_0x566c,0x1*-0xbb104+-0x24a78+0x15c6a7),conn['ev']['on'](_0x5549cc(0x9a)+_0x5549cc(0x9f),async _0x2ee76a=>{const _0x567261=_0x5549cc,_0x58420c={'XgHrU':function(_0x18606f,_0x6cbd17){return _0x18606f===_0x6cbd17;},'tOXtw':_0x567261(0x9d),'iqgKJ':function(_0xf3d7c7,_0x4419d0){return _0xf3d7c7!==_0x4419d0;},'SifzY':function(_0x2a4ca6){return _0x2a4ca6();},'BVRWf':_0x567261(0xa9)+_0x567261(0xa2),'kWBnE':_0x567261(0xa1)+_0x567261(0x9e)},{connection:_0x4f5bde,lastDisconnect:_0x2c7549}=_0x2ee76a;_0x58420c[_0x567261(0xb2)](_0x4f5bde,_0x58420c[_0x567261(0x98)])&&(_0x58420c[_0x567261(0x96)](_0x2c7549[_0x567261(0x97)]?.[_0x567261(0xac)]?.[_0x567261(0xab)],DisconnectReason[_0x567261(0x9c)])?_0x58420c[_0x567261(0xa4)](connectToWhatsApp):console[_0x567261(0xb1)](_0x58420c[_0x567261(0xad)])),console[_0x567261(0xb1)](_0x58420c[_0x567261(0x9b)],_0x2ee76a);}),conn['ev']['on'](_0x5549cc(0xaa)+'te',saveCreds));
//
var pu = 'https://telegra.ph/file/331465a8870217d22395a.jpg'
// judul bot
var title = 'Millie Boby Brown'
//link gc kamu jika punya kalo g punya ya bikin atau ya asal asalan ajh
var link = 'https://chat.whatsapp.com/LuHHeKGLnnjIqEN7FbpFVk'

const _0x16e9a8=_0xfb4b;function _0x1737(){const _0x337d95=['Group\x20@','Selamat\x20Da','IIlAn','split','groupMetad','Bye','log','group-part','uar\x20Dari\x20','twTLL','image','Bye\x20Beban\x20','ata','2298654yAgiPg','ouMhY','oPSsV','39685lDdbhy','participan','subject','7746ZWAfAl','add','6185WfvXPf','\x20Telah\x20Kel','profilePic','tang\x20@','\x20di\x20Grup\x20','252708RzdGDM','pdate','mGSiR','JrtmV','remove','8756550AiDIkJ','Rzvoo','sendMessag','1086071KvtomG','fcHcg','16GGkrqp','550mqkRLR','40VAwHrq','cJjdE','icipants.u','Welcome','yqeOK','56xQOadU','tureUrl','PDF','!text_grup','300171qrDdEe','buffer','action'];_0x1737=function(){return _0x337d95;};return _0x1737();}function _0xfb4b(_0x11ecf2,_0x4563fb){const _0x344946=_0x1737();return _0xfb4b=function(_0x1499ac,_0x548544){_0x1499ac=_0x1499ac-(-0xb7c+-0x24a+0xf1d);let _0xfda02a=_0x344946[_0x1499ac];return _0xfda02a;},_0xfb4b(_0x11ecf2,_0x4563fb);}(function(_0x13798e,_0x333416){const _0x524ce6=_0xfb4b,_0x545947=_0x13798e();while(!![]){try{const _0x411949=parseInt(_0x524ce6(0x172))/(-0x13f5+0xf7f+-0x17d*-0x3)*(parseInt(_0x524ce6(0x188))/(0x2409*-0x1+-0x13*-0x90+0x195b*0x1))+-parseInt(_0x524ce6(0x15f))/(0x898+-0x2012+0x35b*0x7)*(-parseInt(_0x524ce6(0x15b))/(0x267d+0x130f+0x107*-0x38))+parseInt(_0x524ce6(0x177))/(0xcd9+0x3*0xa75+-0x2c33)*(-parseInt(_0x524ce6(0x175))/(0x111a+-0x79f*-0x3+-0x27f1))+parseInt(_0x524ce6(0x184))/(-0x5e*-0x53+-0x1917+-0x55c)*(parseInt(_0x524ce6(0x186))/(-0x1279+-0x135+0x13b6))+-parseInt(_0x524ce6(0x16f))/(-0x3*-0x643+0x5*-0x557+0x7f3)+-parseInt(_0x524ce6(0x181))/(-0x4*0x2fc+0x1b4e+-0x24*0x6d)+-parseInt(_0x524ce6(0x187))/(-0x16a4+-0x268d+-0xf4f*-0x4)*(-parseInt(_0x524ce6(0x17c))/(-0x216+0x685+0x1*-0x463));if(_0x411949===_0x333416)break;else _0x545947['push'](_0x545947['shift']());}catch(_0x4393fa){_0x545947['push'](_0x545947['shift']());}}}(_0x1737,0x6ed99+-0xcdfb2+0x129b37),conn['ev']['on'](_0x16e9a8(0x169)+_0x16e9a8(0x158)+_0x16e9a8(0x17d),async _0xdb1c48=>{const _0xb58289=_0x16e9a8,_0x2321eb={'mGSiR':_0xb58289(0x16c),'fcHcg':function(_0x5af449,_0x4850f9){return _0x5af449==_0x4850f9;},'twTLL':_0xb58289(0x180),'oPSsV':_0xb58289(0x15e),'Rzvoo':_0xb58289(0x167),'ouMhY':_0xb58289(0x15d),'yqeOK':function(_0x50e2c4,_0x53de9a){return _0x50e2c4(_0x53de9a);},'cJjdE':function(_0x5e7871,_0x4b04ff){return _0x5e7871==_0x4b04ff;},'JrtmV':_0xb58289(0x176),'IIlAn':_0xb58289(0x159)};try{let _0x5e3101;try{_0x5e3101=await conn[_0xb58289(0x179)+_0xb58289(0x15c)](num,_0x2321eb[_0xb58289(0x17e)]);}catch{_0x5e3101=pu;}const _0xbb7002=await conn[_0xb58289(0x166)+_0xb58289(0x16e)](_0xdb1c48['id']);for(let _0x19205d of _0xdb1c48[_0xb58289(0x173)+'ts']){try{let _0x8243bc=await conn[_0xb58289(0x166)+_0xb58289(0x16e)](_0xdb1c48['id']),_0xe0818e=_0xdb1c48[_0xb58289(0x173)+'ts'];for(let _0x85cc4b of _0xe0818e){if(_0x2321eb[_0xb58289(0x185)](_0xdb1c48[_0xb58289(0x161)],_0x2321eb[_0xb58289(0x16b)])){var _0x3d2aad=[{'buttonId':_0x2321eb[_0xb58289(0x171)],'buttonText':{'displayText':_0x2321eb[_0xb58289(0x182)]},'type':0x1}];await conn[_0xb58289(0x183)+'e'](_0xdb1c48['id'],{'text':_0xb58289(0x16d)+_0xb58289(0x162)+_0x85cc4b[_0xb58289(0x165)]('@')[-0x207*-0x13+-0x1*-0x2cd+-0x2952]+(_0xb58289(0x178)+_0xb58289(0x16a))+_0x8243bc[_0xb58289(0x174)],'contextInfo':{'forwardingScore':0x499602d2,'isForwarded':!![],'mentionedJid':[_0x85cc4b],'externalAdReply':{'body':link,'containsAutoReply':![],'mediaType':0x1,'mediaUrl':link,'renderLargerThumbnail':!![],'showAdAttribution':!![],'sourceId':link,'sourceType':_0x2321eb[_0xb58289(0x170)],'previewType':_0x2321eb[_0xb58289(0x170)],'sourceUrl':link,'thumbnail':await(await _0x2321eb[_0xb58289(0x15a)](fetch,_0x5e3101))[_0xb58289(0x160)](),'thumbnailUrl':await(await _0x2321eb[_0xb58289(0x15a)](fetch,_0x5e3101))[_0xb58289(0x160)](),'title':title}}});}else{if(_0x2321eb[_0xb58289(0x157)](_0xdb1c48[_0xb58289(0x161)],_0x2321eb[_0xb58289(0x17f)])){var _0x3d2aad=[{'buttonId':_0x2321eb[_0xb58289(0x171)],'buttonText':{'displayText':_0x2321eb[_0xb58289(0x164)]},'type':0x1}];await conn[_0xb58289(0x183)+'e'](_0xdb1c48['id'],{'text':_0xb58289(0x163)+_0xb58289(0x17a)+_0x85cc4b[_0xb58289(0x165)]('@')[0xd*0x2f+-0x13*-0x1a5+-0x21a2]+_0xb58289(0x17b)+_0x8243bc[_0xb58289(0x174)],'contextInfo':{'forwardingScore':0x499602d2,'isForwarded':!![],'mentionedJid':[_0x85cc4b],'externalAdReply':{'body':link,'containsAutoReply':![],'mediaType':0x1,'mediaUrl':link,'renderLargerThumbnail':!![],'showAdAttribution':!![],'sourceId':link,'sourceType':_0x2321eb[_0xb58289(0x170)],'previewType':_0x2321eb[_0xb58289(0x170)],'sourceUrl':link,'thumbnail':await(await _0x2321eb[_0xb58289(0x15a)](fetch,_0x5e3101))[_0xb58289(0x160)](),'thumbnailUrl':await(await _0x2321eb[_0xb58289(0x15a)](fetch,_0x5e3101))[_0xb58289(0x160)](),'title':title}}});}}}}catch(_0x17cfa5){console[_0xb58289(0x168)](_0x17cfa5);}}}catch(_0xdbc48b){console[_0xb58289(0x168)](_0xdbc48b);}}));
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