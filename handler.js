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
const isOwner = setting.ownerNumber == msg.sender || [`${setting.contact}@s.whatsapp.net`].includes(msg.sender);
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
function _0x34bb(){const _0x30e2dc=['8MUUcnX','OnlyOwner','16190lCDURS','slice','inspect','=>\x20{\x20retur','6953107CFApEC','(async\x20()\x20','20105vqbkAX','format','\x20})()','startsWith','6985VHZWbt','stringify','1048zpxoqb','8006760ywKuqe','1496055AUpnhw','util','OzCUF','string','reply','762214hJogNL','5841ajNBaI','67092jJjHcB','3MhBjhC'];_0x34bb=function(){return _0x30e2dc;};return _0x34bb();}function _0x284b(_0x26cc55,_0x316dd8){const _0x4ff390=_0x34bb();return _0x284b=function(_0x43f55c,_0x1bd318){_0x43f55c=_0x43f55c-(-0x1*0x2171+0x22e+0x212a);let _0x49811d=_0x4ff390[_0x43f55c];return _0x49811d;},_0x284b(_0x26cc55,_0x316dd8);}const _0x346faa=_0x284b;(function(_0x53de3a,_0xef2061){const _0x139bf7=_0x284b,_0x1fc26b=_0x53de3a();while(!![]){try{const _0x4b2db0=parseInt(_0x139bf7(0x1e7))/(0x7c*0xd+-0x1b3a+-0xe9*-0x17)+-parseInt(_0x139bf7(0x1ec))/(-0x2d4+0x3*-0x47f+0x1053)*(-parseInt(_0x139bf7(0x1ef))/(0x25ee+-0x4*-0x6e7+-0xd1b*0x5))+-parseInt(_0x139bf7(0x1fe))/(-0x1e9+-0x1471*-0x1+0x942*-0x2)*(-parseInt(_0x139bf7(0x1f8))/(0xb5*0x24+-0x257*-0x1+-0x4f*0x5a))+parseInt(_0x139bf7(0x1ff))/(-0x71*-0x1+0xd6d+-0x8*0x1bb)+parseInt(_0x139bf7(0x1f6))/(-0x2*0x824+-0x335+0x2*0x9c2)*(-parseInt(_0x139bf7(0x1f0))/(0x1a38+-0x7a1*-0x1+-0x21d1))+-parseInt(_0x139bf7(0x1ed))/(-0x115+-0x3*0xb23+0x2287)*(-parseInt(_0x139bf7(0x1f2))/(-0xa09+0x1af5+-0x2*0x871))+parseInt(_0x139bf7(0x1fc))/(0x33b*0x8+0x152b+0x8*-0x5df)*(-parseInt(_0x139bf7(0x1ee))/(0x187e+0x1*0x1c0b+-0x347d));if(_0x4b2db0===_0xef2061)break;else _0x1fc26b['push'](_0x1fc26b['shift']());}catch(_0x4e15cf){_0x1fc26b['push'](_0x1fc26b['shift']());}}}(_0x34bb,0x53*-0x3ce6+-0x51*-0x6e1+0x1d5a0e));if(body[_0x346faa(0x1fb)]('=>')){if(!isOwner)return msg[_0x346faa(0x1eb)](mess[_0x346faa(0x1f1)]);function Return(_0x4accab){const _0x2154ad=_0x346faa,_0x1275d1={'OzCUF':function(_0x4b8df9,_0x1204f4){return _0x4b8df9==_0x1204f4;}};return sat=JSON[_0x2154ad(0x1fd)](_0x4accab,null,-0x236c+0x7*0x395+0xa5b*0x1),bang=util[_0x2154ad(0x1f9)](sat),_0x1275d1[_0x2154ad(0x1e9)](sat,undefined)&&(bang=util[_0x2154ad(0x1f9)](_0x4accab)),msg[_0x2154ad(0x1eb)](bang);}try{msg[_0x346faa(0x1eb)](util[_0x346faa(0x1f9)](eval(_0x346faa(0x1f7)+_0x346faa(0x1f5)+'n\x20'+body[_0x346faa(0x1f3)](-0x1dea+0x1*-0x1df5+0x3be2)+_0x346faa(0x1fa))));}catch(_0x56b28e){msg[_0x346faa(0x1eb)](String(_0x56b28e));}}if(body[_0x346faa(0x1fb)]('>')){if(!isOwner)return msg[_0x346faa(0x1eb)](mess[_0x346faa(0x1f1)]);try{let evaled=await eval(body[_0x346faa(0x1f3)](0x16d9*0x1+-0x205e+0x10f*0x9));if(typeof evaled!==_0x346faa(0x1ea))evaled=require(_0x346faa(0x1e8))[_0x346faa(0x1f4)](evaled);await msg[_0x346faa(0x1eb)](evaled);}catch(_0x2f293c){await msg[_0x346faa(0x1eb)](String(_0x2f293c));}}if(body[_0x346faa(0x1fb)]('$')){if(!isOwner)return msg[_0x346faa(0x1eb)](mess[_0x346faa(0x1f1)]);exec(body[_0x346faa(0x1f3)](0x19c*-0x5+0x2678+-0x1e6a),(_0x49c717,_0x218517)=>{const _0x4135d5=_0x346faa;if(_0x49c717)return msg[_0x4135d5(0x1eb)](_0x49c717);if(_0x218517)return msg[_0x4135d5(0x1eb)](_0x218517);});}

// ########################################## //
/**START LOAD
  *LOAD USER DATA
*/
const _0x44a1f0=_0x2b6b;function _0x258a(){const _0x596b89=['bgWhite','readFile','limit','code','stringify','blue','.json','banned','function','object','existsSync','/userdata','white','mkdirSync','plugins','8ZFtUIu','ync','fromMe','Private','log','51144dchtvr','sender','DXrLZ','endsWith','chat','.js','ENOENT','YnHUG','from','Group','3030872iXzSCa','split','415080IwFIKH','parse','351bGerNN','writeFileS','1830720iNLndF','sendPresen','writeFile','join','key','utkgb','brightCyan','find','readdirSyn','forEach','utf8','./database','black','length','snDfr','opJUb','bold','ceUpdate','amount','512250cUIOwx','236118ldbScv','chalk','pakai\x20√','5aEAkwQ','readFileSy','reply','push','SLeCB','JWKJd','green','6981401cduCni','/group','recording','\x20Limit\x20Ter','readMessag'];_0x258a=function(){return _0x596b89;};return _0x258a();}(function(_0x24139b,_0x3eb897){const _0x183bb5=_0x2b6b,_0x46e0b5=_0x24139b();while(!![]){try{const _0xaebb93=parseInt(_0x183bb5(0xef))/(0x1b26+0xdba*-0x2+0x1*0x4f)*(parseInt(_0x183bb5(0xd1))/(0xb54+0xb*-0x2f5+0x1535))+-parseInt(_0x183bb5(0xbd))/(0x96e+-0xd2c+0x3c1)+-parseInt(_0x183bb5(0xfe))/(-0x20c7+-0x13bf*0x1+-0x19*-0x21a)+-parseInt(_0x183bb5(0xd4))/(0xb*0xad+-0x3*-0x18a+-0x2c*0x46)*(parseInt(_0x183bb5(0xf4))/(-0x20b4+0x233*-0x2+0x2520))+-parseInt(_0x183bb5(0xdb))/(-0x1*-0x210d+-0x7d8+-0x192e)+parseInt(_0x183bb5(0xb9))/(-0x219d*-0x1+0x257d+-0x4712)+parseInt(_0x183bb5(0xbb))/(0x80*-0x12+-0xe*0x22d+0x277f)*(parseInt(_0x183bb5(0xd0))/(0x1ec*-0x5+-0x186c+0x2212));if(_0xaebb93===_0x3eb897)break;else _0x46e0b5['push'](_0x46e0b5['shift']());}catch(_0x16604b){_0x46e0b5['push'](_0x46e0b5['shift']());}}}(_0x258a,0x7*-0x690b+0x96ef+0x5*0x2597d),conn[_0x44a1f0(0xdf)+'es']([msg[_0x44a1f0(0xc1)]]),conn[_0x44a1f0(0xbe)+_0x44a1f0(0xce)](_0x44a1f0(0xdd),msg[_0x44a1f0(0xf8)]));const loadUserData=(_0x470e75,_0x5e91e3)=>{const _0x5aa4d8=_0x44a1f0,_0x481b98={'opJUb':function(_0x497d44,_0x3bab4a){return _0x497d44===_0x3bab4a;},'DXrLZ':_0x5aa4d8(0xfa),'SLeCB':_0x5aa4d8(0xc7),'JWKJd':_0x5aa4d8(0xc8)+_0x5aa4d8(0xeb)},_0x3e7d4d=_0x470e75[_0x5aa4d8(0xb8)]('@')[0x1c3e+0x1*-0x28d+0x1*-0x19b1]+_0x5aa4d8(0xe6),_0x223f85=path[_0x5aa4d8(0xc0)](_0x481b98[_0x5aa4d8(0xd9)],_0x3e7d4d);fs[_0x5aa4d8(0xe1)](_0x223f85,_0x481b98[_0x5aa4d8(0xd8)],(_0x2cdbde,_0x27d3f3)=>{const _0x28729d=_0x5aa4d8;if(_0x2cdbde){if(_0x481b98[_0x28729d(0xcc)](_0x2cdbde[_0x28729d(0xe3)],_0x481b98[_0x28729d(0xf6)])){const _0x3afcf9={'id':_0x470e75,'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':''},_0x929c3b=[_0x3afcf9];fs[_0x28729d(0xbf)](_0x223f85,JSON[_0x28729d(0xe4)](_0x929c3b,null,-0x71d*-0x1+-0x252a+0x1e0f),_0x481b98[_0x28729d(0xd8)],_0x262237=>{if(_0x262237)return;});}else{}return;}let _0x387282=JSON[_0x28729d(0xba)](_0x27d3f3);const _0x4e48b2=_0x387282[_0x28729d(0xc4)](_0x3d78da=>_0x3d78da['id']===_0x470e75);if(!_0x4e48b2){const _0x364c28={'id':_0x470e75,'registered':![],'user':!![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':''};_0x387282[_0x28729d(0xd7)](_0x364c28),fs[_0x28729d(0xbf)](_0x223f85,JSON[_0x28729d(0xe4)](_0x387282,null,0x1*0x110f+-0x21d9+0xa*0x1ae),_0x481b98[_0x28729d(0xd8)],_0x347aa7=>{if(_0x347aa7)return;});}});},users=[];for(let i=-0x5f2+0x2*-0xb85+0x1cfc;i<0x1701+-0x3e*-0x1f+-0x1e78;i++){const user={'sender':msg[_0x44a1f0(0xf5)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':''};users[_0x44a1f0(0xd7)](user);}const userDir=_0x44a1f0(0xc8)+_0x44a1f0(0xeb);!fs[_0x44a1f0(0xea)](userDir)&&fs[_0x44a1f0(0xed)](userDir);for(let i=0xa1*-0x35+-0x3c1+0x2516;i<users[_0x44a1f0(0xca)];i++){const user=users[i];loadUserData(user[_0x44a1f0(0xf5)],user[_0x44a1f0(0xcf)]);}const groupFolderPath=_0x44a1f0(0xc8)+_0x44a1f0(0xdc),groupFilePath=path[_0x44a1f0(0xc0)](groupFolderPath,groupId+_0x44a1f0(0xe6));let groupData=[{'id':groupId,'name':groupName,'welcome':welcome}];function saveGroupData(){const _0x498ac8=_0x44a1f0;!fs[_0x498ac8(0xea)](groupFilePath)&&fs[_0x498ac8(0xbc)+_0x498ac8(0xf0)](groupFilePath,JSON[_0x498ac8(0xe4)](groupData,null,0x1419+-0x1eee+-0x6f*-0x19));}function readGroupData(){const _0x5952cd=_0x44a1f0;fs[_0x5952cd(0xea)](groupFilePath)&&(groupData=JSON[_0x5952cd(0xba)](fs[_0x5952cd(0xd5)+'nc'](groupFilePath)));}saveGroupData(),readGroupData();const ceklimit=checkLimitUser(sender)<=0x170e+-0x14c+-0x15c2,addLimit=addLimitUser,addBanned=addBannedUser,addPremium=addPremiumUser,confirmlimit=(_0x19b6ea,_0x238949)=>{const _0x4d0e66=_0x44a1f0,_0x3cb858={'utkgb':function(_0x23ef5a,_0x3a9476){return _0x23ef5a===_0x3a9476;},'YnHUG':_0x4d0e66(0xc8)+_0x4d0e66(0xeb),'snDfr':function(_0x2e9571,_0x56af70){return _0x2e9571!==_0x56af70;}},_0x1991ac=_0x19b6ea[_0x4d0e66(0xb8)]('@')[0x1*-0x269+-0x1f2b+-0x2*-0x10ca]+_0x4d0e66(0xe6),_0x3bd277=path[_0x4d0e66(0xc0)](_0x3cb858[_0x4d0e66(0xfb)],_0x1991ac);let _0x26318c=JSON[_0x4d0e66(0xba)](fs[_0x4d0e66(0xd5)+'nc'](_0x3bd277)),_0x3544a3=-(-0xc3f+-0xd*0x24b+0x6f*0x61);_0x26318c[_0x4d0e66(0xc6)]((_0x5eb78e,_0x469c62)=>{const _0x5dc0fe=_0x4d0e66;_0x3cb858[_0x5dc0fe(0xc2)](_0x5eb78e['id'],_0x19b6ea)&&(_0x3544a3=_0x469c62);}),_0x3cb858[_0x4d0e66(0xcb)](_0x3544a3,-(0xb58+-0xb*-0x102+-0x166d))&&(_0x26318c[_0x3544a3][_0x4d0e66(0xe2)]-=_0x238949,fs[_0x4d0e66(0xbc)+_0x4d0e66(0xf0)](_0x3bd277,JSON[_0x4d0e66(0xe4)](_0x26318c,null,0x153b*-0x1+0x1302+0x23b*0x1)),msg[_0x4d0e66(0xd6)](_0x238949+(_0x4d0e66(0xde)+_0x4d0e66(0xd3))));},limitnya=await confirmlimit,claim=await confirmclaim,isBanned=checkBannedUser(sender),isRegister=checkRegisteredUser(sender),isPremium=checkPremiumUser(sender),pluginsFolderPath=path[_0x44a1f0(0xc0)](__dirname,_0x44a1f0(0xee)),pluginFiles=fs[_0x44a1f0(0xc5)+'c'](pluginsFolderPath);for(const file of pluginFiles){if(file[_0x44a1f0(0xf7)](_0x44a1f0(0xf9))){const pluginFilePath=path[_0x44a1f0(0xc0)](pluginsFolderPath,file),pluginModule=require(pluginFilePath);if(typeof pluginModule['on']===_0x44a1f0(0xe8)||typeof pluginModule['on']===_0x44a1f0(0xe9)){const isBanned=checkBannedUser(sender);if(isBanned&&!msg[_0x44a1f0(0xf1)]){msg[_0x44a1f0(0xd6)](mess[_0x44a1f0(0xe7)]);break;}else await pluginModule['on'](msg,{'conn':conn,'command':command,'prefix':prefix,'args':args,'text':text,'setting':setting,'limitnya':limitnya,'ceklimit':ceklimit,'sendContact':sendContact,'checkLimitUser':checkLimitUser,'mess':mess,'dbPlus':dbPlus,'dbMinus':dbMinus,'claim':claim,'addLimit':addLimit,'isRegister':isRegister,'registering':registering,'makeid':makeid,'isOwner':isOwner,'isGroup':isGroup,'resetLimits':resetLimits,'addBanned':addBanned,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'isPremium':isPremium,'addPremium':addPremium,'addPremiumUser':addPremiumUser,'isImage':isImage,'isQuotedImage':isQuotedImage,'isQuotedSticker':isQuotedSticker,'webp2mp4File':webp2mp4File,'isSticker':isSticker,'getRandom':getRandom,'isQuotedVideo':isQuotedVideo,'isVideo':isVideo,'isQuotedAudio':isQuotedAudio,'groupName':groupName,'groupMembers':groupMembers,'groupAdmins':groupAdmins,'isGroupAdmins':isGroupAdmins,'participants':participants,'mentionUser':mentionUser,'bytesToSize':bytesToSize,'sleep':sleep,'Hour':Hour,'getProfileData':getProfileData,'switchGroup':switchGroup});}}}isGroup&&isCmd&&!fromMe&&console[_0x44a1f0(0xf3)](colors[_0x44a1f0(0xda)][_0x44a1f0(0xcd)](_0x44a1f0(0xfd))+'\x20'+colors[_0x44a1f0(0xc3)](time)+'\x20'+colors[_0x44a1f0(0xc9)][_0x44a1f0(0xe0)](command)+'\x20'+colors[_0x44a1f0(0xda)](_0x44a1f0(0xfc))+'\x20'+colors[_0x44a1f0(0xe5)](groupName));!isGroup&&isCmd&&!fromMe&&console[_0x44a1f0(0xf3)](colors[_0x44a1f0(0xda)][_0x44a1f0(0xcd)](_0x44a1f0(0xf2))+'\x20'+colors[_0x44a1f0(0xc3)](time)+'\x20'+colors[_0x44a1f0(0xc9)][_0x44a1f0(0xe0)](command)+'\x20'+colors[_0x44a1f0(0xda)](_0x44a1f0(0xfc))+'\x20'+colors[_0x44a1f0(0xe5)](pushname));function _0x2b6b(_0x2be89b,_0x311301){const _0x12b72f=_0x258a();return _0x2b6b=function(_0x2c09bf,_0x2b7795){_0x2c09bf=_0x2c09bf-(0x1c9a+-0x9f+-0x7*0x3e5);let _0x5c7e6e=_0x12b72f[_0x2c09bf];return _0x5c7e6e;},_0x2b6b(_0x2be89b,_0x311301);}const chalk=require(_0x44a1f0(0xd2)),talking=chats;console[_0x44a1f0(0xf3)](chalk[_0x44a1f0(0xc9)][_0x44a1f0(0xe0)](''+pushname)),console[_0x44a1f0(0xf3)](chalk[_0x44a1f0(0xec)][_0x44a1f0(0xcd)](talking));
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
