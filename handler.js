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
//const isOwner = setting.ownerNumber == msg.sender || [`${setting.contact}@s.whatsapp.net`].includes(msg.sender);
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


conn.chatModify({ delete: true, lastMessages: [msg] }, msg.chat)
conn.chatModify({ archive: true, lastMessages: [msg] }, msg.chat)
        
// Data Awal
const welcome = true // false untuk tidak aktif, true untuk aktif welcome nya dan untuk on offinya di plugin enable welcome, 
const antilink = true 
const limit = 3
const uang = 10000
const kupon = 10
const level = 1


// Budy
function _0x5381(){const _0x35a121=['6579067gAgrvd','startsWith','reply','\x20})()','10BAvOmm','stringify','slice','string','2762542mAnxrY','(async\x20()\x20','226053FnMxkI','=>\x20{\x20retur','247PyXeUf','24RiIyPq','inspect','util','3FxeQgk','1184844svGWIr','format','60QLtLde','OnlyOwner','187901GbUysI','429595hKpCft','584NahUpJ','1529384yhrcIP','VuZuD'];_0x5381=function(){return _0x35a121;};return _0x5381();}const _0x46948e=_0x5bfd;(function(_0x2a03b4,_0x1c3a2f){const _0x2b6936=_0x5bfd,_0x43b1ce=_0x2a03b4();while(!![]){try{const _0x27e7af=parseInt(_0x2b6936(0xa0))/(-0x24+0x6e5+-0x6c0)+parseInt(_0x2b6936(0x90))/(0x758+-0x2283+0x1*0x1b2d)*(-parseInt(_0x2b6936(0x98))/(0x9a7+0xd35+-0x16d9))+-parseInt(_0x2b6936(0x9b))/(0x1fb*-0xc+0x1329+0x49f)*(-parseInt(_0x2b6936(0x9e))/(-0x8ed+0x3*-0xb1d+-0x2a49*-0x1))+parseInt(_0x2b6936(0x95))/(-0x4e1*0x7+0x1b1a+0x1*0x713)*(parseInt(_0x2b6936(0x9d))/(-0x128+-0x9b0+0xadf))+parseInt(_0x2b6936(0x9f))/(-0x8bb*-0x4+-0x6*0x106+-0x1cc0)*(-parseInt(_0x2b6936(0x92))/(0x82f+-0x13fc+0xbd6))+-parseInt(_0x2b6936(0xa6))/(-0x8ef*0x1+0x1a59+-0x1160)*(parseInt(_0x2b6936(0xa2))/(-0x167e+-0x2358+0x39e1))+-parseInt(_0x2b6936(0x99))/(0x36a+-0x202*-0x11+0x78*-0x50)*(-parseInt(_0x2b6936(0x94))/(0x99e+-0xc85+0x36*0xe));if(_0x27e7af===_0x1c3a2f)break;else _0x43b1ce['push'](_0x43b1ce['shift']());}catch(_0x2ae244){_0x43b1ce['push'](_0x43b1ce['shift']());}}}(_0x5381,-0x9bbaa+0x84292+0x108ef3*0x1));if(body[_0x46948e(0xa3)]('=>')){if(!isOwner)return msg[_0x46948e(0xa4)](mess[_0x46948e(0x9c)]);function Return(_0x27142d){const _0x4d1a87=_0x46948e,_0x4e9cab={'VuZuD':function(_0x1f932c,_0x11998c){return _0x1f932c==_0x11998c;}};return sat=JSON[_0x4d1a87(0xa7)](_0x27142d,null,-0x3*-0x529+-0x2a2+-0xcd7),bang=util[_0x4d1a87(0x9a)](sat),_0x4e9cab[_0x4d1a87(0xa1)](sat,undefined)&&(bang=util[_0x4d1a87(0x9a)](_0x27142d)),msg[_0x4d1a87(0xa4)](bang);}try{msg[_0x46948e(0xa4)](util[_0x46948e(0x9a)](eval(_0x46948e(0x91)+_0x46948e(0x93)+'n\x20'+body[_0x46948e(0xa8)](-0x5ff+0x2125*-0x1+0x2727)+_0x46948e(0xa5))));}catch(_0x351f0f){msg[_0x46948e(0xa4)](String(_0x351f0f));}}function _0x5bfd(_0x10a350,_0x3bf477){const _0x5b4627=_0x5381();return _0x5bfd=function(_0xddfa61,_0x3ca170){_0xddfa61=_0xddfa61-(0x135e*-0x1+0x2*0xfe1+-0xbd4*0x1);let _0x26e48f=_0x5b4627[_0xddfa61];return _0x26e48f;},_0x5bfd(_0x10a350,_0x3bf477);}if(body[_0x46948e(0xa3)]('>')){if(!isOwner)return msg[_0x46948e(0xa4)](mess[_0x46948e(0x9c)]);try{let evaled=await eval(body[_0x46948e(0xa8)](-0x2165+-0x202b+-0x95e*-0x7));if(typeof evaled!==_0x46948e(0xa9))evaled=require(_0x46948e(0x97))[_0x46948e(0x96)](evaled);await msg[_0x46948e(0xa4)](evaled);}catch(_0x2dfb86){await msg[_0x46948e(0xa4)](String(_0x2dfb86));}}if(body[_0x46948e(0xa3)]('$')){if(!isOwner)return msg[_0x46948e(0xa4)](mess[_0x46948e(0x9c)]);exec(body[_0x46948e(0xa8)](-0x708+-0x198*0xa+0x16fa),(_0x2d3f15,_0x57e95e)=>{const _0x78002a=_0x46948e;if(_0x2d3f15)return msg[_0x78002a(0xa4)](_0x2d3f15);if(_0x57e95e)return msg[_0x78002a(0xa4)](_0x57e95e);});}

// ########################################## //
const _0x623656=_0x76f5;(function(_0x11d368,_0x2fea1d){const _0x3a4ade=_0x76f5,_0x256b35=_0x11d368();while(!![]){try{const _0x3c8ad1=-parseInt(_0x3a4ade(0x137))/(-0x13*-0x1fa+0x1c6f+-0x41fc)+parseInt(_0x3a4ade(0x13f))/(-0x38f*0x1+-0x6*0x512+-0x4d*-0x71)*(-parseInt(_0x3a4ade(0x136))/(0xdc9+-0xe61*-0x1+-0x1c27))+-parseInt(_0x3a4ade(0x10c))/(-0x106+0x29*0xeb+-0x2499)*(-parseInt(_0x3a4ade(0x112))/(0x1299+0x41*-0x1b+-0xbb9))+-parseInt(_0x3a4ade(0x114))/(0x4d5+-0xb5+0x15*-0x32)+parseInt(_0x3a4ade(0x128))/(-0x141*0xd+-0xe31*-0x1+-0x1*-0x223)+-parseInt(_0x3a4ade(0x143))/(0x6c2+0x8f9+-0xfb3)*(-parseInt(_0x3a4ade(0x132))/(-0x2*0x455+-0x20f4+0x29a7))+parseInt(_0x3a4ade(0x134))/(-0x225b+0x795*-0x3+0x3924)*(parseInt(_0x3a4ade(0x110))/(-0xd3*0x13+-0x8a8+0x617*0x4));if(_0x3c8ad1===_0x2fea1d)break;else _0x256b35['push'](_0x256b35['shift']());}catch(_0x5532d2){_0x256b35['push'](_0x256b35['shift']());}}}(_0x17a8,-0x1df26+-0x4a2a4+0x1404c9),conn[_0x623656(0x115)+'es']([msg[_0x623656(0x140)]]),conn[_0x623656(0x127)+_0x623656(0x10a)](_0x623656(0x105),msg[_0x623656(0x10b)]));const loadUserData=(_0x40fcac,_0x2a2ba9)=>{const _0x38ff8c=_0x623656,_0x27bc54={'JiEpU':function(_0x5d68c4,_0x2ad0ed){return _0x5d68c4===_0x2ad0ed;},'oScqO':_0x38ff8c(0x125),'kFpqa':_0x38ff8c(0x135),'aBJWN':_0x38ff8c(0x12e)+_0x38ff8c(0x13a)},_0x47c4a6=_0x40fcac[_0x38ff8c(0x103)]('@')[0xa1*-0x16+-0xf6b+0x1*0x1d41]+_0x38ff8c(0x12b),_0x20444e=path[_0x38ff8c(0x11e)](_0x27bc54[_0x38ff8c(0x122)],_0x47c4a6);fs[_0x38ff8c(0x133)](_0x20444e,_0x27bc54[_0x38ff8c(0x148)],(_0xce2b74,_0x259fcb)=>{const _0x1c3614=_0x38ff8c;if(_0xce2b74){if(_0x27bc54[_0x1c3614(0x117)](_0xce2b74[_0x1c3614(0x126)],_0x27bc54[_0x1c3614(0x106)])){const _0x30105f={'id':_0x40fcac,'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':''},_0x1b0249=[_0x30105f];fs[_0x1c3614(0x14a)](_0x20444e,JSON[_0x1c3614(0x13b)](_0x1b0249,null,-0x22b6+0x1422+0xe96*0x1),_0x27bc54[_0x1c3614(0x148)],_0x41c13d=>{if(_0x41c13d)return;});}else{}return;}let _0x139cd5=JSON[_0x1c3614(0x142)](_0x259fcb);const _0x5159bd=_0x139cd5[_0x1c3614(0x10d)](_0x41ccf8=>_0x41ccf8['id']===_0x40fcac);if(!_0x5159bd){const _0xf5d66b={'id':_0x40fcac,'registered':![],'user':!![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':''};_0x139cd5[_0x1c3614(0x11f)](_0xf5d66b),fs[_0x1c3614(0x14a)](_0x20444e,JSON[_0x1c3614(0x13b)](_0x139cd5,null,-0xb35+-0x1ff0+-0x2b27*-0x1),_0x27bc54[_0x1c3614(0x148)],_0x452069=>{if(_0x452069)return;});}});},users=[];for(let i=0x7*-0x431+-0x44b+0x21a2;i<0x121+0x2393+-0x24a9;i++){const user={'sender':msg[_0x623656(0x13d)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':''};users[_0x623656(0x11f)](user);}const userDir=_0x623656(0x12e)+_0x623656(0x13a);function _0x17a8(){const _0x2a5390=['length','white','ENOENT','code','sendPresen','11506880JXHpZX','object','writeFileS','.json','chalk','.js','./database','from','green','bgWhite','9OKChny','readFile','10Nyrpyt','utf8','3403467FguvLT','111115lqigFb','endsWith','fromMe','/userdata','stringify','/group','sender','\x20Limit\x20Ter','2yYAKVt','key','readdirSyn','parse','6508912hmDPUf','FfqyL','Private','Group','readFileSy','kFpqa','gsyHn','writeFile','split','mkdirSync','composing','oScqO','limit','banned','ync','ceUpdate','chat','4yZXBIU','find','log','reply','4584107MSacKK','blue','1442830hCgETi','bold','6189900UkHidN','readMessag','forEach','JiEpU','plugins','black','amount','function','brightCyan','OnoBi','join','push','existsSync','pakai\x20√','aBJWN'];_0x17a8=function(){return _0x2a5390;};return _0x17a8();}!fs[_0x623656(0x120)](userDir)&&fs[_0x623656(0x104)](userDir);for(let i=-0xf*0x262+0x17f0+0xbce;i<users[_0x623656(0x123)];i++){const user=users[i];loadUserData(user[_0x623656(0x13d)],user[_0x623656(0x11a)]);}const groupFolderPath=_0x623656(0x12e)+_0x623656(0x13c),groupFilePath=path[_0x623656(0x11e)](groupFolderPath,groupId+_0x623656(0x12b));let groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink}];function saveGroupData(){const _0x637c73=_0x623656;!fs[_0x637c73(0x120)](groupFilePath)&&fs[_0x637c73(0x12a)+_0x637c73(0x109)](groupFilePath,JSON[_0x637c73(0x13b)](groupData,null,0x1d9a+-0x1c13+-0x185));}function readGroupData(){const _0xb9ea6b=_0x623656;fs[_0xb9ea6b(0x120)](groupFilePath)&&(groupData=JSON[_0xb9ea6b(0x142)](fs[_0xb9ea6b(0x147)+'nc'](groupFilePath)));}function readAntilink(){const _0x31256e=_0x623656;return fs[_0x31256e(0x120)](groupFilePath)?JSON[_0x31256e(0x142)](fs[_0x31256e(0x147)+'nc'](groupFilePath)):null;}const groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x623656(0x10d)](_0x31e26c=>_0x31e26c['id']===msg[_0x623656(0x10b)]);saveGroupData(),readGroupData(),readAntilink();const ceklimit=checkLimitUser(sender)<=0x1116+0x1afc+-0x2c12,addLimit=addLimitUser,addBanned=addBannedUser,addPremium=addPremiumUser,confirmlimit=(_0x25c851,_0x3aef90)=>{const _0x586087=_0x623656,_0x16918f={'FfqyL':function(_0x4e66db,_0x5914a8){return _0x4e66db===_0x5914a8;},'OnoBi':_0x586087(0x12e)+_0x586087(0x13a),'gsyHn':function(_0x53bfa5,_0x5606be){return _0x53bfa5!==_0x5606be;}},_0x329c30=_0x25c851[_0x586087(0x103)]('@')[0x1ba6+-0x3c*0x36+0x13*-0xca]+_0x586087(0x12b),_0x41dd1e=path[_0x586087(0x11e)](_0x16918f[_0x586087(0x11d)],_0x329c30);let _0x80fe68=JSON[_0x586087(0x142)](fs[_0x586087(0x147)+'nc'](_0x41dd1e)),_0x20fe42=-(0xcce*0x1+-0xfee+-0x321*-0x1);_0x80fe68[_0x586087(0x116)]((_0x187c3a,_0x3ecd90)=>{const _0x5ca148=_0x586087;_0x16918f[_0x5ca148(0x144)](_0x187c3a['id'],_0x25c851)&&(_0x20fe42=_0x3ecd90);}),_0x16918f[_0x586087(0x149)](_0x20fe42,-(-0x1160+-0x1*0x1765+0x28c6))&&(_0x80fe68[_0x20fe42][_0x586087(0x107)]-=_0x3aef90,fs[_0x586087(0x12a)+_0x586087(0x109)](_0x41dd1e,JSON[_0x586087(0x13b)](_0x80fe68,null,-0x25de+-0x1434+0x3a14)),msg[_0x586087(0x10f)](_0x3aef90+(_0x586087(0x13e)+_0x586087(0x121))));},limitnya=await confirmlimit,claim=await confirmclaim,isBanned=checkBannedUser(sender),isRegister=checkRegisteredUser(sender),isPremium=checkPremiumUser(sender),pluginsFolderPath=path[_0x623656(0x11e)](__dirname,_0x623656(0x118)),pluginFiles=fs[_0x623656(0x141)+'c'](pluginsFolderPath);function _0x76f5(_0x545167,_0x14fdd8){const _0xade766=_0x17a8();return _0x76f5=function(_0x34e3b3,_0x3c6b28){_0x34e3b3=_0x34e3b3-(0x20a6+0x202a+-0x3fcd*0x1);let _0xc2365c=_0xade766[_0x34e3b3];return _0xc2365c;},_0x76f5(_0x545167,_0x14fdd8);}for(const file of pluginFiles){if(file[_0x623656(0x138)](_0x623656(0x12d))){const pluginFilePath=path[_0x623656(0x11e)](pluginsFolderPath,file),pluginModule=require(pluginFilePath);if(typeof pluginModule['on']===_0x623656(0x11b)||typeof pluginModule['on']===_0x623656(0x129)){const isBanned=checkBannedUser(sender);if(isBanned&&!msg[_0x623656(0x139)]){msg[_0x623656(0x10f)](mess[_0x623656(0x108)]);break;}else await pluginModule['on'](msg,{'conn':conn,'command':command,'prefix':prefix,'args':args,'text':text,'setting':setting,'limitnya':limitnya,'ceklimit':ceklimit,'sendContact':sendContact,'checkLimitUser':checkLimitUser,'mess':mess,'dbPlus':dbPlus,'dbMinus':dbMinus,'claim':claim,'addLimit':addLimit,'isRegister':isRegister,'registering':registering,'makeid':makeid,'isOwner':isOwner,'isGroup':isGroup,'resetLimits':resetLimits,'addBanned':addBanned,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'isPremium':isPremium,'addPremium':addPremium,'addPremiumUser':addPremiumUser,'isImage':isImage,'isQuotedImage':isQuotedImage,'isQuotedSticker':isQuotedSticker,'webp2mp4File':webp2mp4File,'isSticker':isSticker,'getRandom':getRandom,'isQuotedVideo':isQuotedVideo,'isVideo':isVideo,'isQuotedAudio':isQuotedAudio,'groupName':groupName,'groupMembers':groupMembers,'groupAdmins':groupAdmins,'isGroupAdmins':isGroupAdmins,'participants':participants,'mentionUser':mentionUser,'bytesToSize':bytesToSize,'sleep':sleep,'Hour':Hour,'getProfileData':getProfileData,'switchGroup':switchGroup,'body':body,'chats':chats,'group':group});}}}isGroup&&isCmd&&!fromMe&&console[_0x623656(0x10e)](colors[_0x623656(0x130)][_0x623656(0x113)](_0x623656(0x146))+'\x20'+colors[_0x623656(0x11c)](time)+'\x20'+colors[_0x623656(0x119)][_0x623656(0x131)](command)+'\x20'+colors[_0x623656(0x130)](_0x623656(0x12f))+'\x20'+colors[_0x623656(0x111)](groupName));!isGroup&&isCmd&&!fromMe&&console[_0x623656(0x10e)](colors[_0x623656(0x130)][_0x623656(0x113)](_0x623656(0x145))+'\x20'+colors[_0x623656(0x11c)](time)+'\x20'+colors[_0x623656(0x119)][_0x623656(0x131)](command)+'\x20'+colors[_0x623656(0x130)](_0x623656(0x12f))+'\x20'+colors[_0x623656(0x111)](pushname));const chalk=require(_0x623656(0x12c)),talking=chats;console[_0x623656(0x10e)](chalk[_0x623656(0x119)][_0x623656(0x131)](''+pushname)),console[_0x623656(0x10e)](chalk[_0x623656(0x124)][_0x623656(0x113)](talking));

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
  switchGroup,
  body,
  chats,
  group
  
 
**/

} catch (err) {
console.log(color('ERROR', 'red'), err)
}}
