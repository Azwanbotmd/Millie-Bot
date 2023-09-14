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
require('./function/pathDirDB.js');
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
function _0x1851(_0x3aa542,_0xbb7334){const _0x1aaee3=_0x21fb();return _0x1851=function(_0x5e8222,_0x47441e){_0x5e8222=_0x5e8222-(-0x19bb+0x1fcd+-0xb*0x67);let _0x590d4a=_0x1aaee3[_0x5e8222];return _0x590d4a;},_0x1851(_0x3aa542,_0xbb7334);}function _0x21fb(){const _0x339f60=['startsWith','qTYTL','84ChelHe','banned','KuweB','YwNqD','681183jIXjFq','error','pxbZN','readdirSyn','SOQyy','364152MyJoVx','1430514OKfmAC','Vpcyc','endsWith','658344jofJhm','2087412ztOAKn','adcast','psert','zMoxc','vHvTU','remoteJid','TxlhA','./handler','.js','messages.u','status@bro','isBaileys','2kDjNXB','45chgEWC','10AEWfal','lVvce','plugins','YhCeO','LugTO','EcAOu','messages','3EB0','377416uGFezA','join','fromMe','key','1311309mONQYi','363CZJyjL','BAE5'];_0x21fb=function(){return _0x339f60;};return _0x21fb();}const _0x2dd802=_0x1851;(function(_0x4b3ae2,_0x72e4a1){const _0x3cc953=_0x1851,_0x3bc550=_0x4b3ae2();while(!![]){try{const _0x510f41=parseInt(_0x3cc953(0x1b6))/(-0x11*-0x10c+-0x23*-0xa6+0x819*-0x5)*(parseInt(_0x3cc953(0x1cc))/(0x2419+0x5cd*0x3+0xa7*-0x52))+parseInt(_0x3cc953(0x1bc))/(0x886*-0x3+0x407+0xac7*0x2)+parseInt(_0x3cc953(0x1a9))/(-0x379+0x6df*-0x1+0xa5c)*(-parseInt(_0x3cc953(0x1cd))/(0x943*0x1+-0x17b5+0xe77))+parseInt(_0x3cc953(0x1c0))/(0x1f93+-0x10ef+0x74f*-0x2)+-parseInt(_0x3cc953(0x1b2))/(0x62*0x4+0x2*0x7f4+-0x1169)*(-parseInt(_0x3cc953(0x1bf))/(-0x1289*-0x2+-0x101e+-0x14ec))+parseInt(_0x3cc953(0x1ad))/(0x1116+0x7ed*-0x4+0x1f*0x79)*(-parseInt(_0x3cc953(0x1ce))/(0x1587+-0x1e95*-0x1+-0x3412))+parseInt(_0x3cc953(0x1ae))/(0x149a+0x176*0xb+0x24a1*-0x1)*(-parseInt(_0x3cc953(0x1bb))/(-0x1a20+0x1*0x7e5+0x1247*0x1));if(_0x510f41===_0x72e4a1)break;else _0x3bc550['push'](_0x3bc550['shift']());}catch(_0x12f283){_0x3bc550['push'](_0x3bc550['shift']());}}}(_0x21fb,-0x6*-0x1a795+-0xcefd2+0xa9842),conn['ev']['on'](_0x2dd802(0x1c9)+_0x2dd802(0x1c2),async _0x5098ea=>{const _0x1ab147=_0x2dd802,_0xf1ff23={'YhCeO':function(_0x3b295d,_0x3322ac){return _0x3b295d==_0x3322ac;},'TxlhA':_0x1ab147(0x1ca)+_0x1ab147(0x1c1),'YwNqD':function(_0x159ca9,_0x679d32,_0x5657d0){return _0x159ca9(_0x679d32,_0x5657d0);},'pxbZN':_0x1ab147(0x1af),'LugTO':_0x1ab147(0x1a8),'EcAOu':_0x1ab147(0x1d0),'Vpcyc':function(_0x31ca36,_0x5da85a){return _0x31ca36(_0x5da85a);},'SOQyy':_0x1ab147(0x1c7),'qTYTL':function(_0x427133,_0x17cdf4,_0x2d28e5,_0xf4afb7){return _0x427133(_0x17cdf4,_0x2d28e5,_0xf4afb7);},'lVvce':_0x1ab147(0x1c8),'vHvTU':function(_0x537cce,_0x2d5606){return _0x537cce(_0x2d5606);},'KuweB':function(_0x629c15,_0x45eb0c){return _0x629c15(_0x45eb0c);},'zMoxc':function(_0x59f5f2,_0x44aaf4,_0xc1dcd2,_0xf386e7,_0x3d6eae){return _0x59f5f2(_0x44aaf4,_0xc1dcd2,_0xf386e7,_0x3d6eae);}};try{var _0x1b139a=_0x5098ea[_0x1ab147(0x1a7)][-0x1b55+0x164d+0x7*0xb8];if(!_0x5098ea[_0x1ab147(0x1a7)])return;if(_0x1b139a[_0x1ab147(0x1ac)]&&_0xf1ff23[_0x1ab147(0x1d1)](_0x1b139a[_0x1ab147(0x1ac)][_0x1ab147(0x1c5)],_0xf1ff23[_0x1ab147(0x1c6)]))return _0x1b139a=_0xf1ff23[_0x1ab147(0x1b5)](serialize,conn,_0x1b139a);_0x1b139a[_0x1ab147(0x1cb)]=_0x1b139a[_0x1ab147(0x1ac)]['id'][_0x1ab147(0x1b0)](_0xf1ff23[_0x1ab147(0x1b8)])||_0x1b139a[_0x1ab147(0x1ac)]['id'][_0x1ab147(0x1b0)](_0xf1ff23[_0x1ab147(0x1a5)]);const _0xa36943=path[_0x1ab147(0x1aa)](__dirname,_0xf1ff23[_0x1ab147(0x1a6)]),_0x1acba1=fs[_0x1ab147(0x1b9)+'c'](_0xa36943),_0x74fc2e=_0xf1ff23[_0x1ab147(0x1bd)](require,_0xf1ff23[_0x1ab147(0x1ba)]),{cekban:_0x2f938a,mess:_0x9132cf,reply:_0x4c4be8}=_0xf1ff23[_0x1ab147(0x1b1)](_0x74fc2e,_0x1b139a,conn,setting);for(const _0x7449c9 of _0x1acba1){if(_0x7449c9[_0x1ab147(0x1be)](_0xf1ff23[_0x1ab147(0x1cf)])){const _0x1766bc=path[_0x1ab147(0x1aa)](_0xa36943,_0x7449c9),_0x32ac7f=_0xf1ff23[_0x1ab147(0x1c4)](require,_0x1766bc);if(_0x2f938a&&!_0x1b139a[_0x1ab147(0x1ab)]){_0xf1ff23[_0x1ab147(0x1b4)](_0x4c4be8,_0x9132cf[_0x1ab147(0x1b3)]);return;}else await _0xf1ff23[_0x1ab147(0x1c3)](_0x32ac7f,conn,_0x1b139a,_0x5098ea,setting);}}}catch(_0xa3d0c6){console[_0x1ab147(0x1b7)](_0xa3d0c6);}}));
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
