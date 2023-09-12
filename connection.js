function _0x3988(_0x3c3425,_0x5becf7){var _0x32ce71=_0x32ce();return _0x3988=function(_0x398831,_0x492721){_0x398831=_0x398831-0x1a8;var _0x22bcab=_0x32ce71[_0x398831];return _0x22bcab;},_0x3988(_0x3c3425,_0x5becf7);}function _0x32ce(){var _0x514d96=['18yIdzrY','1677qtYPXZ','26MYSXzH','8284PdbOdh','2621333CwAsww','40739HtnKqU','7663038lISctI','1096oFtCsc','2809825kLOGiY','4433070XiNMxd','31262vTIVYE'];_0x32ce=function(){return _0x514d96;};return _0x32ce();}(function(_0x5d557b,_0x4d0178){var _0x1c97f4=_0x3988,_0x356878=_0x5d557b();while(!![]){try{var _0xddeca9=parseInt(_0x1c97f4(0x1aa))/0x1*(-parseInt(_0x1c97f4(0x1b2))/0x2)+-parseInt(_0x1c97f4(0x1b1))/0x3*(parseInt(_0x1c97f4(0x1a8))/0x4)+-parseInt(_0x1c97f4(0x1ad))/0x5+parseInt(_0x1c97f4(0x1ab))/0x6+parseInt(_0x1c97f4(0x1af))/0x7*(parseInt(_0x1c97f4(0x1ac))/0x8)+-parseInt(_0x1c97f4(0x1b0))/0x9*(-parseInt(_0x1c97f4(0x1ae))/0xa)+parseInt(_0x1c97f4(0x1a9))/0xb;if(_0xddeca9===_0x4d0178)break;else _0x356878['push'](_0x356878['shift']());}catch(_0x4c92df){_0x356878['push'](_0x356878['shift']());}}}(_0x32ce,0xbaaff),process['on']('uncaughtException',function(_0x2d3f37){console['log'](_0x2d3f37);}));
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
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

function _0x4a15(_0xbe63ff,_0x129e10){var _0x42def6=_0x42de();return _0x4a15=function(_0x4a154c,_0x2d2cba){_0x4a154c=_0x4a154c-0x16d;var _0x280ed6=_0x42def6[_0x4a154c];return _0x280ed6;},_0x4a15(_0xbe63ff,_0x129e10);}(function(_0x4c0aaf,_0x4ef099){var _0x163de8=_0x4a15,_0x3ce396=_0x4c0aaf();while(!![]){try{var _0x366c76=-parseInt(_0x163de8(0x179))/0x1+-parseInt(_0x163de8(0x16e))/0x2*(-parseInt(_0x163de8(0x178))/0x3)+parseInt(_0x163de8(0x172))/0x4*(-parseInt(_0x163de8(0x16f))/0x5)+parseInt(_0x163de8(0x17c))/0x6+parseInt(_0x163de8(0x17a))/0x7*(parseInt(_0x163de8(0x170))/0x8)+parseInt(_0x163de8(0x171))/0x9+parseInt(_0x163de8(0x17b))/0xa;if(_0x366c76===_0x4ef099)break;else _0x3ce396['push'](_0x3ce396['shift']());}catch(_0x393822){_0x3ce396['push'](_0x3ce396['shift']());}}}(_0x42de,0xa4f62),setTimeout(()=>{var _0x35aec3=_0x4a15;console[_0x35aec3(0x176)](color('\x0a▒█▀▄▀█\x20▀█▀\x20▒█░░░\x20▒█░░░\x20▀█▀\x20▒█▀▀▀\x20\x0a▒█▒█▒█\x20▒█░\x20▒█░░░\x20▒█░░░\x20▒█░\x20▒█▀▀▀\x20\x0a▒█░░▒█\x20▄█▄\x20▒█▄▄█\x20▒█▄▄█\x20▄█▄\x20▒█▄▄▄\x20\x0a\x0a▒█▀▀█\x20▒█▀▀▀█\x20▀▀█▀▀\x20\u3000\x20▒█▀▄▀█\x20▒█▀▀▄\x20\x0a▒█▀▀▄\x20▒█░░▒█\x20░▒█░░\x20\u3000\x20▒█▒█▒█\x20▒█░▒█\x20\x0a▒█▄▄█\x20▒█▄▄▄█\x20░▒█░░\x20\u3000\x20▒█░░▒█\x20▒█▄▄▀\x0a\x0a',_0x35aec3(0x175))),console['log'](color(_0x35aec3(0x173),'cyan'),color(_0x35aec3(0x174),_0x35aec3(0x175))),console[_0x35aec3(0x176)](color(_0x35aec3(0x17d),_0x35aec3(0x177)),color(_0x35aec3(0x16d),'yellow'));},0x2710));function _0x42de(){var _0x1bcddd=['pink','log','yellow','3NRVURu','537710gxmyXE','56NqIHkU','6237830IsyNhj','2769732GPOspK','\x0aMillie\x20BOT\x20MD\x20Versi\x202\x0a','\x0aTHANKS\x20TO:\x20\x0a•\x20Allah\x0a•\x20Ruhend\x0a•\x20Lainnya\x0a','1783174HQVtXk','87535bTguKH','2928KWKuRb','4288221tbKgqg','284vMSGxc','Millie\x20Bot\x20MD\x20','Author\x20Ruli\x20Henderson'];_0x42de=function(){return _0x1bcddd;};return _0x42de();}

let setting = JSON.parse(fs.readFileSync('./config.json'));

const connectToWhatsApp = async () => { try {
let { state, saveCreds } = await useMultiFileAuthState('./sessions')
const conn = makeWASocket({
printQRInTerminal: true,
logger: logg({ level: 'silent' }),
browser: ['Millie Bot','Chrome','2.0.0'],
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
if (!m.messages) return;
if (msg.key && msg.key.remoteJid == "status@broadcast") return
msg = serialize(conn, msg)
require('./main')(conn, msg, setting, store)
} catch (error) {
    console.error(error);
  }
})
//
function _0x16c7(_0x5d3ae9,_0x553c0a){const _0x2f9726=_0x2f0c();return _0x16c7=function(_0x1ddfa9,_0x1a93db){_0x1ddfa9=_0x1ddfa9-(0x1a5f+0x26f9+0x11*-0x3c1);let _0x2908a0=_0x2f9726[_0x1ddfa9];return _0x2908a0;},_0x16c7(_0x5d3ae9,_0x553c0a);}const _0x5e95c0=_0x16c7;function _0x2f0c(){const _0x2e99ba=['RcpiD','.js','join','66iNRfYe','readdirSyn','mbYsa','3EB0','981704XLeOLZ','25535FDWItS','remoteJid','key','endsWith','plugins','2900260sLTKdP','messages','akKqr','LdJSK','adcast','rrpob','540lOllSw','EIVzZ','status@bro','300932xjJpGI','startsWith','BAE5','error','105426YBtaxg','5663861POhSIv','psert','3HXQraq','isBaileys','ortqt','WHeJN','YISBW','1821524olvCbP','messages.u'];_0x2f0c=function(){return _0x2e99ba;};return _0x2f0c();}(function(_0x6d7cb6,_0x530165){const _0x2afec1=_0x16c7,_0x29c659=_0x6d7cb6();while(!![]){try{const _0x1dd424=parseInt(_0x2afec1(0x18b))/(-0xb*0xcb+0x638*0x5+-0x7*0x332)+parseInt(_0x2afec1(0x197))/(0x1437+0x1c*0x97+-0x53f*0x7)+-parseInt(_0x2afec1(0x192))/(-0x1327*0x2+0x4*0x782+0x849)*(parseInt(_0x2afec1(0x1a6))/(0x583*-0x1+-0xd91*0x2+-0x9*-0x3a1))+parseInt(_0x2afec1(0x1a1))/(0x1461+-0x8*0xe3+-0xd44)*(parseInt(_0x2afec1(0x19c))/(-0x5b3*-0x6+0x4*0x6db+-0x3d98))+-parseInt(_0x2afec1(0x190))/(0xb6b+-0x1610+0xaac)+parseInt(_0x2afec1(0x1a0))/(0x1733+-0xaed+0x2*-0x61f)+-parseInt(_0x2afec1(0x18f))/(0x113f+-0x87a*-0x2+0x1115*-0x2)*(-parseInt(_0x2afec1(0x188))/(0x5*-0x5b6+0x2558+0x1*-0x8c0));if(_0x1dd424===_0x530165)break;else _0x29c659['push'](_0x29c659['shift']());}catch(_0x10909b){_0x29c659['push'](_0x29c659['shift']());}}}(_0x2f0c,0x704bc+0x1b782+-0x14646),conn['ev']['on'](_0x5e95c0(0x198)+_0x5e95c0(0x191),async _0x39eb01=>{const _0x18f992=_0x5e95c0,_0x43a7a0={'rrpob':function(_0x1ab901,_0x5979c4){return _0x1ab901==_0x5979c4;},'RcpiD':_0x18f992(0x18a)+_0x18f992(0x1aa),'LdJSK':function(_0x414f53,_0x3bb26b,_0xff6bf){return _0x414f53(_0x3bb26b,_0xff6bf);},'EIVzZ':_0x18f992(0x18d),'mbYsa':_0x18f992(0x19f),'ortqt':_0x18f992(0x1a5),'akKqr':_0x18f992(0x19a),'YISBW':function(_0x4cd427,_0x6b8d57){return _0x4cd427(_0x6b8d57);},'WHeJN':function(_0x491b6e,_0x1050fa,_0x54e07c,_0x2f4ed9,_0x6593f4){return _0x491b6e(_0x1050fa,_0x54e07c,_0x2f4ed9,_0x6593f4);}};try{var _0x2ae976=_0x39eb01[_0x18f992(0x1a7)][-0x2105+0x440+0x1cc5];if(!_0x39eb01[_0x18f992(0x1a7)])return;if(_0x2ae976[_0x18f992(0x1a3)]&&_0x43a7a0[_0x18f992(0x187)](_0x2ae976[_0x18f992(0x1a3)][_0x18f992(0x1a2)],_0x43a7a0[_0x18f992(0x199)]))return _0x2ae976=_0x43a7a0[_0x18f992(0x1a9)](serialize,conn,_0x2ae976);_0x2ae976[_0x18f992(0x193)]=_0x2ae976[_0x18f992(0x1a3)]['id'][_0x18f992(0x18c)](_0x43a7a0[_0x18f992(0x189)])||_0x2ae976[_0x18f992(0x1a3)]['id'][_0x18f992(0x18c)](_0x43a7a0[_0x18f992(0x19e)]);const _0x1ec0ea=path[_0x18f992(0x19b)](__dirname,_0x43a7a0[_0x18f992(0x194)]),_0x436523=fs[_0x18f992(0x19d)+'c'](_0x1ec0ea);for(const _0x29fb08 of _0x436523){if(_0x29fb08[_0x18f992(0x1a4)](_0x43a7a0[_0x18f992(0x1a8)])){const _0x54a646=path[_0x18f992(0x19b)](_0x1ec0ea,_0x29fb08),_0x5657c6=_0x43a7a0[_0x18f992(0x196)](require,_0x54a646);await _0x43a7a0[_0x18f992(0x195)](_0x5657c6,conn,_0x2ae976,setting,store);}}}catch(_0x8cf158){console[_0x18f992(0x18e)](_0x8cf158);}}));
//
conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })
conn.ws.on('CB:call', async (json) => {
auto_BlockCaller(json)
})
//state
const _0x1bf2ea=_0x38cf;function _0x38cf(_0x2d875e,_0xea924){const _0x53a712=_0x35de();return _0x38cf=function(_0x522370,_0x1b5a8f){_0x522370=_0x522370-(0x2*-0x11e3+-0x872*0x1+-0x2e0d*-0x1);let _0x3809c1=_0x53a712[_0x522370];return _0x3809c1;},_0x38cf(_0x2d875e,_0xea924);}function _0x35de(){const _0xb49958=['1413346jxUmis','40cUsUih','\x20Koneksi\x20T','PdVPW','erputus...','output','7346KrzvIt','.update','\x20Menghubun','igzHU','connection','28rJEsYX','544185HaXEGB','\x20Terhubung','spJPo','iNWbu','log','gkan..','GmnnB','error','191574auffIt','loggedOut','jaJKm','connecting','21ihMokP','35528LHkfHT','statusCode','fRXSP','123113bMdghr','5vUrwtN','724564zxNjhB','TakYz','unTZW','close'];_0x35de=function(){return _0xb49958;};return _0x35de();}(function(_0xfba684,_0x1fefed){const _0xf91e70=_0x38cf,_0x452b82=_0xfba684();while(!![]){try{const _0x2522f0=-parseInt(_0xf91e70(0x1de))/(0x14b*-0x1+0x7b*-0x33+-0x19cd*-0x1)+parseInt(_0xf91e70(0x1ea))/(-0xf79*-0x1+-0x1b02+0xb8b)*(-parseInt(_0xf91e70(0x1da))/(-0x1fe+-0x2*0xea3+0x1f47))+parseInt(_0xf91e70(0x1e0))/(-0x66f*0x5+0x2ed+0x1d42)*(parseInt(_0xf91e70(0x1df))/(-0x2239+-0x150d+-0x95*-0x5f))+parseInt(_0xf91e70(0x1d6))/(0x1540+0x26d2+-0x3c0c)+-parseInt(_0xf91e70(0x1ef))/(-0x1669+0x1374+0x2fc)*(parseInt(_0xf91e70(0x1db))/(0x1384*-0x2+-0xf*-0xad+0x1ced))+-parseInt(_0xf91e70(0x1f0))/(-0x223b+-0x12*-0x121+0xdf2)*(-parseInt(_0xf91e70(0x1e5))/(0x7a2*0x2+-0x1a35*0x1+0x3a9*0x3))+-parseInt(_0xf91e70(0x1e4))/(0x844*0x1+0x215b*0x1+0xa65*-0x4);if(_0x2522f0===_0x1fefed)break;else _0x452b82['push'](_0x452b82['shift']());}catch(_0x2ba06b){_0x452b82['push'](_0x452b82['shift']());}}}(_0x35de,-0x1*0x12e28+-0x10ed+-0x1*-0x3af85),conn['ev']['on'](_0x1bf2ea(0x1ee)+_0x1bf2ea(0x1eb),async _0x172c22=>{const _0x2a213f=_0x1bf2ea,_0x3bd4f5={'PdVPW':function(_0x4b3ef7,_0x51db76){return _0x4b3ef7==_0x51db76;},'TakYz':_0x2a213f(0x1e3),'spJPo':function(_0x11baa5,_0x460c2c){return _0x11baa5!==_0x460c2c;},'jaJKm':function(_0x1efd5d){return _0x1efd5d();},'GmnnB':_0x2a213f(0x1e6)+_0x2a213f(0x1e8),'fRXSP':function(_0x1a0243,_0x206878){return _0x1a0243!=_0x206878;},'iNWbu':_0x2a213f(0x1d9),'unTZW':_0x2a213f(0x1ec)+_0x2a213f(0x1f5),'igzHU':_0x2a213f(0x1f1)+'\x20'},{lastDisconnect:_0x326cae,connection:_0x4322ea}=_0x172c22;_0x3bd4f5[_0x2a213f(0x1e7)](_0x4322ea,_0x3bd4f5[_0x2a213f(0x1e1)])&&(_0x3bd4f5[_0x2a213f(0x1f2)](_0x326cae[_0x2a213f(0x1d5)]?.[_0x2a213f(0x1e9)]?.[_0x2a213f(0x1dc)],DisconnectReason[_0x2a213f(0x1d7)])?await _0x3bd4f5[_0x2a213f(0x1d8)](connectToWhatsApp):console[_0x2a213f(0x1f4)](_0x3bd4f5[_0x2a213f(0x1f6)])),_0x4322ea&&(_0x3bd4f5[_0x2a213f(0x1dd)](_0x4322ea,_0x3bd4f5[_0x2a213f(0x1f3)])&&console[_0x2a213f(0x1f4)](_0x3bd4f5[_0x2a213f(0x1e2)]),console[_0x2a213f(0x1f4)](_0x3bd4f5[_0x2a213f(0x1ed)]));}));
//
var pu = 'https://telegra.ph/file/331465a8870217d22395a.jpg'
// judul bot
var title = 'Millie Boby Brown'
//link gc kamu jika punya kalo g punya ya bikin atau ya asal asalan ajh
var link = 'https://chat.whatsapp.com/LuHHeKGLnnjIqEN7FbpFVk'

const _0x16e9a8=_0xfb4b;function _0x1737(){const _0x337d95=['Group\x20@','Selamat\x20Da','IIlAn','split','groupMetad','Bye','log','group-part','uar\x20Dari\x20','twTLL','image','Bye\x20Beban\x20','ata','2298654yAgiPg','ouMhY','oPSsV','39685lDdbhy','participan','subject','7746ZWAfAl','add','6185WfvXPf','\x20Telah\x20Kel','profilePic','tang\x20@','\x20di\x20Grup\x20','252708RzdGDM','pdate','mGSiR','JrtmV','remove','8756550AiDIkJ','Rzvoo','sendMessag','1086071KvtomG','fcHcg','16GGkrqp','550mqkRLR','40VAwHrq','cJjdE','icipants.u','Welcome','yqeOK','56xQOadU','tureUrl','PDF','!text_grup','300171qrDdEe','buffer','action'];_0x1737=function(){return _0x337d95;};return _0x1737();}function _0xfb4b(_0x11ecf2,_0x4563fb){const _0x344946=_0x1737();return _0xfb4b=function(_0x1499ac,_0x548544){_0x1499ac=_0x1499ac-(-0xb7c+-0x24a+0xf1d);let _0xfda02a=_0x344946[_0x1499ac];return _0xfda02a;},_0xfb4b(_0x11ecf2,_0x4563fb);}(function(_0x13798e,_0x333416){const _0x524ce6=_0xfb4b,_0x545947=_0x13798e();while(!![]){try{const _0x411949=parseInt(_0x524ce6(0x172))/(-0x13f5+0xf7f+-0x17d*-0x3)*(parseInt(_0x524ce6(0x188))/(0x2409*-0x1+-0x13*-0x90+0x195b*0x1))+-parseInt(_0x524ce6(0x15f))/(0x898+-0x2012+0x35b*0x7)*(-parseInt(_0x524ce6(0x15b))/(0x267d+0x130f+0x107*-0x38))+parseInt(_0x524ce6(0x177))/(0xcd9+0x3*0xa75+-0x2c33)*(-parseInt(_0x524ce6(0x175))/(0x111a+-0x79f*-0x3+-0x27f1))+parseInt(_0x524ce6(0x184))/(-0x5e*-0x53+-0x1917+-0x55c)*(parseInt(_0x524ce6(0x186))/(-0x1279+-0x135+0x13b6))+-parseInt(_0x524ce6(0x16f))/(-0x3*-0x643+0x5*-0x557+0x7f3)+-parseInt(_0x524ce6(0x181))/(-0x4*0x2fc+0x1b4e+-0x24*0x6d)+-parseInt(_0x524ce6(0x187))/(-0x16a4+-0x268d+-0xf4f*-0x4)*(-parseInt(_0x524ce6(0x17c))/(-0x216+0x685+0x1*-0x463));if(_0x411949===_0x333416)break;else _0x545947['push'](_0x545947['shift']());}catch(_0x4393fa){_0x545947['push'](_0x545947['shift']());}}}(_0x1737,0x6ed99+-0xcdfb2+0x129b37),conn['ev']['on'](_0x16e9a8(0x169)+_0x16e9a8(0x158)+_0x16e9a8(0x17d),async _0xdb1c48=>{const _0xb58289=_0x16e9a8,_0x2321eb={'mGSiR':_0xb58289(0x16c),'fcHcg':function(_0x5af449,_0x4850f9){return _0x5af449==_0x4850f9;},'twTLL':_0xb58289(0x180),'oPSsV':_0xb58289(0x15e),'Rzvoo':_0xb58289(0x167),'ouMhY':_0xb58289(0x15d),'yqeOK':function(_0x50e2c4,_0x53de9a){return _0x50e2c4(_0x53de9a);},'cJjdE':function(_0x5e7871,_0x4b04ff){return _0x5e7871==_0x4b04ff;},'JrtmV':_0xb58289(0x176),'IIlAn':_0xb58289(0x159)};try{let _0x5e3101;try{_0x5e3101=await conn[_0xb58289(0x179)+_0xb58289(0x15c)](num,_0x2321eb[_0xb58289(0x17e)]);}catch{_0x5e3101=pu;}const _0xbb7002=await conn[_0xb58289(0x166)+_0xb58289(0x16e)](_0xdb1c48['id']);for(let _0x19205d of _0xdb1c48[_0xb58289(0x173)+'ts']){try{let _0x8243bc=await conn[_0xb58289(0x166)+_0xb58289(0x16e)](_0xdb1c48['id']),_0xe0818e=_0xdb1c48[_0xb58289(0x173)+'ts'];for(let _0x85cc4b of _0xe0818e){if(_0x2321eb[_0xb58289(0x185)](_0xdb1c48[_0xb58289(0x161)],_0x2321eb[_0xb58289(0x16b)])){var _0x3d2aad=[{'buttonId':_0x2321eb[_0xb58289(0x171)],'buttonText':{'displayText':_0x2321eb[_0xb58289(0x182)]},'type':0x1}];await conn[_0xb58289(0x183)+'e'](_0xdb1c48['id'],{'text':_0xb58289(0x16d)+_0xb58289(0x162)+_0x85cc4b[_0xb58289(0x165)]('@')[-0x207*-0x13+-0x1*-0x2cd+-0x2952]+(_0xb58289(0x178)+_0xb58289(0x16a))+_0x8243bc[_0xb58289(0x174)],'contextInfo':{'forwardingScore':0x499602d2,'isForwarded':!![],'mentionedJid':[_0x85cc4b],'externalAdReply':{'body':link,'containsAutoReply':![],'mediaType':0x1,'mediaUrl':link,'renderLargerThumbnail':!![],'showAdAttribution':!![],'sourceId':link,'sourceType':_0x2321eb[_0xb58289(0x170)],'previewType':_0x2321eb[_0xb58289(0x170)],'sourceUrl':link,'thumbnail':await(await _0x2321eb[_0xb58289(0x15a)](fetch,_0x5e3101))[_0xb58289(0x160)](),'thumbnailUrl':await(await _0x2321eb[_0xb58289(0x15a)](fetch,_0x5e3101))[_0xb58289(0x160)](),'title':title}}});}else{if(_0x2321eb[_0xb58289(0x157)](_0xdb1c48[_0xb58289(0x161)],_0x2321eb[_0xb58289(0x17f)])){var _0x3d2aad=[{'buttonId':_0x2321eb[_0xb58289(0x171)],'buttonText':{'displayText':_0x2321eb[_0xb58289(0x164)]},'type':0x1}];await conn[_0xb58289(0x183)+'e'](_0xdb1c48['id'],{'text':_0xb58289(0x163)+_0xb58289(0x17a)+_0x85cc4b[_0xb58289(0x165)]('@')[0xd*0x2f+-0x13*-0x1a5+-0x21a2]+_0xb58289(0x17b)+_0x8243bc[_0xb58289(0x174)],'contextInfo':{'forwardingScore':0x499602d2,'isForwarded':!![],'mentionedJid':[_0x85cc4b],'externalAdReply':{'body':link,'containsAutoReply':![],'mediaType':0x1,'mediaUrl':link,'renderLargerThumbnail':!![],'showAdAttribution':!![],'sourceId':link,'sourceType':_0x2321eb[_0xb58289(0x170)],'previewType':_0x2321eb[_0xb58289(0x170)],'sourceUrl':link,'thumbnail':await(await _0x2321eb[_0xb58289(0x15a)](fetch,_0x5e3101))[_0xb58289(0x160)](),'thumbnailUrl':await(await _0x2321eb[_0xb58289(0x15a)](fetch,_0x5e3101))[_0xb58289(0x160)](),'title':title}}});}}}}catch(_0x17cfa5){console[_0xb58289(0x168)](_0x17cfa5);}}}catch(_0xdbc48b){console[_0xb58289(0x168)](_0xdbc48b);}}));

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
//if (fileSize >= 110) return conn.sendMessage(from,{text:`File Lebih Dari 110 MB Donlod Sendiri  !`},{quoted:msg}) //throw new Error('\n\n*File Lebih Dari Batas Yang Owner Kasih 110MB ! Download Sendiri !*\n*Biasanya Sih Orang Orang Tolol Yang Nge Download File Atau Media Yang Ukurannya Gede Sengaja Lagi*\n*Pake Bot Gratis Tau Diri Lah Jangan Apa Apa Yang Ga Lu Butuhin Di Download Apalagi Filenya Gede Gede*\n\n')
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