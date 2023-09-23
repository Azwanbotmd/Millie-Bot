process.on('uncaughtException', console.error)
const { exec } = require("child_process");
const { color } = require('./function/Data_Server_Bot/Console_Data')
const { isUrl, getGroupAdmins, bytesToSize, sleep , makeid } = require("./function/func_Server");
const { dbPlus, dbMinus, getProfileData, checkLimitUser, addLimitUser, addBannedUser, addPremiumUser, resetLimits, confirmclaim, Hour, checkBannedUser, checkRegisteredUser, registering, checkPremiumUser, switchGroup } = require("./function/database.js");
const { setting_JSON, mess_JSON } = require('./function/Data_Location.js')
const { webp2mp4File } = require("./function/Webp_Tomp4");
const fs = require("fs");
const path = require("path");
const util = require('util')
const colors = require('colors/safe');
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async (conn, msg, setting, store) => { try {
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
//const isOwner = setting.ownerNumber == msg.sender || [`${setting.ownerNumber}`].includes(msg.sender);
const isOwner = setting.ownerNumber.includes(msg.sender);
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const args = body.trim().split(/ +/).slice(1);
const text = args.join(" ");
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
//const welcomeJson = welcome_JSON
//const isWelcome = isGroup ? welcomeJson.includes(msg.chat) : false
//const isAntiLink = antilink.includes(from) ? true : false
//const isWelcome = welcomeJson.includes(msg.chat) ? true : false

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
const limit = 3
const uang = 10000
const kupon = 10
const level = 1


// Budy
const _0x56a341=_0x19c5;(function(_0x20b009,_0x354839){const _0x5e5e02=_0x19c5,_0x48579d=_0x20b009();while(!![]){try{const _0xce6460=-parseInt(_0x5e5e02(0x1f3))/(0x166b*-0x1+-0x1*0xb79+0x21e5)+-parseInt(_0x5e5e02(0x1f2))/(0x1f*0x68+0x1*-0x1c33+0xf9d)+parseInt(_0x5e5e02(0x1f5))/(-0x1*0x1187+-0x8a1+0x1a2b)+parseInt(_0x5e5e02(0x1e8))/(-0x1bb*0x7+-0x12*-0x1e9+-0x1641)*(-parseInt(_0x5e5e02(0x1e7))/(-0x11d2+0x1bbd+-0xe*0xb5))+parseInt(_0x5e5e02(0x1e2))/(0x95*0x12+-0x2*-0xc9a+-0x8ea*0x4)+parseInt(_0x5e5e02(0x1ec))/(-0x14*0x175+0x7b*-0x2e+-0x753*-0x7)+parseInt(_0x5e5e02(0x1f0))/(-0xbd8+-0x6f7*-0x4+-0xffc)*(parseInt(_0x5e5e02(0x1eb))/(-0x1504+0x1287+-0x286*-0x1));if(_0xce6460===_0x354839)break;else _0x48579d['push'](_0x48579d['shift']());}catch(_0x3230bd){_0x48579d['push'](_0x48579d['shift']());}}}(_0x5754,0x1b6*-0xa81+0x807c6+0x4*0x4bc8d));function _0x5754(){const _0x13319c=['504680voeeSy','startsWith','2709564MDOsFS','format','=>\x20{\x20retur','1711212QAHlEY','\x20})()','slice','reply','uiqPJ','455nYnUBp','50152WmeazN','inspect','(async\x20()\x20','63izWmSq','1117515JKvrbZ','string','stringify','util','1301368SbpTuL','OnlyOwner','501892XxNIfv'];_0x5754=function(){return _0x13319c;};return _0x5754();}function _0x19c5(_0x356910,_0x5a07ed){const _0x5a34ef=_0x5754();return _0x19c5=function(_0x1b3617,_0x11eaf8){_0x1b3617=_0x1b3617-(-0x3d*0x53+-0x140d+-0xde7*-0x3);let _0x2f8831=_0x5a34ef[_0x1b3617];return _0x2f8831;},_0x19c5(_0x356910,_0x5a07ed);}if(body[_0x56a341(0x1f4)]('=>')){if(!isOwner)return msg[_0x56a341(0x1e5)](mess[_0x56a341(0x1f1)]);function Return(_0x2d53e4){const _0x438714=_0x56a341,_0x5b7047={'uiqPJ':function(_0xb65d68,_0x460dd7){return _0xb65d68==_0x460dd7;}};return sat=JSON[_0x438714(0x1ee)](_0x2d53e4,null,-0x8*0x107+-0xa*0x9+0x9*0xf4),bang=util[_0x438714(0x1f6)](sat),_0x5b7047[_0x438714(0x1e6)](sat,undefined)&&(bang=util[_0x438714(0x1f6)](_0x2d53e4)),msg[_0x438714(0x1e5)](bang);}try{msg[_0x56a341(0x1e5)](util[_0x56a341(0x1f6)](eval(_0x56a341(0x1ea)+_0x56a341(0x1e1)+'n\x20'+body[_0x56a341(0x1e4)](0x1*0x17e9+0x2bd*-0x3+-0xfaf)+_0x56a341(0x1e3))));}catch(_0x2bb8f3){msg[_0x56a341(0x1e5)](String(_0x2bb8f3));}}if(body[_0x56a341(0x1f4)]('>')){if(!isOwner)return msg[_0x56a341(0x1e5)](mess[_0x56a341(0x1f1)]);try{let evaled=await eval(body[_0x56a341(0x1e4)](-0x26f6+0x2385+0x373));if(typeof evaled!==_0x56a341(0x1ed))evaled=require(_0x56a341(0x1ef))[_0x56a341(0x1e9)](evaled);await msg[_0x56a341(0x1e5)](evaled);}catch(_0x4b7882){await msg[_0x56a341(0x1e5)](String(_0x4b7882));}}if(body[_0x56a341(0x1f4)]('$')){if(!isOwner)return msg[_0x56a341(0x1e5)](mess[_0x56a341(0x1f1)]);exec(body[_0x56a341(0x1e4)](0x9*0x2c3+-0x26ca+0xdf1),(_0x47adcd,_0x274e19)=>{const _0x2195a8=_0x56a341;if(_0x47adcd)return msg[_0x2195a8(0x1e5)](_0x47adcd);if(_0x274e19)return msg[_0x2195a8(0x1e5)](_0x274e19);});}
// ########################################## //
// LOAD USER DATA//
function _0x3624(){const _0x26843c=['readMessag','889uuzMSY','find','fQIKI','5138584gBFHaE','.js','readFile','\x20Limit\x20Ter','Private','push','579470ipHBHV','readFileSy','./database','utf8','function','join','ceUpdate','green','chalk','sender','plugins','cOucS','length','ync','fovXP','fromMe','HtjPa','white','limit','/userdata','brightCyan','sendPresen','1681780ZVotbO','key','/group','bgWhite','1264910JehmdR','14zaawgZ','reply','amount','from','blue','readdirSyn','stringify','writeFile','split','4177544PbhQRB','486ApusSc','object','existsSync','forEach','code','QmMvz','writeFileS','EbkqE','mkdirSync','black','composing','banned','chat','endsWith','544857SWqnWL','bold','.json','parse','doXjz','Group','1260vlDKyW','log','pakai\x20√','ENOENT'];_0x3624=function(){return _0x26843c;};return _0x3624();}const _0x1fcbfb=_0xe54a;(function(_0x5d6b9f,_0x34885c){const _0x375e36=_0xe54a,_0x4d8484=_0x5d6b9f();while(!![]){try{const _0x5768fb=-parseInt(_0x375e36(0x20d))/(-0x5f9+0x264b+0x2051*-0x1)+parseInt(_0x375e36(0x20e))/(-0x1011+0x21c1*-0x1+0x84e*0x6)*(-parseInt(_0x375e36(0x1df))/(-0x9e*-0x36+-0x2386+-0x5*-0x71))+parseInt(_0x375e36(0x217))/(0x8*0x1ff+-0x99*0x26+0x6c2)+-parseInt(_0x375e36(0x209))/(0x1*-0x1110+-0x2*-0x7bd+0x89*0x3)+parseInt(_0x375e36(0x1e5))/(0x25*-0x9d+0x22bd+0x26*-0x51)*(parseInt(_0x375e36(0x1ea))/(0x167*0x1b+0x1535+-0xbcf*0x5))+-parseInt(_0x375e36(0x1ed))/(-0x1*0x4f3+-0x4*0x4f1+0x18bf)+-parseInt(_0x375e36(0x218))/(0x22b5+-0x16f1*0x1+-0xbbb)*(-parseInt(_0x375e36(0x1f3))/(0x1075*0x2+0x9*0x2db+-0xbb7*0x5));if(_0x5768fb===_0x34885c)break;else _0x4d8484['push'](_0x4d8484['shift']());}catch(_0x581311){_0x4d8484['push'](_0x4d8484['shift']());}}}(_0x3624,0xda256+0x1f01f+0x1*-0x51d9d),conn[_0x1fcbfb(0x1e9)+'es']([msg[_0x1fcbfb(0x20a)]]),conn[_0x1fcbfb(0x208)+_0x1fcbfb(0x1f9)](_0x1fcbfb(0x1db),msg[_0x1fcbfb(0x1dd)]));const loadUserData=(_0x59ec79,_0x3d8f97)=>{const _0x2d4cd8=_0x1fcbfb,_0x14815f={'doXjz':function(_0x4cb307,_0x34cac5){return _0x4cb307===_0x34cac5;},'fQIKI':_0x2d4cd8(0x1e8),'fovXP':_0x2d4cd8(0x1f6),'EbkqE':_0x2d4cd8(0x1f5)+_0x2d4cd8(0x206)},_0x2ef3c5=_0x59ec79[_0x2d4cd8(0x216)]('@')[-0xbab+-0x1*0x259f+0x314a]+_0x2d4cd8(0x1e1),_0x9c9238=path[_0x2d4cd8(0x1f8)](_0x14815f[_0x2d4cd8(0x1d8)],_0x2ef3c5);fs[_0x2d4cd8(0x1ef)](_0x9c9238,_0x14815f[_0x2d4cd8(0x201)],(_0x3e9ae9,_0x1f406e)=>{const _0x20bfd8=_0x2d4cd8;if(_0x3e9ae9){if(_0x14815f[_0x20bfd8(0x1e3)](_0x3e9ae9[_0x20bfd8(0x1d5)],_0x14815f[_0x20bfd8(0x1ec)])){const _0x51ed37={'id':_0x59ec79,'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':''},_0x1b956f=[_0x51ed37];fs[_0x20bfd8(0x215)](_0x9c9238,JSON[_0x20bfd8(0x214)](_0x1b956f,null,0x10c4+0x1*0x1670+-0x2732),_0x14815f[_0x20bfd8(0x201)],_0x7e7ba9=>{if(_0x7e7ba9)return;});}else{}return;}let _0x379230=JSON[_0x20bfd8(0x1e2)](_0x1f406e);const _0x16dc6c=_0x379230[_0x20bfd8(0x1eb)](_0x1d4378=>_0x1d4378['id']===_0x59ec79);if(!_0x16dc6c){const _0x1dc112={'id':_0x59ec79,'registered':![],'user':!![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':''};_0x379230[_0x20bfd8(0x1f2)](_0x1dc112),fs[_0x20bfd8(0x215)](_0x9c9238,JSON[_0x20bfd8(0x214)](_0x379230,null,-0x171b+-0x1*-0x26c9+-0xfac),_0x14815f[_0x20bfd8(0x201)],_0x694045=>{if(_0x694045)return;});}});},users=[];for(let i=0xafe+-0x136b+-0x2cf*-0x3;i<-0x21*-0xc1+0x1241+-0x1*0x2b17;i++){const user={'sender':msg[_0x1fcbfb(0x1fc)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':''};users[_0x1fcbfb(0x1f2)](user);}const userDir=_0x1fcbfb(0x1f5)+_0x1fcbfb(0x206);function _0xe54a(_0xc1bdbb,_0x40b171){const _0x40af4e=_0x3624();return _0xe54a=function(_0x36c2e7,_0x58aea5){_0x36c2e7=_0x36c2e7-(-0x99b*-0x3+-0x10f5+-0xa08);let _0x5af8de=_0x40af4e[_0x36c2e7];return _0x5af8de;},_0xe54a(_0xc1bdbb,_0x40b171);}!fs[_0x1fcbfb(0x21a)](userDir)&&fs[_0x1fcbfb(0x1d9)](userDir);for(let i=0x3*0x218+-0x742+0x5*0x32;i<users[_0x1fcbfb(0x1ff)];i++){const user=users[i];loadUserData(user[_0x1fcbfb(0x1fc)],user[_0x1fcbfb(0x210)]);}const groupFolderPath=_0x1fcbfb(0x1f5)+_0x1fcbfb(0x20b),groupFilePath=path[_0x1fcbfb(0x1f8)](groupFolderPath,groupId+_0x1fcbfb(0x1e1));let groupData=[{'id':groupId,'name':groupName,'welcome':welcome}];function saveGroupData(){const _0x1af54a=_0x1fcbfb;!fs[_0x1af54a(0x21a)](groupFilePath)&&fs[_0x1af54a(0x1d7)+_0x1af54a(0x200)](groupFilePath,JSON[_0x1af54a(0x214)](groupData,null,0x9c*0x36+0x121b+0xb*-0x4a3));}function readGroupData(){const _0x5c3e5c=_0x1fcbfb;fs[_0x5c3e5c(0x21a)](groupFilePath)&&(groupData=JSON[_0x5c3e5c(0x1e2)](fs[_0x5c3e5c(0x1f4)+'nc'](groupFilePath)));}saveGroupData(),readGroupData();const ceklimit=checkLimitUser(sender)<=0x8*-0x2f6+-0x791*0x3+0x19*0x1db,addLimit=addLimitUser,addBanned=addBannedUser,addPremium=addPremiumUser,confirmlimit=(_0x2307ad,_0x49dd35)=>{const _0x557373=_0x1fcbfb,_0x36ebca={'HtjPa':function(_0x44775a,_0x44edc5){return _0x44775a===_0x44edc5;},'cOucS':_0x557373(0x1f5)+_0x557373(0x206),'QmMvz':function(_0x445d73,_0x129b06){return _0x445d73!==_0x129b06;}},_0x2c2157=_0x2307ad[_0x557373(0x216)]('@')[0x143d+-0x849+0x1fe*-0x6]+_0x557373(0x1e1),_0x3ad4b9=path[_0x557373(0x1f8)](_0x36ebca[_0x557373(0x1fe)],_0x2c2157);let _0x2118c9=JSON[_0x557373(0x1e2)](fs[_0x557373(0x1f4)+'nc'](_0x3ad4b9)),_0x548ad3=-(0x3d*-0x5b+-0x7f*-0x3b+-0x795);_0x2118c9[_0x557373(0x1d4)]((_0x4f7996,_0x32c162)=>{const _0x228d53=_0x557373;_0x36ebca[_0x228d53(0x203)](_0x4f7996['id'],_0x2307ad)&&(_0x548ad3=_0x32c162);}),_0x36ebca[_0x557373(0x1d6)](_0x548ad3,-(-0x1057+0x1c5+0x29*0x5b))&&(_0x2118c9[_0x548ad3][_0x557373(0x205)]-=_0x49dd35,fs[_0x557373(0x1d7)+_0x557373(0x200)](_0x3ad4b9,JSON[_0x557373(0x214)](_0x2118c9,null,0x6f2+0x1*0x2033+-0x1*0x2723)),msg[_0x557373(0x20f)](_0x49dd35+(_0x557373(0x1f0)+_0x557373(0x1e7))));},limitnya=await confirmlimit,claim=await confirmclaim,isBanned=checkBannedUser(sender),isRegister=checkRegisteredUser(sender),isPremium=checkPremiumUser(sender),pluginsFolderPath=path[_0x1fcbfb(0x1f8)](__dirname,_0x1fcbfb(0x1fd)),pluginFiles=fs[_0x1fcbfb(0x213)+'c'](pluginsFolderPath);for(const file of pluginFiles){if(file[_0x1fcbfb(0x1de)](_0x1fcbfb(0x1ee))){const pluginFilePath=path[_0x1fcbfb(0x1f8)](pluginsFolderPath,file),pluginModule=require(pluginFilePath);if(typeof pluginModule['on']===_0x1fcbfb(0x1f7)||typeof pluginModule['on']===_0x1fcbfb(0x219)){const isBanned=checkBannedUser(sender);if(isBanned&&!msg[_0x1fcbfb(0x202)]){msg[_0x1fcbfb(0x20f)](mess[_0x1fcbfb(0x1dc)]);break;}else await pluginModule['on'](msg,{'conn':conn,'command':command,'prefix':prefix,'args':args,'text':text,'setting':setting,'limitnya':limitnya,'ceklimit':ceklimit,'sendContact':sendContact,'checkLimitUser':checkLimitUser,'mess':mess,'dbPlus':dbPlus,'dbMinus':dbMinus,'claim':claim,'addLimit':addLimit,'isRegister':isRegister,'registering':registering,'makeid':makeid,'isOwner':isOwner,'isGroup':isGroup,'resetLimits':resetLimits,'addBanned':addBanned,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'isPremium':isPremium,'addPremium':addPremium,'addPremiumUser':addPremiumUser,'isImage':isImage,'isQuotedImage':isQuotedImage,'isQuotedSticker':isQuotedSticker,'webp2mp4File':webp2mp4File,'isSticker':isSticker,'getRandom':getRandom,'isQuotedVideo':isQuotedVideo,'isVideo':isVideo,'isQuotedAudio':isQuotedAudio,'groupName':groupName,'groupMembers':groupMembers,'groupAdmins':groupAdmins,'isGroupAdmins':isGroupAdmins,'participants':participants,'mentionUser':mentionUser,'bytesToSize':bytesToSize,'sleep':sleep,'Hour':Hour,'getProfileData':getProfileData,'switchGroup':switchGroup});}}}isGroup&&isCmd&&!fromMe&&console[_0x1fcbfb(0x1e6)](colors[_0x1fcbfb(0x1fa)][_0x1fcbfb(0x1e0)](_0x1fcbfb(0x1e4))+'\x20'+colors[_0x1fcbfb(0x207)](time)+'\x20'+colors[_0x1fcbfb(0x1da)][_0x1fcbfb(0x20c)](command)+'\x20'+colors[_0x1fcbfb(0x1fa)](_0x1fcbfb(0x211))+'\x20'+colors[_0x1fcbfb(0x212)](groupName));!isGroup&&isCmd&&!fromMe&&console[_0x1fcbfb(0x1e6)](colors[_0x1fcbfb(0x1fa)][_0x1fcbfb(0x1e0)](_0x1fcbfb(0x1f1))+'\x20'+colors[_0x1fcbfb(0x207)](time)+'\x20'+colors[_0x1fcbfb(0x1da)][_0x1fcbfb(0x20c)](command)+'\x20'+colors[_0x1fcbfb(0x1fa)](_0x1fcbfb(0x211))+'\x20'+colors[_0x1fcbfb(0x212)](pushname));const chalk=require(_0x1fcbfb(0x1fb)),talking=chats;console[_0x1fcbfb(0x1e6)](chalk[_0x1fcbfb(0x1da)][_0x1fcbfb(0x20c)](''+pushname)),console[_0x1fcbfb(0x1e6)](chalk[_0x1fcbfb(0x204)][_0x1fcbfb(0x1e0)](talking));
//Ambil Nilai Yang Ada Disini Jika Di Butuhkan Untuk Membuat Fitur Atau plugins baru agar tidak meng construcsi lagi
/**
  conn,
  msg,
  command,
  setting,
  prefix,
  args,
  text,
  sendContact,
  limitnya,
  ceklimit,
  mess,
  claim,
  dbPlus,
  dbMinus,
  checkLimitUser,
  addLimit,
  registering,
  isRegister,
  makeid,
  isOwner,
  isGroup,
  resetLimits,
  addBanned,
  checkPremiumUser,
  checkRegisteredUser,
  isPremium,
  addPremiumUser,
  addPremium,
  isImage,
  isQuotedImage,
  isQuotedSticker,
  webp2mp4File,
  isSticker,
  getRandom,
  isQuotedVideo,
  isVideo,
  isQuotedAudio,
  groupName,
  isGroupAdmins,
  groupMembers,
  groupAdmins,
  participants,
  mentionUser,
  bytesToSize,
  sleep,
  Hour,
  getProfileData,
  switchGroup
 
**/

} catch (err) {
console.log(color('ERROR', 'red'), err)
}}
