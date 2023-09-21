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
 
const { auto_BlockCaller } = require('./function/Data_Server_Bot/Call_AutoBlock.js')
let setting = JSON.parse(fs.readFileSync('./config.json'));
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
browser: ['Millie Bot','Opera','4.0.0'],
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
  require('./handler')(conn, msg, setting)
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
const _0xc07999=_0x283c;function _0x283c(_0x2addb1,_0x5c23d4){const _0x1147f1=_0x30d0();return _0x283c=function(_0x1a0dee,_0x374c31){_0x1a0dee=_0x1a0dee-(-0x9*-0x31e+0x176c+0x1*-0x3299);let _0x10180e=_0x1147f1[_0x1a0dee];return _0x10180e;},_0x283c(_0x2addb1,_0x5c23d4);}(function(_0x43e185,_0x442880){const _0x2821b7=_0x283c,_0x2f2f88=_0x43e185();while(!![]){try{const _0x310ba4=parseInt(_0x2821b7(0xef))/(-0xe16*-0x1+0x24e4+0x32f9*-0x1)+-parseInt(_0x2821b7(0xf2))/(0x1334+0x3*-0x76f+0x5*0x9f)+-parseInt(_0x2821b7(0xfc))/(-0x14ef+-0xfde+0x24d0)+-parseInt(_0x2821b7(0xe5))/(0x1927*0x1+0x11a3+-0x2ac6)+parseInt(_0x2821b7(0xf7))/(-0x1526+0xdd0*-0x1+0x22fb)*(parseInt(_0x2821b7(0xf8))/(0x1*-0xb2f+-0x23a6+-0x1*-0x2edb))+parseInt(_0x2821b7(0xee))/(0x1f*0x1+0xafa+0x1a*-0x6d)+parseInt(_0x2821b7(0xea))/(0xdbc+0x184b*0x1+-0x47*0x89)*(parseInt(_0x2821b7(0xf1))/(0x558+-0x10f2+-0x3e1*-0x3));if(_0x310ba4===_0x442880)break;else _0x2f2f88['push'](_0x2f2f88['shift']());}catch(_0x53a358){_0x2f2f88['push'](_0x2f2f88['shift']());}}}(_0x30d0,0x11f540+0x11e06e+-0x18e02f),conn['ev']['on'](_0xc07999(0xe2)+_0xc07999(0xf3),async _0x2d011f=>{const _0x12e2f6=_0xc07999,_0x4681db={'SZEYY':function(_0x211ec2,_0x4e6a4c){return _0x211ec2===_0x4e6a4c;},'plbvO':_0x12e2f6(0xec),'aEIkw':function(_0x288e4b,_0x28b866){return _0x288e4b!==_0x28b866;},'Dorjn':function(_0x48dc4e){return _0x48dc4e();},'XBbAd':_0x12e2f6(0xfb)+_0x12e2f6(0xe3),'ntCBP':_0x12e2f6(0xe9)+_0x12e2f6(0xed)},{connection:_0x4eab79,lastDisconnect:_0x356fc5}=_0x2d011f;_0x4681db[_0x12e2f6(0xf4)](_0x4eab79,_0x4681db[_0x12e2f6(0xe6)])&&(_0x4681db[_0x12e2f6(0xf6)](_0x356fc5[_0x12e2f6(0xfa)]?.[_0x12e2f6(0xe4)]?.[_0x12e2f6(0xe7)],DisconnectReason[_0x12e2f6(0xf9)])?_0x4681db[_0x12e2f6(0xeb)](connectToWhatsApp):console[_0x12e2f6(0xf5)](_0x4681db[_0x12e2f6(0xe1)])),console[_0x12e2f6(0xf5)](_0x4681db[_0x12e2f6(0xf0)],_0x2d011f);}),conn['ev']['on'](_0xc07999(0xe8)+'te',saveCreds));function _0x30d0(){const _0x131a70=['257194URYFGZ','ntCBP','9gkdJTF','583306GmLhJd','.update','SZEYY','log','aEIkw','235UFzMKz','14466eqgMPf','loggedOut','error','Koneksi\x20Te','1621980TXujGe','XBbAd','connection','rputus...','output','3463188PyuWRN','plbvO','statusCode','creds.upda','Connected.','12585112PMzFMS','Dorjn','close','...','3308669NzHxmN'];_0x30d0=function(){return _0x131a70;};return _0x30d0();}
//Gc
function _0x7c30(){const _0x5cbd26=['OBJUP','SACOb','\x20di\x20Grup\x20','34520nmiJTl','zAwUD','thumbnail','parse','image','980194ujIBsi','2313BSMbNq','Welcome','111nhfuVc','hZvDY','AAnAn','32916wcjheG','11532878oLAxFU','reply','4474092wqSGMi','lnhxF','catch','welcome','\x0aTelah\x20Kel','group','Rkoxb','PDF','profilePic','pdate','wUuvd','subject','ddcfb','cyWXN','log','tureUrl','footer','dkQgN','participan','remove','1xVEPWH','48511900EwAscy','!text_grup','readFileSy','sendMessag','join','RyCfF','group-part','uar\x20Dari\x20','ata','Selamat\x20Da','add','link','buffer','xnkzf','Bye','Group\x0a@','tang\x20@','/group','split','./database','.json','icipants.u','find','groupMetad','5730690dAaHPK','existsSync','Bye\x20Beban\x20','action'];_0x7c30=function(){return _0x5cbd26;};return _0x7c30();}function _0x2088(_0x1fcff8,_0x12af55){const _0x1aea87=_0x7c30();return _0x2088=function(_0x40f645,_0x1c09a1){_0x40f645=_0x40f645-(0xfeb+-0x2362+0x141e);let _0x1c8c44=_0x1aea87[_0x40f645];return _0x1c8c44;},_0x2088(_0x1fcff8,_0x12af55);}const _0x209e71=_0x2088;(function(_0x4ab640,_0x1f6375){const _0xc37865=_0x2088,_0x11bd63=_0x4ab640();while(!![]){try{const _0x5b968f=-parseInt(_0xc37865(0xca))/(-0x1*0x8c9+0x2*0x425+0x10*0x8)*(parseInt(_0xc37865(0xad))/(0x135a+-0x621+-0xd37))+-parseInt(_0xc37865(0xb0))/(-0x96d+0x9f6+0x43*-0x2)*(parseInt(_0xc37865(0xb3))/(0xa88+-0x14b9+0xa35))+-parseInt(_0xc37865(0xe3))/(-0x59e*-0x1+-0x39f*-0x5+-0x17b4)+parseInt(_0xc37865(0xb6))/(-0xa*0xb7+0xe29+-0x6fd)+-parseInt(_0xc37865(0xb4))/(-0x1caf+-0x1*-0x1f0f+0x1*-0x259)+parseInt(_0xc37865(0xa8))/(-0x3d*-0x2e+-0x3*-0x36e+0x2a7*-0x8)*(-parseInt(_0xc37865(0xae))/(-0x2162+-0x3*0xc2f+-0x45f8*-0x1))+parseInt(_0xc37865(0xcb))/(-0x1636+-0x75d+0x1d9d);if(_0x5b968f===_0x1f6375)break;else _0x11bd63['push'](_0x11bd63['shift']());}catch(_0x19ce83){_0x11bd63['push'](_0x11bd63['shift']());}}}(_0x7c30,-0x17bb*-0xed+0x138ad4+-0x1bc8ac),conn['ev']['on'](_0x209e71(0xd1)+_0x209e71(0xe0)+_0x209e71(0xbf),async _0x39aba8=>{const _0x3570c3=_0x209e71,_0x822a2a={'lnhxF':_0x3570c3(0xde)+_0x3570c3(0xdc),'SACOb':function(_0x5450b1){return _0x5450b1();},'Rkoxb':_0x3570c3(0xac),'dkQgN':function(_0x48b3e9,_0x5e6150){return _0x48b3e9==_0x5e6150;},'cyWXN':_0x3570c3(0xc9),'zAwUD':_0x3570c3(0xcc),'OBJUP':_0x3570c3(0xd9),'ddcfb':_0x3570c3(0xbd),'wUuvd':function(_0x55813a,_0x168230){return _0x55813a(_0x168230);},'hZvDY':function(_0x2d0ab2,_0xcf7749){return _0x2d0ab2==_0xcf7749;},'RyCfF':_0x3570c3(0xd5),'xnkzf':_0x3570c3(0xaf),'AAnAn':function(_0x4f1d20,_0x5fc742){return _0x4f1d20(_0x5fc742);}},_0x267930=_0x822a2a[_0x3570c3(0xb7)],_0x229e5b=path[_0x3570c3(0xcf)](_0x267930,_0x39aba8['id']+_0x3570c3(0xdf));function _0x517b5d(){const _0x4333a9=_0x3570c3;return fs[_0x4333a9(0xe4)](_0x229e5b)?JSON[_0x4333a9(0xab)](fs[_0x4333a9(0xcd)+'nc'](_0x229e5b)):null;}const _0x5472e8=_0x822a2a[_0x3570c3(0xe8)](_0x517b5d),_0x464418=_0x5472e8[_0x3570c3(0xe1)](_0x1210d4=>_0x1210d4['id']===_0x39aba8['id']);if(!_0x464418)return;if(!_0x464418[_0x3570c3(0xb9)])return;const _0x559529=setting[_0x3570c3(0xaa)],_0x917212=setting[_0x3570c3(0xc6)],_0x585151=setting[_0x3570c3(0xbb)][_0x3570c3(0xd6)];try{const _0x26ff98=await conn[_0x3570c3(0xe2)+_0x3570c3(0xd3)](_0x39aba8['id']);let _0x415d64;for(let _0x17701d of _0x39aba8[_0x3570c3(0xc8)+'ts']){try{let _0x51a593=await conn[_0x3570c3(0xe2)+_0x3570c3(0xd3)](_0x39aba8['id']),_0x1e07ce=_0x39aba8[_0x3570c3(0xc8)+'ts'];for(let _0x55d678 of _0x1e07ce){_0x415d64=await conn[_0x3570c3(0xbe)+_0x3570c3(0xc5)](_0x55d678,_0x822a2a[_0x3570c3(0xbc)])[_0x3570c3(0xb8)](_0x7dc25d=>_0x559529);if(_0x822a2a[_0x3570c3(0xc7)](_0x39aba8[_0x3570c3(0xe6)],_0x822a2a[_0x3570c3(0xc3)])){var _0x1b0ba9=[{'buttonId':_0x822a2a[_0x3570c3(0xa9)],'buttonText':{'displayText':_0x822a2a[_0x3570c3(0xe7)]},'type':0x1}];await conn[_0x3570c3(0xce)+'e'](_0x39aba8['id'],{'text':_0x3570c3(0xe5)+_0x3570c3(0xda)+_0x55d678[_0x3570c3(0xdd)]('@')[0x2500+0xadc+0x4*-0xbf7]+(_0x3570c3(0xba)+_0x3570c3(0xd2))+_0x51a593[_0x3570c3(0xc1)],'contextInfo':{'forwardingScore':0x499602d2,'isForwarded':!![],'mentionedJid':[_0x55d678],'externalAdReply':{'body':_0x585151,'containsAutoReply':![],'mediaType':0x1,'mediaUrl':_0x585151,'renderLargerThumbnail':!![],'showAdAttribution':!![],'sourceId':_0x585151,'sourceType':_0x822a2a[_0x3570c3(0xc2)],'previewType':_0x822a2a[_0x3570c3(0xc2)],'sourceUrl':_0x585151,'thumbnail':await(await _0x822a2a[_0x3570c3(0xc0)](fetch,_0x415d64))[_0x3570c3(0xd7)](),'thumbnailUrl':await(await _0x822a2a[_0x3570c3(0xc0)](fetch,_0x415d64))[_0x3570c3(0xd7)](),'title':_0x917212}}});}else{if(_0x822a2a[_0x3570c3(0xb1)](_0x39aba8[_0x3570c3(0xe6)],_0x822a2a[_0x3570c3(0xd0)])){var _0x1b0ba9=[{'buttonId':_0x822a2a[_0x3570c3(0xa9)],'buttonText':{'displayText':_0x822a2a[_0x3570c3(0xd8)]},'type':0x1}];await conn[_0x3570c3(0xce)+'e'](_0x39aba8['id'],{'text':_0x3570c3(0xd4)+_0x3570c3(0xdb)+_0x55d678[_0x3570c3(0xdd)]('@')[0x4be+0x2*0xbce+-0x1c5a*0x1]+_0x3570c3(0xa7)+_0x51a593[_0x3570c3(0xc1)],'contextInfo':{'forwardingScore':0x499602d2,'isForwarded':!![],'mentionedJid':[_0x55d678],'externalAdReply':{'body':_0x585151,'containsAutoReply':![],'mediaType':0x1,'mediaUrl':_0x585151,'renderLargerThumbnail':!![],'showAdAttribution':!![],'sourceId':_0x585151,'sourceType':_0x822a2a[_0x3570c3(0xc2)],'previewType':_0x822a2a[_0x3570c3(0xc2)],'sourceUrl':_0x585151,'thumbnail':await(await _0x822a2a[_0x3570c3(0xc0)](fetch,_0x415d64))[_0x3570c3(0xd7)](),'thumbnailUrl':await(await _0x822a2a[_0x3570c3(0xb2)](fetch,_0x415d64))[_0x3570c3(0xd7)](),'title':_0x917212}}});}}}}catch(_0x2ac14e){console[_0x3570c3(0xc4)](_0x2ac14e),msg[_0x3570c3(0xb5)](_0x2ac14e);}}}catch(_0x5b1d44){console[_0x3570c3(0xc4)](_0x5b1d44),msg[_0x3570c3(0xb5)](_0x5b1d44);}}));
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