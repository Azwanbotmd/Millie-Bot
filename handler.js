process.on('uncaughtException', console.error)
const { exec } = require("child_process");
const { color } = require('./function/Data_Server_Bot/Console_Data')
const { isUrl, getGroupAdmins, bytesToSize, sleep , makeid } = require("./function/func_Server");
const { dbPlus, dbMinus, getProfileData, checkLimitUser, addLimitUser, addBannedUser, addPremiumUser, resetLimits, confirmclaim, Hour, Uang, Kupon, checkBannedUser, checkRegisteredUser, registering, checkPremiumUser, switchGroup } = require("./function/database.js");
const { setting_JSON, mess_JSON } = require('./function/Data_Location.js')
const { webp2mp4File } = require("./function/Webp_Tomp4");
const fs = require("fs");
const path = require("path");
const util = require('util')
const colors = require('colors/safe');
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async (conn, msg, setting) => { try {
const setting = setting_JSON
const mess = mess_JSON
const { owner, ownerNumber, botName, contact, ownerName, footer } = setting
const { type, quotedMsg, mentioned, from, chat, now, fromMe, sender } = msg
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const time = moment(new Date()).format("HH:mm");
let chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (chats == undefined) { chats = '' }

const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const isOwner = setting.ownerNumber.includes(msg.sender);
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const args = body.trim().split(/ +/).slice(1);
const text = args.join(" ");
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'

const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(msg.sender);
const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []
  
const quoted = msg.quoted ? msg.quoted : msg
const isQuotedMsg = (type == 'extendedTextMessage');
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false    
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isVideo = (type == 'videoMessage')
const isImage = (type == 'imageMessage')
const isSticker = (type == 'stickerMessage')
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const mime = (quoted.msg || quoted).mimetype || ''
  
var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''

const sendContact = (jid, numbers, name, quoted, mn) => {
let number = setting.contact
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + setting.ownerName + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return conn.sendMessage(msg.chat, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}
getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`
}

// Data Awal
const welcome = true // false untuk tidak aktif, true untuk aktif welcome nya dan untuk on offinya di plugin enable welcome, antilink nyusul , kalo kamu bisa buat ajh sndri pluginya pake regex kalo ya kalo bisa klo engga ya nunggu aku hehe
const antilink = true
const limit = 3
const uang = 2000
const kupon = 5
const level = 1


// Budy
function _0x5a1f(_0x566b9d,_0x21edec){const _0x245d7e=_0x3651();return _0x5a1f=function(_0x1c5118,_0x1dee2b){_0x1c5118=_0x1c5118-(0x1b2b*-0x1+-0x1fb6+-0x1*-0x3b9a);let _0x1c7792=_0x245d7e[_0x1c5118];return _0x1c7792;},_0x5a1f(_0x566b9d,_0x21edec);}const _0x326251=_0x5a1f;(function(_0x38249b,_0x492b78){const _0x176c14=_0x5a1f,_0x462608=_0x38249b();while(!![]){try{const _0x3f0982=parseInt(_0x176c14(0xc8))/(0x1*-0x2093+0x1*-0x1822+0x38b6)+parseInt(_0x176c14(0xca))/(0x1*-0x2043+-0x1b49+0x3b8e)+-parseInt(_0x176c14(0xc9))/(-0x5f*-0x5f+-0x1158+-0x11e6)+-parseInt(_0x176c14(0xc1))/(0xfef+0x10a0+-0x3*0xad9)*(parseInt(_0x176c14(0xc6))/(-0x262c*0x1+-0x770+-0x1*-0x2da1))+parseInt(_0x176c14(0xbf))/(0x1a52+0x1882*-0x1+0x1ca*-0x1)*(parseInt(_0x176c14(0xb9))/(0xf2+-0x1*-0x2444+-0xc65*0x3))+-parseInt(_0x176c14(0xc5))/(-0x57b+-0x22a9*0x1+0x1*0x282c)+-parseInt(_0x176c14(0xbc))/(0x1cc7+0x35*0x71+-0x1*0x3423)*(-parseInt(_0x176c14(0xbd))/(-0x7c3*-0x3+0x2*-0x10b1+0xf*0xad));if(_0x3f0982===_0x492b78)break;else _0x462608['push'](_0x462608['shift']());}catch(_0x1a1bef){_0x462608['push'](_0x462608['shift']());}}}(_0x3651,0x3*0x2ccc5+-0x10369d+0x127bd5));if(body[_0x326251(0xcb)]('=>')){if(!isOwner)return msg[_0x326251(0xbb)](mess[_0x326251(0xc7)]);function Return(_0x4bbf04){const _0x3c18d9=_0x326251,_0x31f2d7={'frFCN':function(_0x424ea7,_0x1f8546){return _0x424ea7==_0x1f8546;}};return sat=JSON[_0x3c18d9(0xcd)](_0x4bbf04,null,-0x45b+0x197e+-0x70b*0x3),bang=util[_0x3c18d9(0xc0)](sat),_0x31f2d7[_0x3c18d9(0xc3)](sat,undefined)&&(bang=util[_0x3c18d9(0xc0)](_0x4bbf04)),msg[_0x3c18d9(0xbb)](bang);}try{msg[_0x326251(0xbb)](util[_0x326251(0xc0)](eval(_0x326251(0xc2)+_0x326251(0xba)+'n\x20'+body[_0x326251(0xcc)](0x77f*0x5+0x1369+-0x38e1*0x1)+_0x326251(0xbe))));}catch(_0x1b3012){msg[_0x326251(0xbb)](String(_0x1b3012));}}if(body[_0x326251(0xcb)]('>')){if(!isOwner)return msg[_0x326251(0xbb)](mess[_0x326251(0xc7)]);try{let evaled=await eval(body[_0x326251(0xcc)](0x21f6+0xb*-0x1c4+-0xe88));if(typeof evaled!==_0x326251(0xc4))evaled=require(_0x326251(0xce))[_0x326251(0xcf)](evaled);msg[_0x326251(0xbb)](evaled);}catch(_0x36ba49){msg[_0x326251(0xbb)](String(_0x36ba49));}}if(body[_0x326251(0xcb)]('$')){if(!isOwner)return msg[_0x326251(0xbb)](mess[_0x326251(0xc7)]);try{exec(body[_0x326251(0xcc)](0x7b4*0x4+-0x16*-0x11e+-0x3762),(_0x50a03c,_0x539640)=>{const _0x1ce3df=_0x326251;if(_0x50a03c)return msg[_0x1ce3df(0xbb)](_0x50a03c);if(_0x539640)return msg[_0x1ce3df(0xbb)](_0x539640);});}catch(_0x56651d){msg[_0x326251(0xbb)](String(_0x56651d));}}function _0x3651(){const _0x2cfe64=['format','12FfhQVj','(async\x20()\x20','frFCN','string','884208kMNLEb','1843245QDrOob','OnlyOwner','718365rSLFwf','2075955Sjjfgr','2144666LZkYwu','startsWith','slice','stringify','util','inspect','91GOnNTg','=>\x20{\x20retur','reply','2691414vIMQZr','10XeBSUU','\x20})()','239070Jcqnfo'];_0x3651=function(){return _0x2cfe64;};return _0x3651();}
//########################################## //
const _0x1560f5=_0x511b;(function(_0xcc3590,_0x1f845b){const _0xde6f54=_0x511b,_0xb2bb7a=_0xcc3590();while(!![]){try{const _0x5a6d63=-parseInt(_0xde6f54(0xcf))/(0x2346+0x1e2f*-0x1+-0xba*0x7)*(-parseInt(_0xde6f54(0xd2))/(0x2296+-0x427*0x1+0x1*-0x1e6d))+parseInt(_0xde6f54(0xeb))/(-0xe83*0x1+-0x23bf+0x3245)*(parseInt(_0xde6f54(0xe2))/(0x2581*-0x1+0x645*-0x6+0x4b23))+-parseInt(_0xde6f54(0xf3))/(0x2c0*-0xb+-0x2b0*-0x2+0x1*0x18e5)+parseInt(_0xde6f54(0xd1))/(0x2*0x2f9+-0x2b7*-0x2+-0xb5a)*(-parseInt(_0xde6f54(0xfe))/(0xcec+-0x14bc+0x7d7))+parseInt(_0xde6f54(0xe0))/(0xb*0x321+0x2576+-0x47d9)*(parseInt(_0xde6f54(0xe5))/(0x2b*-0x85+-0xf*0x17c+0x2ca4))+-parseInt(_0xde6f54(0xd0))/(0x17f0+0x2*-0x3f5+-0xffc)*(-parseInt(_0xde6f54(0x106))/(-0x5*-0x17b+0x1*-0x18a5+0x1149))+-parseInt(_0xde6f54(0x105))/(0xb15+-0x20ca*0x1+0x15c1)*(parseInt(_0xde6f54(0xd5))/(0x1*-0x164a+0xad*0x1f+0x164));if(_0x5a6d63===_0x1f845b)break;else _0xb2bb7a['push'](_0xb2bb7a['shift']());}catch(_0x51d736){_0xb2bb7a['push'](_0xb2bb7a['shift']());}}}(_0x3008,0x131e7f+-0x12bade*0x1+0xa9d02),conn[_0x1560f5(0xe4)+'es']([msg[_0x1560f5(0x10d)]]),conn[_0x1560f5(0xf7)+_0x1560f5(0xfd)](_0x1560f5(0xf8),msg[_0x1560f5(0xcd)]));const loadUserData=(_0xa8b762,_0x26088b)=>{const _0x530629=_0x1560f5,_0x50a1f2={'zsIMx':function(_0x196b37,_0x243f37){return _0x196b37===_0x243f37;},'BRqVP':_0x530629(0x104),'hHdSf':_0x530629(0xc3),'IchEW':_0x530629(0xd7)+_0x530629(0x10e)},_0x4b61d4=_0xa8b762[_0x530629(0x108)]('@')[0x13*0xf8+-0xdb*0xf+-0x593]+_0x530629(0xd6),_0x1dfea5=path[_0x530629(0x103)](_0x50a1f2[_0x530629(0x102)],_0x4b61d4);fs[_0x530629(0xc5)](_0x1dfea5,_0x50a1f2[_0x530629(0x10f)],(_0x12d22a,_0x32714a)=>{const _0x519194=_0x530629;if(_0x12d22a){if(_0x50a1f2[_0x519194(0xf5)](_0x12d22a[_0x519194(0x10c)],_0x50a1f2[_0x519194(0xec)])){const _0xed42ba={'id':_0xa8b762,'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''},_0x32de15=[_0xed42ba];fs[_0x519194(0xd8)](_0x1dfea5,JSON[_0x519194(0xc9)](_0x32de15,null,-0x1c11+0x1673+0x5a0),_0x50a1f2[_0x519194(0x10f)],_0x5683a4=>{if(_0x5683a4)return;});}else{}return;}let _0x565f2e=JSON[_0x519194(0xda)](_0x32714a);const _0x3c5f66=_0x565f2e[_0x519194(0xf9)](_0x317657=>_0x317657['id']===_0xa8b762);if(!_0x3c5f66){const _0x27a63b={'id':_0xa8b762,'registered':![],'user':!![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};_0x565f2e[_0x519194(0xce)](_0x27a63b),fs[_0x519194(0xd8)](_0x1dfea5,JSON[_0x519194(0xc9)](_0x565f2e,null,0x34*-0x7+0xde1*0x1+-0xc73),_0x50a1f2[_0x519194(0x10f)],_0x5110ca=>{if(_0x5110ca)return;});}});},users=[];for(let i=0x1*-0x177+-0x8be+0xa35;i<-0x18f6+0xc5*-0x29+0x388e;i++){const user={'sender':msg[_0x1560f5(0xde)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};users[_0x1560f5(0xce)](user);}const userDir=_0x1560f5(0xd7)+_0x1560f5(0x10e);function _0x3008(){const _0x15efcb=['readFile','Private','wyVlL','writeFileS','stringify','.js','reply','blue','chat','push','22HgbvMg','50Vvlejc','3186pdMsJU','21548WcrniS','length','log','9600617ElnbmQ','.json','./database','writeFile','ueaRh','parse','bold','/group','white','sender','existsSync','34928FnavPN','object','2473244iXlwqJ','readdirSyn','readMessag','2493yNTIOj','brightCyan','from','chalk','fromMe','amount','3ejofAh','BRqVP','Group','\x20Limit\x20Ter','banned','readFileSy','endsWith','black','3511055aCTmUs','green','zsIMx','kupon','sendPresen','composing','find','LTBtO','plugins','forEach','ceUpdate','4319BlSRuT','pakai\x20√','uang','wJesA','IchEW','join','ENOENT','12ocaUjx','934307GZowke','ync','split','bgWhite','limit','QpTkX','code','key','/userdata','hHdSf','mkdirSync','utf8','function'];_0x3008=function(){return _0x15efcb;};return _0x3008();}!fs[_0x1560f5(0xdf)](userDir)&&fs[_0x1560f5(0x110)](userDir);for(let i=0x22ee+0x1a27+-0x3d15;i<users[_0x1560f5(0xd3)];i++){const user=users[i];loadUserData(user[_0x1560f5(0xde)],user[_0x1560f5(0xea)]);}const groupFolderPath=_0x1560f5(0xd7)+_0x1560f5(0xdc),groupFilePath=path[_0x1560f5(0x103)](groupFolderPath,groupId+_0x1560f5(0xd6));let groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink}];function saveGroupData(){const _0x1ef737=_0x1560f5;!fs[_0x1ef737(0xdf)](groupFilePath)&&fs[_0x1ef737(0xc8)+_0x1ef737(0x107)](groupFilePath,JSON[_0x1ef737(0xc9)](groupData,null,-0xdef+0x237*-0xf+0x2f2a));}function readGroupData(){const _0x203ca0=_0x1560f5;fs[_0x203ca0(0xdf)](groupFilePath)&&(groupData=JSON[_0x203ca0(0xda)](fs[_0x203ca0(0xf0)+'nc'](groupFilePath)));}function readAntilink(){const _0x2105e7=_0x1560f5;return fs[_0x2105e7(0xdf)](groupFilePath)?JSON[_0x2105e7(0xda)](fs[_0x2105e7(0xf0)+'nc'](groupFilePath)):null;}function _0x511b(_0x1cac3e,_0x567d5d){const _0x4d75bd=_0x3008();return _0x511b=function(_0x1b1a10,_0x5812f6){_0x1b1a10=_0x1b1a10-(0x18a*-0x17+0x19fc+0xa2d);let _0xce73ec=_0x4d75bd[_0x1b1a10];return _0xce73ec;},_0x511b(_0x1cac3e,_0x567d5d);}const groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x1560f5(0xf9)](_0x4d84f0=>_0x4d84f0['id']===msg[_0x1560f5(0xcd)]);saveGroupData(),readGroupData(),readAntilink();const ceklimit=checkLimitUser(sender)<=0x67*-0x4f+-0x8ea+0x28b3,addLimit=addLimitUser,addBanned=addBannedUser,addPremium=addPremiumUser,confirmlimit=(_0x3ff46b,_0x406d4e)=>{const _0x3fb9bd=_0x1560f5,_0x5bb5cd={'LTBtO':function(_0x2d692e,_0x2ad828){return _0x2d692e===_0x2ad828;},'wyVlL':_0x3fb9bd(0xd7)+_0x3fb9bd(0x10e),'QpTkX':function(_0x4c2148,_0x321041){return _0x4c2148!==_0x321041;}},_0x369f10=_0x3ff46b[_0x3fb9bd(0x108)]('@')[-0xe*-0x1ab+-0x23cb+0xc71]+_0x3fb9bd(0xd6),_0x1289d8=path[_0x3fb9bd(0x103)](_0x5bb5cd[_0x3fb9bd(0xc7)],_0x369f10);let _0xd7d48c=JSON[_0x3fb9bd(0xda)](fs[_0x3fb9bd(0xf0)+'nc'](_0x1289d8)),_0x26341e=-(0x185c+-0x2ab*-0xd+-0x3b0a);_0xd7d48c[_0x3fb9bd(0xfc)]((_0x3f328d,_0x105679)=>{const _0x298dab=_0x3fb9bd;_0x5bb5cd[_0x298dab(0xfa)](_0x3f328d['id'],_0x3ff46b)&&(_0x26341e=_0x105679);}),_0x5bb5cd[_0x3fb9bd(0x10b)](_0x26341e,-(-0x24a6+-0x9f8*-0x2+-0x185*-0xb))&&(_0xd7d48c[_0x26341e][_0x3fb9bd(0x10a)]-=_0x406d4e,fs[_0x3fb9bd(0xc8)+_0x3fb9bd(0x107)](_0x1289d8,JSON[_0x3fb9bd(0xc9)](_0xd7d48c,null,-0x1476+0x128e+-0xa*-0x31)),msg[_0x3fb9bd(0xcb)](_0x406d4e+(_0x3fb9bd(0xee)+_0x3fb9bd(0xff))));},limitnya=await confirmlimit,claim=await confirmclaim,isBanned=checkBannedUser(sender),isRegister=checkRegisteredUser(sender),isPremium=checkPremiumUser(sender),checkUangUser=_0x31d3bc=>{const _0x22c633=_0x1560f5,_0x309475={'ueaRh':_0x22c633(0xd7)+_0x22c633(0x10e)},_0x34f4cb=_0x31d3bc[_0x22c633(0x108)]('@')[-0x14e9+0xa13+0xad6]+_0x22c633(0xd6),_0x5bc255=path[_0x22c633(0x103)](_0x309475[_0x22c633(0xd9)],_0x34f4cb);try{const _0x5f7122=JSON[_0x22c633(0xda)](fs[_0x22c633(0xf0)+'nc'](_0x5bc255)),_0x291ee9=_0x5f7122[_0x22c633(0xf9)](_0x1c5963=>_0x1c5963['id']===_0x31d3bc);return _0x291ee9?_0x291ee9[_0x22c633(0x100)]:![];}catch(_0x12a42d){return![];}},cekuang=checkUangUser(sender)<=-0x3e5*-0x1+0x1d3e+-0x2119,checkKuponUser=_0x42c357=>{const _0x107f2a=_0x1560f5,_0x394951={'wJesA':_0x107f2a(0xd7)+_0x107f2a(0x10e)},_0x559b65=_0x42c357[_0x107f2a(0x108)]('@')[-0x9a8+0x595*0x2+-0xc1*0x2]+_0x107f2a(0xd6),_0x3b396f=path[_0x107f2a(0x103)](_0x394951[_0x107f2a(0x101)],_0x559b65);try{const _0x2c9aed=JSON[_0x107f2a(0xda)](fs[_0x107f2a(0xf0)+'nc'](_0x3b396f)),_0x582c0e=_0x2c9aed[_0x107f2a(0xf9)](_0x2239bf=>_0x2239bf['id']===_0x42c357);return _0x582c0e?_0x582c0e[_0x107f2a(0xf6)]:![];}catch(_0x1d1015){return![];}},cekkupon=checkKuponUser(sender)<=0x94*0x5+0x1*0x3d7+0x1*-0x6bb,pluginsFolderPath=path[_0x1560f5(0x103)](__dirname,_0x1560f5(0xfb)),pluginFiles=fs[_0x1560f5(0xe3)+'c'](pluginsFolderPath);for(const file of pluginFiles){if(file[_0x1560f5(0xf1)](_0x1560f5(0xca))){const pluginFilePath=path[_0x1560f5(0x103)](pluginsFolderPath,file),pluginModule=require(pluginFilePath);if(typeof pluginModule['on']===_0x1560f5(0xc4)||typeof pluginModule['on']===_0x1560f5(0xe1)){const isBanned=checkBannedUser(sender);if(isBanned&&!msg[_0x1560f5(0xe9)]){msg[_0x1560f5(0xcb)](mess[_0x1560f5(0xef)]);break;}else await pluginModule['on'](msg,{'conn':conn,'command':command,'prefix':prefix,'args':args,'text':text,'setting':setting,'limitnya':limitnya,'ceklimit':ceklimit,'sendContact':sendContact,'checkLimitUser':checkLimitUser,'mess':mess,'dbPlus':dbPlus,'dbMinus':dbMinus,'claim':claim,'addLimit':addLimit,'isRegister':isRegister,'registering':registering,'makeid':makeid,'isOwner':isOwner,'isGroup':isGroup,'resetLimits':resetLimits,'addBanned':addBanned,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'isPremium':isPremium,'addPremium':addPremium,'addPremiumUser':addPremiumUser,'isImage':isImage,'isQuotedImage':isQuotedImage,'isQuotedSticker':isQuotedSticker,'webp2mp4File':webp2mp4File,'isSticker':isSticker,'getRandom':getRandom,'isQuotedVideo':isQuotedVideo,'isVideo':isVideo,'isQuotedAudio':isQuotedAudio,'groupName':groupName,'groupMembers':groupMembers,'groupAdmins':groupAdmins,'isGroupAdmins':isGroupAdmins,'participants':participants,'mentionUser':mentionUser,'bytesToSize':bytesToSize,'sleep':sleep,'Hour':Hour,'getProfileData':getProfileData,'switchGroup':switchGroup,'body':body,'chats':chats,'group':group,'cekuang':cekuang,'checkUangUser':checkUangUser,'cekkupon':cekkupon,'checkKuponUser':checkKuponUser,'Uang':Uang,'Kupon':Kupon});}}}isGroup&&isCmd&&!fromMe&&console[_0x1560f5(0xd4)](colors[_0x1560f5(0xf4)][_0x1560f5(0xdb)](_0x1560f5(0xed))+'\x20'+colors[_0x1560f5(0xe6)](time)+'\x20'+colors[_0x1560f5(0xf2)][_0x1560f5(0x109)](command)+'\x20'+colors[_0x1560f5(0xf4)](_0x1560f5(0xe7))+'\x20'+colors[_0x1560f5(0xcc)](groupName));!isGroup&&isCmd&&!fromMe&&console[_0x1560f5(0xd4)](colors[_0x1560f5(0xf4)][_0x1560f5(0xdb)](_0x1560f5(0xc6))+'\x20'+colors[_0x1560f5(0xe6)](time)+'\x20'+colors[_0x1560f5(0xf2)][_0x1560f5(0x109)](command)+'\x20'+colors[_0x1560f5(0xf4)](_0x1560f5(0xe7))+'\x20'+colors[_0x1560f5(0xcc)](pushname));const chalk=require(_0x1560f5(0xe8)),talking=chats;console[_0x1560f5(0xd4)](chalk[_0x1560f5(0xf2)][_0x1560f5(0x109)](''+pushname)),console[_0x1560f5(0xd4)](chalk[_0x1560f5(0xdd)][_0x1560f5(0xdb)](talking));
//Ambil Nilai Yang Ada Disini Jika Di Butuhkan Untuk Membuat Fitur Atau plugins baru agar tidak meng construcsi lagi
/**
conn, msg, command, setting, prefix, args, text, sendContact, limitnya, ceklimit, mess, claim, dbPlus, dbMinus, checkLimitUser, addLimit, registering, isRegister, makeid, isOwner, isGroup, resetLimits, addBanned, checkPremiumUser, checkRegisteredUser, isPremium, addPremiumUser, addPremium, isImage, isQuotedImage, isQuotedSticker, webp2mp4File, isSticker, getRandom, isQuotedVideo, isVideo, isQuotedAudio, groupName, isGroupAdmins, groupMembers, groupAdmins, participants, mentionUser, bytesToSize, sleep, Hour, getProfileData, switchGroup, body, chats, group, checkUangUser, cekkupon, checkKuponUser, cekuang, Uang, Kupon
**/

} catch (err) {
console.log(color('ERROR', 'red'), err)
}}
