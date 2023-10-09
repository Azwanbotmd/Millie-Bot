process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.on('uncaughtException', console.error)
const { 
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,  
  downloadContentFromMessage,
  generateForwardMessageContent, 
  generateWAMessageFromContent,
  jidDecode,
 } = (await import('baileys-wa')).default
import fs from "fs"
import path from 'path'
import fetch from 'node-fetch'
import pino from 'pino'
import './lib/ObjectPath.js'
import './lib/FuncTerm.js'
//import './lib/cek.js'
import './lib/FuncListen.js'
//require('./lib/req.js');
import { 
  smsg, 
  fetchJson, 
  getBuffer 
 } from "./lib/func_Server.js"
import { nocache, 
  uncache 
 } from './lib/Chache_Data.js'
 
import { auto_BlockCaller } from './lib/Data_Server_Bot/Call_AutoBlock.js'
let setting = JSON.parse(fs.readFileSync('./config.json'));
(function(_0xe0bcb7,_0x51e3de){const _0x41dc1f=_0x5198,_0x409945=_0xe0bcb7();while(!![]){try{const _0x352351=-parseInt(_0x41dc1f(0x7f))/(0x1fe*-0x2+-0x1*0x31f+0x71c)+-parseInt(_0x41dc1f(0x83))/(0x1700+-0x1989*0x1+0x28b)+parseInt(_0x41dc1f(0x72))/(-0x2*0xf06+-0x17*-0xee+0x8ad)*(parseInt(_0x41dc1f(0x70))/(-0x262a+-0xb7e*0x2+0x3d2a))+parseInt(_0x41dc1f(0x77))/(0x39*-0x26+0x2305+-0x1a8a)*(-parseInt(_0x41dc1f(0x75))/(-0xa4e+0x275*0x5+-0x1f5))+parseInt(_0x41dc1f(0x7e))/(-0x1*-0x1079+0x51*0x9+-0x134b)*(-parseInt(_0x41dc1f(0x71))/(-0x1b20+-0x14*0x70+0x2*0x11f4))+parseInt(_0x41dc1f(0x73))/(-0xc*-0x24b+0x1*0x12aa+0x1*-0x2e25)+parseInt(_0x41dc1f(0x6f))/(0x523*0x6+-0xa7b+-0x144d);if(_0x352351===_0x51e3de)break;else _0x409945['push'](_0x409945['shift']());}catch(_0x2c2507){_0x409945['push'](_0x409945['shift']());}}}(_0x26c4,-0xcb49*0x1+-0xf6f16+0x1d730d));function _0x5198(_0x4aae75,_0x361cc5){const _0x1df194=_0x26c4();return _0x5198=function(_0x445895,_0x46e1a6){_0x445895=_0x445895-(0x14c3+0xc2*0xf+-0x1*0x1fb2);let _0x33ddb9=_0x1df194[_0x445895];return _0x33ddb9;},_0x5198(_0x4aae75,_0x361cc5);}let ramCheck=setInterval(()=>{const _0x3f4951=_0x5198,_0x5a4b96={'qAElI':function(_0x20b2d9,_0x27369c){return _0x20b2d9/_0x27369c;},'Nwmvs':function(_0x2708f1,_0x51c3ca){return _0x2708f1*_0x51c3ca;},'mYggq':function(_0x4a11ae,_0x1ffcc3){return _0x4a11ae>=_0x1ffcc3;},'BMlST':function(_0x2b776f,_0x3a0638){return _0x2b776f(_0x3a0638);},'FmsLc':_0x3f4951(0x82)};var _0x2ddee8=_0x5a4b96[_0x3f4951(0x7b)](process[_0x3f4951(0x79)+'e']()[_0x3f4951(0x81)],_0x5a4b96[_0x3f4951(0x7a)](-0x2*-0x7da+0x5*0x617+-0x2a27,0x949*-0x2+-0x1*-0x1ba5+0x1b1*-0x3));_0x5a4b96[_0x3f4951(0x7c)](_0x2ddee8,setting[_0x3f4951(0x78)])&&(_0x5a4b96[_0x3f4951(0x80)](clearInterval,ramCheck),process[_0x3f4951(0x7d)](_0x5a4b96[_0x3f4951(0x74)]));},-0x1428+0x144f*0x1+0x1361);function _0x26c4(){const _0x4a8c24=['56YSujAg','15pnKsAv','1572210ZFTsQB','FmsLc','5593584Bbzzxz','puTFY','5LiNLTW','ram','memoryUsag','Nwmvs','qAElI','mYggq','send','1244593maUcOo','739777wzDJnU','BMlST','rss','reset','3089894RlpdPJ','50466240sePudq','85396IGAZPQ'];_0x26c4=function(){return _0x4a8c24;};return _0x26c4();}const interval=(-0x1b13*0x1+0x1177+0x9ba)*(-0x2a*0x11+0x10ff*-0x1+0x1405)*(0x236a+0x89*-0x25+-0xbb5);setInterval(()=>{const _0x145003=_0x5198,_0x431160={'puTFY':_0x145003(0x82)};process[_0x145003(0x7d)](_0x431160[_0x145003(0x76)]);},interval);
import { imageToWebp, 
  videoToWebp, 
  writeExifImg, 
  writeExifVid 
 } from './lib/Exif_Write.js'
import { fileTypeFromBuffer } from 'file-type'
import { updateGroup } from "./lib/update_Group.js"
import store from './lib/store.js'
import { handler } from './handler.js'
let connectToWhatsApp = async () => { try {
let { state, saveCreds } = await useMultiFileAuthState('./sessions')
const conn = makeWASocket({
printQRInTerminal: true,
logger: pino({ level: 'silent' }),
browser: ['Millie Bot','Opera','5.0.0'],
auth: state,
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

conn.ev.on('messages.upsert', async chatUpdate => {
     try {
        var node = chatUpdate.messages[0]
        if (!node.message) return
        node.message = (Object.keys(node.message)[0] === 'ephemeralMessage') ? node.message.ephemeralMessage.message : node.message
        if (node.key && node.key.remoteJid === 'status@broadcast') return
        var m = await smsg(conn, node, store)
        await handler(conn, m, chatUpdate, store)
    } catch (err) {
        console.log(err)
    }
})

conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })
conn.ws.on('CB:call', async (json) => {
    auto_BlockCaller(json)
})
//state and group
function _0x2f67(_0x522599,_0x3c5691){const _0x1654bc=_0x152c();return _0x2f67=function(_0x12c83e,_0x1503bc){_0x12c83e=_0x12c83e-(-0x1720+0xe3+-0x7bb*-0x3);let _0x4bd46e=_0x1654bc[_0x12c83e];return _0x4bd46e;},_0x2f67(_0x522599,_0x3c5691);}const _0x2cc31b=_0x2f67;function _0x152c(){const _0x220a04=['action','.json','vDBbr','TkqLS','Bye','rputus...','connection','bCdYn','subject','parse','buffer','BfFJG','vmmoL','join','uar\x20Dari\x20','readFileSy','split','2194020gsOZNU','creds.upda','PYNTF','groupMetad','\x0aTelah\x20Kel','DNshj','jLBZh','link','PDF','HydpZ','3498820JsrQtj','Selamat\x20Da','log','.update','find','/group','add','668425uDtXbj','UPAgF','./database','close','welcome','xOAkA','catch','NBzAC','18pDeQTa','145372EFVdpB','participan','output','Group\x0a@','group','1942448zzMdli','1764343GMqOIT','existsSync','268nKTvKz','ata','BXLSG','icipants.u','pdate','!text_grup','loggedOut','profilePic','BctUO','statusCode','tang\x20@','Welcome','lSzSd','Koneksi\x20Te','\x20di\x20Grup\x20','error','18AzWpnI','sendMessag','CNEFM','group-part','MDTVf','FMNYU','Online','reply','tureUrl','thumbnail','remove','image','8412MTurtL','footer','Bye\x20Beban\x20'];_0x152c=function(){return _0x220a04;};return _0x152c();}(function(_0x20c692,_0x6927d){const _0xfc8ffc=_0x2f67,_0x38561e=_0x20c692();while(!![]){try{const _0x5cb23b=-parseInt(_0xfc8ffc(0x11a))/(0x14dd+-0x9*0x1c+-0x6a*0x30)+parseInt(_0xfc8ffc(0x122))/(0x9ca+0x22d3+-0x2c9b*0x1)*(-parseInt(_0xfc8ffc(0x13e))/(-0xa35+-0xa8d+0x199*0xd))+parseInt(_0xfc8ffc(0x100))/(-0x1760+0x1d69+0x43*-0x17)+-parseInt(_0xfc8ffc(0x111))/(0x24b3+-0x709+-0x1da5)*(-parseInt(_0xfc8ffc(0x132))/(-0x2cb*0xc+0x1229+0x1*0xf61))+-parseInt(_0xfc8ffc(0x120))/(0x10b0+-0x21d6+-0x1*-0x112d)+-parseInt(_0xfc8ffc(0x11f))/(0x7b7*-0x4+-0x7ed*0x2+-0xc1*-0x3e)*(-parseInt(_0xfc8ffc(0x119))/(-0x61f+-0x1ca3+0x22cb))+-parseInt(_0xfc8ffc(0x10a))/(-0x68e*0x1+0x266e*0x1+-0x32*0xa3);if(_0x5cb23b===_0x6927d)break;else _0x38561e['push'](_0x38561e['shift']());}catch(_0x22683a){_0x38561e['push'](_0x38561e['shift']());}}}(_0x152c,0x38d*-0x1fc+0x3567a+0x87897),conn['ev']['on'](_0x2cc31b(0xf5)+_0x2cc31b(0x10d),async _0x23f95d=>{const _0x1ada12=_0x2cc31b,_0x49fb67={'MDTVf':function(_0x17ef4a,_0x926f3c){return _0x17ef4a===_0x926f3c;},'BXLSG':_0x1ada12(0x114),'xOAkA':function(_0x4a60cc,_0x56e084){return _0x4a60cc!==_0x56e084;},'vmmoL':function(_0x2196ae){return _0x2196ae();},'BctUO':_0x1ada12(0x12f)+_0x1ada12(0xf4),'CNEFM':_0x1ada12(0x138)},{connection:_0x58c65a,lastDisconnect:_0x268681}=_0x23f95d;_0x49fb67[_0x1ada12(0x136)](_0x58c65a,_0x49fb67[_0x1ada12(0x124)])&&(_0x49fb67[_0x1ada12(0x116)](_0x268681[_0x1ada12(0x131)]?.[_0x1ada12(0x11c)]?.[_0x1ada12(0x12b)],DisconnectReason[_0x1ada12(0x128)])?_0x49fb67[_0x1ada12(0xfb)](connectToWhatsApp):console[_0x1ada12(0x10c)](_0x49fb67[_0x1ada12(0x12a)])),console[_0x1ada12(0x10c)](_0x49fb67[_0x1ada12(0x134)],_0x23f95d);}),conn['ev']['on'](_0x2cc31b(0x101)+'te',saveCreds),conn['ev']['on'](_0x2cc31b(0x135)+_0x2cc31b(0x125)+_0x2cc31b(0x126),async _0x46ffab=>{const _0x205e84=_0x2cc31b,_0x24d256={'PYNTF':_0x205e84(0x113)+_0x205e84(0x10f),'UPAgF':function(_0x6edb07){return _0x6edb07();},'DNshj':_0x205e84(0x13d),'FMNYU':function(_0x109fc2,_0x26bf41){return _0x109fc2==_0x26bf41;},'TkqLS':_0x205e84(0x13c),'vDBbr':_0x205e84(0x127),'bCdYn':_0x205e84(0x145),'lSzSd':_0x205e84(0x108),'NBzAC':function(_0x3821cd,_0x1cfb9f){return _0x3821cd(_0x1cfb9f);},'jLBZh':_0x205e84(0x110),'BfFJG':_0x205e84(0x12d),'HydpZ':function(_0x4a3d1f,_0x193de4){return _0x4a3d1f(_0x193de4);}},_0x5097c3=_0x24d256[_0x205e84(0x102)],_0x546850=path[_0x205e84(0xfc)](_0x5097c3,_0x46ffab['id']+_0x205e84(0x142));function _0x4687da(){const _0xdfe07d=_0x205e84;return fs[_0xdfe07d(0x121)](_0x546850)?JSON[_0xdfe07d(0xf8)](fs[_0xdfe07d(0xfe)+'nc'](_0x546850)):null;}const _0x425c78=_0x24d256[_0x205e84(0x112)](_0x4687da),_0x338593=_0x425c78[_0x205e84(0x10e)](_0x531540=>_0x531540['id']===_0x46ffab['id']);if(!_0x338593)return;if(!_0x338593[_0x205e84(0x115)])return;const _0x3552d0=setting[_0x205e84(0x13b)],_0xfacaf=setting[_0x205e84(0x13f)],_0x418e42=setting[_0x205e84(0x11e)][_0x205e84(0x107)];try{const _0x553f6c=await conn[_0x205e84(0x103)+_0x205e84(0x123)](_0x46ffab['id']);let _0x51cec4;for(let _0x56e23d of _0x46ffab[_0x205e84(0x11b)+'ts']){try{let _0x3a8db3=await conn[_0x205e84(0x103)+_0x205e84(0x123)](_0x46ffab['id']),_0x385a72=_0x46ffab[_0x205e84(0x11b)+'ts'];for(let _0x11e61b of _0x385a72){_0x51cec4=await conn[_0x205e84(0x129)+_0x205e84(0x13a)](_0x11e61b,_0x24d256[_0x205e84(0x105)])[_0x205e84(0x117)](_0x1305bf=>_0x3552d0);if(_0x24d256[_0x205e84(0x137)](_0x46ffab[_0x205e84(0x141)],_0x24d256[_0x205e84(0x144)])){var _0xe4314c=[{'buttonId':_0x24d256[_0x205e84(0x143)],'buttonText':{'displayText':_0x24d256[_0x205e84(0xf6)]},'type':0x1}];await conn[_0x205e84(0x133)+'e'](_0x46ffab['id'],{'text':_0x205e84(0x140)+_0x205e84(0x11d)+_0x11e61b[_0x205e84(0xff)]('@')[-0x1*0x248c+-0x187+0x2613]+(_0x205e84(0x104)+_0x205e84(0xfd))+_0x3a8db3[_0x205e84(0xf7)],'contextInfo':{'forwardingScore':0x499602d2,'isForwarded':!![],'mentionedJid':[_0x11e61b],'externalAdReply':{'body':_0x418e42,'containsAutoReply':![],'mediaType':0x1,'mediaUrl':_0x418e42,'renderLargerThumbnail':!![],'showAdAttribution':!![],'sourceId':_0x418e42,'sourceType':_0x24d256[_0x205e84(0x12e)],'previewType':_0x24d256[_0x205e84(0x12e)],'sourceUrl':_0x418e42,'thumbnail':await(await _0x24d256[_0x205e84(0x118)](fetch,_0x51cec4))[_0x205e84(0xf9)](),'thumbnailUrl':await(await _0x24d256[_0x205e84(0x118)](fetch,_0x51cec4))[_0x205e84(0xf9)](),'title':_0xfacaf}}});}else{if(_0x24d256[_0x205e84(0x137)](_0x46ffab[_0x205e84(0x141)],_0x24d256[_0x205e84(0x106)])){var _0xe4314c=[{'buttonId':_0x24d256[_0x205e84(0x143)],'buttonText':{'displayText':_0x24d256[_0x205e84(0xfa)]},'type':0x1}];await conn[_0x205e84(0x133)+'e'](_0x46ffab['id'],{'text':_0x205e84(0x10b)+_0x205e84(0x12c)+_0x11e61b[_0x205e84(0xff)]('@')[-0xd8a+0x1*-0x9e3+0x176d]+_0x205e84(0x130)+_0x3a8db3[_0x205e84(0xf7)],'contextInfo':{'forwardingScore':0x499602d2,'isForwarded':!![],'mentionedJid':[_0x11e61b],'externalAdReply':{'body':_0x418e42,'containsAutoReply':![],'mediaType':0x1,'mediaUrl':_0x418e42,'renderLargerThumbnail':!![],'showAdAttribution':!![],'sourceId':_0x418e42,'sourceType':_0x24d256[_0x205e84(0x12e)],'previewType':_0x24d256[_0x205e84(0x12e)],'sourceUrl':_0x418e42,'thumbnail':await(await _0x24d256[_0x205e84(0x109)](fetch,_0x51cec4))[_0x205e84(0xf9)](),'thumbnailUrl':await(await _0x24d256[_0x205e84(0x109)](fetch,_0x51cec4))[_0x205e84(0xf9)](),'title':_0xfacaf}}});}}}}catch(_0x375b22){console[_0x205e84(0x10c)](_0x375b22),msg[_0x205e84(0x139)](_0x375b22);}}}catch(_0x38e8a4){console[_0x205e84(0x10c)](_0x38e8a4),msg[_0x205e84(0x139)](_0x38e8a4);}}));

conn.ev.on('group-update', async (anu) => {
    updateGroup(conn, anu, MessageType)
})

conn.sendImage = async (jid, path, caption = '', quoted = '', options) => {
    let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    return await conn.sendMessage(jid, {
        image: buffer,
        caption: caption,
        ...options
    }, {
        quoted
    })
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
//buffer
const _0x233049=_0x24fc;(function(_0x4c6bf8,_0x4ec2a0){const _0x1a9d45=_0x24fc,_0x4cca76=_0x4c6bf8();while(!![]){try{const _0x3c8ff2=parseInt(_0x1a9d45(0x132))/(0x1afc+-0x65*0x2b+-0xa04)*(parseInt(_0x1a9d45(0x164))/(0x1853+0x23f7+-0x3c48))+-parseInt(_0x1a9d45(0x16a))/(-0x1989+0x1*0x211c+0x790*-0x1)+parseInt(_0x1a9d45(0x16d))/(-0x1a32+0x245b+-0xa25)*(parseInt(_0x1a9d45(0x153))/(-0x1*0x185f+-0x3*-0x8a6+0x2*-0xc7))+parseInt(_0x1a9d45(0x16f))/(-0xf3*0xd+0x1041*-0x1+0x1c9e)*(-parseInt(_0x1a9d45(0x144))/(0x11df+-0x14+-0x471*0x4))+parseInt(_0x1a9d45(0x14f))/(0x167*-0x16+0x4*0x4e9+0xb3e)*(parseInt(_0x1a9d45(0x15a))/(-0x26*0x47+0x2649+-0xddb*0x2))+-parseInt(_0x1a9d45(0x15c))/(-0x2310+-0xa19+-0x13*-0x261)+-parseInt(_0x1a9d45(0x149))/(-0xd*0x2b+0xb77+-0x93d)*(parseInt(_0x1a9d45(0x171))/(0x17*-0x1af+0x2161*-0x1+0x1*0x4826));if(_0x3c8ff2===_0x4ec2a0)break;else _0x4cca76['push'](_0x4cca76['shift']());}catch(_0x3a1f2a){_0x4cca76['push'](_0x4cca76['shift']());}}}(_0x5225,-0x36bfe+-0x16f3*0x68+0x2*0x99f5c));function _0x24fc(_0x5a49b3,_0x5baa1a){const _0x585fb6=_0x5225();return _0x24fc=function(_0x20e604,_0x18fa0e){_0x20e604=_0x20e604-(-0x1*0x124a+0x1004+0x378);let _0x17a2c8=_0x585fb6[_0x20e604];return _0x17a2c8;},_0x24fc(_0x5a49b3,_0x5baa1a);}const getFile=async _0x3ee777=>{const _0x1f4465=_0x24fc,_0x32a6a6={'HQEqh':function(_0x27acf6,_0x162ea8){return _0x27acf6(_0x162ea8);},'JRQmO':function(_0xab0ef0,_0x2d1a73){return _0xab0ef0(_0x2d1a73);},'uEHvd':_0x1f4465(0x15b)+_0x1f4465(0x160)+'er','cMYIX':_0x1f4465(0x140)+_0x1f4465(0x156)+_0x1f4465(0x15f),'bAREU':_0x1f4465(0x141)};let _0x2db663=Buffer[_0x1f4465(0x15d)](_0x3ee777)?_0x3ee777:_0x32a6a6[_0x1f4465(0x14e)](isUrl,_0x3ee777)?await(await _0x32a6a6[_0x1f4465(0x14b)](fetch,_0x3ee777))[_0x1f4465(0x142)]():fs[_0x1f4465(0x151)](_0x3ee777)?fs[_0x1f4465(0x170)+'nc'](_0x3ee777):/^data:.*?\/.*?;base64,/i[_0x1f4465(0x150)](_0x3ee777)?Buffer[_0x1f4465(0x14c)](_0x3ee777[_0x1f4465(0x165)](',')[0xb3f+-0x113*-0x1d+-0x2a65]):null;if(!_0x2db663)return new Error(_0x32a6a6[_0x1f4465(0x13f)]);let _0x1c57ba=await _0x32a6a6[_0x1f4465(0x14e)](fileTypeFromBuffer,_0x2db663)||{'mime':_0x32a6a6[_0x1f4465(0x154)],'ext':_0x32a6a6[_0x1f4465(0x172)]};return{'data':_0x2db663,..._0x1c57ba};};function _0x5225(){const _0x5b15e6=['uEHvd','applicatio','.ts','buffer','xYwvJ','2187563pjvAOb','ueOXF','sticker','image','mbPvp','1022978upKtzS','jpg','JRQmO','from','QVjud','HQEqh','2788560eQTquX','test','existsSync','ptt','26060CprPOQ','cMYIX','jpeg','n/octet-st','audio','mimetype','data','18OPCRry','Result\x20is\x20','601080YSeXir','isBuffer','eadek','ream','not\x20a\x20buff','webp','PeibA','NGdhe','12gUNvUk','split','ext','RxaTt','png','xBNiG','1219821bnMwZR','PjGiU','mIhbE','168ZxQrYy','sendMessag','6RaRJSe','readFileSy','12FqMMMh','bAREU','63694mTQuwf','document','mp3','tFQSS','mp4','video','IanuQ','jpzRg','UqegB','audio/mpeg','LzPpw','sendFile','aQXOR'];_0x5225=function(){return _0x5b15e6;};return _0x5225();}conn[_0x233049(0x13d)]=async(_0x3db129,_0x1e4744,_0x2d5fff={})=>{const _0x3ee886=_0x233049,_0x24861e={'IanuQ':function(_0x25e10f,_0x132580){return _0x25e10f(_0x132580);},'tFQSS':function(_0x149b42,_0x2d77ce){return _0x149b42==_0x2d77ce;},'xBNiG':_0x3ee886(0x134),'xYwvJ':_0x3ee886(0x157),'ueOXF':_0x3ee886(0x13b),'LzPpw':_0x3ee886(0x14a),'PjGiU':function(_0x124db0,_0xefedbc){return _0x124db0==_0xefedbc;},'RxaTt':_0x3ee886(0x155),'UqegB':function(_0x1f6896,_0x6cb136){return _0x1f6896==_0x6cb136;},'eadek':_0x3ee886(0x168),'jpzRg':_0x3ee886(0x147),'QVjud':function(_0x5f5c85,_0x4dc8d0){return _0x5f5c85==_0x4dc8d0;},'NGdhe':_0x3ee886(0x161),'mbPvp':_0x3ee886(0x146),'aQXOR':_0x3ee886(0x136),'mIhbE':_0x3ee886(0x137),'PeibA':_0x3ee886(0x133)};let _0x5e8349=await _0x24861e[_0x3ee886(0x138)](getFile,_0x1e4744),_0xfd1dfd=_0x5e8349[_0x3ee886(0x166)],_0x180b8a;if(_0x24861e[_0x3ee886(0x135)](_0xfd1dfd,_0x24861e[_0x3ee886(0x169)]))_0x180b8a=_0x24861e[_0x3ee886(0x143)],_0x2d5fff[_0x3ee886(0x158)]=_0x24861e[_0x3ee886(0x145)],_0x2d5fff[_0x3ee886(0x152)]=_0x2d5fff[_0x3ee886(0x152)]||![];else{if(_0x24861e[_0x3ee886(0x135)](_0xfd1dfd,_0x24861e[_0x3ee886(0x13c)])||_0x24861e[_0x3ee886(0x16b)](_0xfd1dfd,_0x24861e[_0x3ee886(0x167)])||_0x24861e[_0x3ee886(0x13a)](_0xfd1dfd,_0x24861e[_0x3ee886(0x15e)]))_0x180b8a=_0x24861e[_0x3ee886(0x139)];else{if(_0x24861e[_0x3ee886(0x14d)](_0xfd1dfd,_0x24861e[_0x3ee886(0x163)]))_0x180b8a=_0x24861e[_0x3ee886(0x148)];else{if(_0x24861e[_0x3ee886(0x13a)](_0xfd1dfd,_0x24861e[_0x3ee886(0x13e)]))_0x180b8a=_0x24861e[_0x3ee886(0x16c)];else _0x180b8a=_0x24861e[_0x3ee886(0x162)];}}}return conn[_0x3ee886(0x16e)+'e'](_0x3db129,{[_0x180b8a]:_0x5e8349[_0x3ee886(0x159)],..._0x2d5fff},{..._0x2d5fff});};

conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, {
    text: text,
    ...options
}, {
    quoted
})
   
conn.downloadAndSaveMediaMessage = async (msg, type_file, path_file) => {
    if (type_file === 'image') {
        var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return path_file
    } else if (type_file === 'video') {
        var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return path_file
    } else if (type_file === 'sticker') {
        var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return path_file
    } else if (type_file === 'audio') {
        var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return path_file
    }
}

conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
        buffer = await writeExifImg(buff, options)
    } else {
        buffer = await imageToWebp(buff)
    }
    await conn.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        .then(response => {

            return response
        })
}

conn.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(message, messageType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
    }
    return buffer
}

conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
        buffer = await writeExifVid(buff, options)
    } else {
        buffer = await videoToWebp(buff)
    }
    await conn.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        .then(response => {

            return response
        })
   }
    return conn
} catch (error) {
    console.error(error);
  }
}

connectToWhatsApp();