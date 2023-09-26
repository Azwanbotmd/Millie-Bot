process.on('uncaughtException', console.error)
const { exec } = require("child_process");
const { color } = require('./function/Data_Server_Bot/Console_Data')
const { isUrl, getGroupAdmins, bytesToSize, sleep , makeid } = require("./function/func_Server");
const { dbPlus, dbMinus, getProfileData, checkLimitUser, addLimitUser, addBannedUser, addPremiumUser, resetLimits, confirmclaim, Hour, Uang, checkBannedUser, checkRegisteredUser, registering, checkPremiumUser, switchGroup } = require("./function/database.js");
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
const kupon = 10
const level = 1


//#####
function _0x5bb9(_0x536d7d,_0x336fb4){const _0x5eede1=_0x4e3d();return _0x5bb9=function(_0x5a21a1,_0x53ad21){_0x5a21a1=_0x5a21a1-(0x876*0x2+0x1286+-0x327*0xb);let _0x429f27=_0x5eede1[_0x5a21a1];return _0x429f27;},_0x5bb9(_0x536d7d,_0x336fb4);}function _0x4e3d(){const _0x1a4465=['stringify','LjMGT','1055YZIsPK','\x20})()','reply','slice','inspect','OnlyOwner','11190uQXNrB','1323058QTsFOZ','format','603084jcYmei','=>\x20{\x20retur','24gPGOVC','3676zabwLc','startsWith','621KMdtmR','132148HmuZJJ','4359XixOzB','string','(async\x20()\x20','3184DgAiXQ','1127SUlNhq','2DxVvYH','util'];_0x4e3d=function(){return _0x1a4465;};return _0x4e3d();}const _0xd44d6c=_0x5bb9;(function(_0x574366,_0x1b80c1){const _0x2ee2e4=_0x5bb9,_0xfe871e=_0x574366();while(!![]){try{const _0x1272ca=parseInt(_0x2ee2e4(0xc7))/(0x1e3f+-0xac9+0x125*-0x11)*(-parseInt(_0x2ee2e4(0xda))/(0x1*0x967+-0x194a+0xfe5))+-parseInt(_0x2ee2e4(0xdb))/(-0x1e89+-0x185a+-0x36e6*-0x1)+-parseInt(_0x2ee2e4(0xd7))/(-0x99e*0x3+-0x7a0+-0x123f*-0x2)*(-parseInt(_0x2ee2e4(0xcb))/(-0x1a*0x2b+0x1469+-0x1006))+parseInt(_0x2ee2e4(0xd4))/(-0xcd5+-0x1*0xde9+0x1ac4)+-parseInt(_0x2ee2e4(0xc6))/(-0x2286+-0xbdf+0x2e6c)*(parseInt(_0x2ee2e4(0xc5))/(-0xcf8+0xba0+0x160))+parseInt(_0x2ee2e4(0xd9))/(0x57b+0x1ae+-0x8*0xe4)*(-parseInt(_0x2ee2e4(0xd1))/(-0x2265+0x2e*-0xcf+0x47a1))+parseInt(_0x2ee2e4(0xd2))/(0x337*0x1+-0x1*0x2333+0x2007)*(parseInt(_0x2ee2e4(0xd6))/(0x1812+-0x86e*-0x1+-0x10c*0x1f));if(_0x1272ca===_0x1b80c1)break;else _0xfe871e['push'](_0xfe871e['shift']());}catch(_0xd5ac2f){_0xfe871e['push'](_0xfe871e['shift']());}}}(_0x4e3d,-0x385*0x127+0x1da84+0x8*0xc577));if(body[_0xd44d6c(0xd8)]('=>')){if(!isOwner)return msg[_0xd44d6c(0xcd)](mess[_0xd44d6c(0xd0)]);function Return(_0x5d6edb){const _0x3b902f=_0xd44d6c,_0x2fcde1={'LjMGT':function(_0x23a862,_0x5c7ca1){return _0x23a862==_0x5c7ca1;}};return sat=JSON[_0x3b902f(0xc9)](_0x5d6edb,null,0x13*0x39+0x1*0xb5d+0x7*-0x23a),bang=util[_0x3b902f(0xd3)](sat),_0x2fcde1[_0x3b902f(0xca)](sat,undefined)&&(bang=util[_0x3b902f(0xd3)](_0x5d6edb)),msg[_0x3b902f(0xcd)](bang);}try{msg[_0xd44d6c(0xcd)](util[_0xd44d6c(0xd3)](eval(_0xd44d6c(0xdd)+_0xd44d6c(0xd5)+'n\x20'+body[_0xd44d6c(0xce)](0x29*0x27+0x226e+-0x2b6*0xf)+_0xd44d6c(0xcc))));}catch(_0x3ca01f){msg[_0xd44d6c(0xcd)](String(_0x3ca01f));}}if(body[_0xd44d6c(0xd8)]('>')){if(!isOwner)return msg[_0xd44d6c(0xcd)](mess[_0xd44d6c(0xd0)]);try{let evaled=await eval(body[_0xd44d6c(0xce)](0x8a7*0x4+0x3e*-0x75+-0x2*0x322));if(typeof evaled!==_0xd44d6c(0xdc))evaled=require(_0xd44d6c(0xc8))[_0xd44d6c(0xcf)](evaled);msg[_0xd44d6c(0xcd)](evaled);}catch(_0x21bbbd){msg[_0xd44d6c(0xcd)](String(_0x21bbbd));}}if(body[_0xd44d6c(0xd8)]('$')){if(!isOwner)return msg[_0xd44d6c(0xcd)](mess[_0xd44d6c(0xd0)]);try{exec(body[_0xd44d6c(0xce)](0x29*0x65+0x41b+0x15a*-0xf),(_0x5bffa7,_0x4b3d48)=>{const _0x5cc14b=_0xd44d6c;if(_0x5bffa7)return msg[_0x5cc14b(0xcd)](_0x5bffa7);if(_0x4b3d48)return msg[_0x5cc14b(0xcd)](_0x4b3d48);});}catch(_0x26ee98){msg[_0xd44d6c(0xcd)](String(_0x26ee98));}}
// ########################################## //
const _0x13d152=_0x18e4;(function(_0x3b6e5a,_0x4bdd4b){const _0x407fa0=_0x18e4,_0x2f07d7=_0x3b6e5a();while(!![]){try{const _0xb08b83=parseInt(_0x407fa0(0x135))/(-0x1*-0x18fb+-0x7e*-0x4a+-0x3d66)*(parseInt(_0x407fa0(0x14e))/(-0x18df+-0x2104+0x39e5))+-parseInt(_0x407fa0(0x15d))/(-0x3*0x7db+-0x1ec3+0x1*0x3657)+-parseInt(_0x407fa0(0x133))/(0x197e+0x4*0x775+-0x1*0x374e)+parseInt(_0x407fa0(0x15a))/(0x19ef+-0x16f9*-0x1+0x30e3*-0x1)+parseInt(_0x407fa0(0x14f))/(-0x14f4+0xc*-0x1f9+-0xee2*-0x3)+parseInt(_0x407fa0(0x138))/(-0x5e*0x12+-0xf51*-0x1+-0x8ae)*(parseInt(_0x407fa0(0x12a))/(-0xf8f*-0x1+0x360+-0x12e7))+parseInt(_0x407fa0(0x122))/(0x13c1+-0x53*0x29+-0x66d);if(_0xb08b83===_0x4bdd4b)break;else _0x2f07d7['push'](_0x2f07d7['shift']());}catch(_0x5854df){_0x2f07d7['push'](_0x2f07d7['shift']());}}}(_0x343a,-0x57*-0x5d+0x51d1f+0x23d95*-0x1),conn[_0x13d152(0x168)+'es']([msg[_0x13d152(0x13c)]]),conn[_0x13d152(0x155)+_0x13d152(0x149)](_0x13d152(0x166),msg[_0x13d152(0x162)]));const loadUserData=(_0x2eef61,_0x4d5b17)=>{const _0x330c97=_0x13d152,_0x3866c7={'FVETK':function(_0x3b7a4f,_0x5daa1d){return _0x3b7a4f===_0x5daa1d;},'AqJtV':_0x330c97(0x142),'GYBur':_0x330c97(0x158),'qXchw':_0x330c97(0x151)+_0x330c97(0x167)},_0x1741eb=_0x2eef61[_0x330c97(0x13b)]('@')[0xf85*-0x2+0x1*0x7bb+-0x27*-0x99]+_0x330c97(0x159),_0x4587b2=path[_0x330c97(0x15b)](_0x3866c7[_0x330c97(0x160)],_0x1741eb);fs[_0x330c97(0x126)](_0x4587b2,_0x3866c7[_0x330c97(0x154)],(_0x5e8521,_0x1aa023)=>{const _0x525767=_0x330c97;if(_0x5e8521){if(_0x3866c7[_0x525767(0x128)](_0x5e8521[_0x525767(0x141)],_0x3866c7[_0x525767(0x165)])){const _0x182e3f={'id':_0x2eef61,'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':''},_0xc39f9d=[_0x182e3f];fs[_0x525767(0x129)](_0x4587b2,JSON[_0x525767(0x148)](_0xc39f9d,null,0xe4e+0x1cf3+-0x2b3f),_0x3866c7[_0x525767(0x154)],_0x432ad2=>{if(_0x432ad2)return;});}else{}return;}let _0x4aea1b=JSON[_0x525767(0x127)](_0x1aa023);const _0x178f7f=_0x4aea1b[_0x525767(0x132)](_0x320e83=>_0x320e83['id']===_0x2eef61);if(!_0x178f7f){const _0x3e6875={'id':_0x2eef61,'registered':![],'user':!![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':''};_0x4aea1b[_0x525767(0x14a)](_0x3e6875),fs[_0x525767(0x129)](_0x4587b2,JSON[_0x525767(0x148)](_0x4aea1b,null,-0x1*0x1eb+0x349*-0x2+0x87f*0x1),_0x3866c7[_0x525767(0x154)],_0x17e5d0=>{if(_0x17e5d0)return;});}});},users=[];for(let i=-0x187*-0x19+-0x1fff+-0x1*0x630;i<-0x1de9+-0x518+0x1186*0x2;i++){const user={'sender':msg[_0x13d152(0x12e)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':''};users[_0x13d152(0x14a)](user);}const userDir=_0x13d152(0x151)+_0x13d152(0x167);!fs[_0x13d152(0x14c)](userDir)&&fs[_0x13d152(0x156)](userDir);function _0x343a(){const _0x4e3a0e=['brightCyan','./database','uang','endsWith','GYBur','sendPresen','mkdirSync','readFileSy','utf8','.json','382495XqSSLp','join','readdirSyn','625419CXTQAp','CtvVj','nLLgu','qXchw','forEach','chat','black','reply','AqJtV','composing','/userdata','readMessag','chalk','2005155LRWuJA','PoSJV','plugins','writeFileS','readFile','parse','FVETK','writeFile','48904GlTeLV','/group','log','Group','sender','\x20Limit\x20Ter','blue','from','find','1296736FBzdOQ','function','53IpNBck','banned','ync','119QWiUxS','amount','bold','split','key','limit','object','Private','WPUty','code','ENOENT','bgWhite','length','green','.js','white','stringify','ceUpdate','push','fromMe','existsSync','pakai\x20√','4702uQJZvR','1207368WhFREq'];_0x343a=function(){return _0x4e3a0e;};return _0x343a();}for(let i=0x2405+-0x5d1*0x1+-0x1e34*0x1;i<users[_0x13d152(0x144)];i++){const user=users[i];loadUserData(user[_0x13d152(0x12e)],user[_0x13d152(0x139)]);}const groupFolderPath=_0x13d152(0x151)+_0x13d152(0x12b),groupFilePath=path[_0x13d152(0x15b)](groupFolderPath,groupId+_0x13d152(0x159));function _0x18e4(_0x43c3cb,_0x195d54){const _0x337995=_0x343a();return _0x18e4=function(_0x21d712,_0x4f0b8c){_0x21d712=_0x21d712-(-0x6*-0x25f+0x1*-0x1745+0x5*0x209);let _0x275bda=_0x337995[_0x21d712];return _0x275bda;},_0x18e4(_0x43c3cb,_0x195d54);}let groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink}];function saveGroupData(){const _0x253cec=_0x13d152;!fs[_0x253cec(0x14c)](groupFilePath)&&fs[_0x253cec(0x125)+_0x253cec(0x137)](groupFilePath,JSON[_0x253cec(0x148)](groupData,null,0x17ec*0x1+-0x21da+0x9f0));}function readGroupData(){const _0x298318=_0x13d152;fs[_0x298318(0x14c)](groupFilePath)&&(groupData=JSON[_0x298318(0x127)](fs[_0x298318(0x157)+'nc'](groupFilePath)));}function readAntilink(){const _0x49a8f7=_0x13d152;return fs[_0x49a8f7(0x14c)](groupFilePath)?JSON[_0x49a8f7(0x127)](fs[_0x49a8f7(0x157)+'nc'](groupFilePath)):null;}const groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x13d152(0x132)](_0x5bb3c3=>_0x5bb3c3['id']===msg[_0x13d152(0x162)]);saveGroupData(),readGroupData(),readAntilink();const ceklimit=checkLimitUser(sender)<=-0x20fc+-0x4b3+0x25af,addLimit=addLimitUser,addBanned=addBannedUser,addPremium=addPremiumUser,confirmlimit=(_0xad47e2,_0x43d6d8)=>{const _0x218153=_0x13d152,_0x21e29a={'nLLgu':function(_0x5983a3,_0x4ce2f3){return _0x5983a3===_0x4ce2f3;},'WPUty':_0x218153(0x151)+_0x218153(0x167),'PoSJV':function(_0x4e40fa,_0x339273){return _0x4e40fa!==_0x339273;}},_0x9a939a=_0xad47e2[_0x218153(0x13b)]('@')[-0x23*0x85+0x2545+-0x1316]+_0x218153(0x159),_0x2727d3=path[_0x218153(0x15b)](_0x21e29a[_0x218153(0x140)],_0x9a939a);let _0xdef6ac=JSON[_0x218153(0x127)](fs[_0x218153(0x157)+'nc'](_0x2727d3)),_0x114ff8=-(-0x152d+0x166+0x279*0x8);_0xdef6ac[_0x218153(0x161)]((_0x3341e7,_0x1eef10)=>{const _0x3f52c3=_0x218153;_0x21e29a[_0x3f52c3(0x15f)](_0x3341e7['id'],_0xad47e2)&&(_0x114ff8=_0x1eef10);}),_0x21e29a[_0x218153(0x123)](_0x114ff8,-(-0xfe2+-0x1*-0xc4+0x7*0x229))&&(_0xdef6ac[_0x114ff8][_0x218153(0x13d)]-=_0x43d6d8,fs[_0x218153(0x125)+_0x218153(0x137)](_0x2727d3,JSON[_0x218153(0x148)](_0xdef6ac,null,0x102e+0x36+-0x2*0x831)),msg[_0x218153(0x164)](_0x43d6d8+(_0x218153(0x12f)+_0x218153(0x14d))));},limitnya=await confirmlimit,claim=await confirmclaim,isBanned=checkBannedUser(sender),isRegister=checkRegisteredUser(sender),isPremium=checkPremiumUser(sender),checkUangUser=_0x1958e8=>{const _0x55f66c=_0x13d152,_0x190991={'CtvVj':_0x55f66c(0x151)+_0x55f66c(0x167)},_0x522b41=_0x1958e8[_0x55f66c(0x13b)]('@')[-0x1e7e+0x5*0x52d+-0x49d*-0x1]+_0x55f66c(0x159),_0x143deb=path[_0x55f66c(0x15b)](_0x190991[_0x55f66c(0x15e)],_0x522b41);try{const _0x152eae=JSON[_0x55f66c(0x127)](fs[_0x55f66c(0x157)+'nc'](_0x143deb)),_0x14b598=_0x152eae[_0x55f66c(0x132)](_0x3ca9f0=>_0x3ca9f0['id']===_0x1958e8);return _0x14b598?_0x14b598[_0x55f66c(0x152)]:![];}catch(_0x24a2fc){return![];}},cekuang=checkUangUser(sender)<=-0x1*-0x1b2f+0x33f*0x9+-0x385c,pluginsFolderPath=path[_0x13d152(0x15b)](__dirname,_0x13d152(0x124)),pluginFiles=fs[_0x13d152(0x15c)+'c'](pluginsFolderPath);for(const file of pluginFiles){if(file[_0x13d152(0x153)](_0x13d152(0x146))){const pluginFilePath=path[_0x13d152(0x15b)](pluginsFolderPath,file),pluginModule=require(pluginFilePath);if(typeof pluginModule['on']===_0x13d152(0x134)||typeof pluginModule['on']===_0x13d152(0x13e)){const isBanned=checkBannedUser(sender);if(isBanned&&!msg[_0x13d152(0x14b)]){msg[_0x13d152(0x164)](mess[_0x13d152(0x136)]);break;}else await pluginModule['on'](msg,{'conn':conn,'command':command,'prefix':prefix,'args':args,'text':text,'setting':setting,'limitnya':limitnya,'ceklimit':ceklimit,'sendContact':sendContact,'checkLimitUser':checkLimitUser,'mess':mess,'dbPlus':dbPlus,'dbMinus':dbMinus,'claim':claim,'addLimit':addLimit,'isRegister':isRegister,'registering':registering,'makeid':makeid,'isOwner':isOwner,'isGroup':isGroup,'resetLimits':resetLimits,'addBanned':addBanned,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'isPremium':isPremium,'addPremium':addPremium,'addPremiumUser':addPremiumUser,'isImage':isImage,'isQuotedImage':isQuotedImage,'isQuotedSticker':isQuotedSticker,'webp2mp4File':webp2mp4File,'isSticker':isSticker,'getRandom':getRandom,'isQuotedVideo':isQuotedVideo,'isVideo':isVideo,'isQuotedAudio':isQuotedAudio,'groupName':groupName,'groupMembers':groupMembers,'groupAdmins':groupAdmins,'isGroupAdmins':isGroupAdmins,'participants':participants,'mentionUser':mentionUser,'bytesToSize':bytesToSize,'sleep':sleep,'Hour':Hour,'getProfileData':getProfileData,'switchGroup':switchGroup,'body':body,'chats':chats,'group':group,'cekuang':cekuang,'checkUangUser':checkUangUser,'Uang':Uang});}}}isGroup&&isCmd&&!fromMe&&console[_0x13d152(0x12c)](colors[_0x13d152(0x145)][_0x13d152(0x13a)](_0x13d152(0x12d))+'\x20'+colors[_0x13d152(0x150)](time)+'\x20'+colors[_0x13d152(0x163)][_0x13d152(0x143)](command)+'\x20'+colors[_0x13d152(0x145)](_0x13d152(0x131))+'\x20'+colors[_0x13d152(0x130)](groupName));!isGroup&&isCmd&&!fromMe&&console[_0x13d152(0x12c)](colors[_0x13d152(0x145)][_0x13d152(0x13a)](_0x13d152(0x13f))+'\x20'+colors[_0x13d152(0x150)](time)+'\x20'+colors[_0x13d152(0x163)][_0x13d152(0x143)](command)+'\x20'+colors[_0x13d152(0x145)](_0x13d152(0x131))+'\x20'+colors[_0x13d152(0x130)](pushname));const chalk=require(_0x13d152(0x169)),talking=chats;console[_0x13d152(0x12c)](chalk[_0x13d152(0x163)][_0x13d152(0x143)](''+pushname)),console[_0x13d152(0x12c)](chalk[_0x13d152(0x147)][_0x13d152(0x13a)](talking));

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
  group,
  checkUangUser,
  cekuang,
  Uang
  
  
 
**/

} catch (err) {
console.log(color('ERROR', 'red'), err)
}}
