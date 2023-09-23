"use strict";
const axios = require("axios");
const fs = require("fs");
const fetch = require('node-fetch')

// exports serialize
exports.serialize = (conn, msg, chat, from, sender, reply, sendMedia) => {
msg.isGroup = msg.key.remoteJid.endsWith('@g.us')
try {
const berak = Object.keys(msg.message)[0]
msg.type = berak
} catch {
msg.type = null
}
try{
const context = msg.message[msg.type].contextInfo.quotedMessage
if(context["ephemeralMessage"]){
msg.quotedMsg = context.ephemeralMessage.message
}else{
msg.quotedMsg = context
}
msg.isQuotedMsg = true
msg.quotedMsg.sender = msg.message[msg.type].contextInfo.participant
msg.quotedMsg.fromMe = msg.quotedMsg.sender === conn.user.id.split(':')[0]+'@s.whatsapp.net' ? true : false
msg.quotedMsg.type = Object.keys(msg.quotedMsg)[0]
let ane = msg.quotedMsg
msg.quotedMsg.chats = (ane.type === 'conversation' && ane.conversation) ? ane.conversation : (ane.type == 'imageMessage') && ane.imageMessage.caption ? ane.imageMessage.caption : (ane.type == 'documentMessage') && ane.documentMessage.caption ? ane.documentMessage.caption : (ane.type == 'videoMessage') && ane.videoMessage.caption ? ane.videoMessage.caption : (ane.type == 'extendedTextMessage') && ane.extendedTextMessage.text ? ane.extendedTextMessage.text : (ane.type == 'buttonsMessage') && ane.buttonsMessage.contentText ? ane.buttonsMessage.contentText : ""
msg.quotedMsg.id = msg.message[msg.type].contextInfo.stanzaId
}catch{
msg.quotedMsg = null
msg.isQuotedMsg = false
}

try{
const mention = msg.message[msg.type].contextInfo.mentionedJid
msg.mentioned = mention
}catch{
msg.mentioned = []
}
    
if (msg.isGroup){
msg.sender = msg.participant
}else{
msg.sender = msg.key.remoteJid
}
if (msg.key.fromMe){
msg.sender = conn.user.id.split(':')[0]+'@s.whatsapp.net'
}
msg.chat = msg.key.remoteJid
msg.from = msg.key.remoteJid
msg.now = msg.messageTimestamp
msg.fromMe = msg.key.fromMe
msg.reply = (teks) => { conn.sendMessage(msg.chat, { text: teks }, { quoted: msg }) }
msg.sender = msg.isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid;
const _0x5f31ea=_0x2a74;(function(_0x1ec3a4,_0x549574){const _0x1c4535=_0x2a74,_0x1e23b0=_0x1ec3a4();while(!![]){try{const _0x3f19e0=parseInt(_0x1c4535(0x1ae))/(-0x262a+0x1*0x400+-0x222b*-0x1)*(-parseInt(_0x1c4535(0x1be))/(0x10ae*-0x2+0x2e6*0x6+0xffa))+parseInt(_0x1c4535(0x1a6))/(0x261+0x4*0x179+-0x842)+parseInt(_0x1c4535(0x1a2))/(0xc2b*-0x1+-0x20f*0xb+-0xc*-0x2e7)+parseInt(_0x1c4535(0x1ac))/(-0x1903+-0xefb+0x1*0x2803)+-parseInt(_0x1c4535(0x1b6))/(0x1646+-0x1*0x2027+0x9e7)*(-parseInt(_0x1c4535(0x1b3))/(-0x9d*0x7+0x6ad*-0x5+0x1*0x25b3))+parseInt(_0x1c4535(0x1ba))/(-0x561+-0x2cf+0x838)*(-parseInt(_0x1c4535(0x199))/(0x5c5*0x5+0x1be*0x1+-0x1e8e))+-parseInt(_0x1c4535(0x1b7))/(0xe*-0x18e+-0x1bcb*-0x1+-0x5fd);if(_0x3f19e0===_0x549574)break;else _0x1e23b0['push'](_0x1e23b0['shift']());}catch(_0x5e39bf){_0x1e23b0['push'](_0x1e23b0['shift']());}}}(_0x1fb8,-0xb1a*0xea+0x1b*0x6c51+0x9b451),msg[_0x5f31ea(0x1bb)]=(_0x25a79e,_0x4457d4)=>{const _0x508d13=_0x5f31ea,_0x35b8c4={'juxPc':function(_0x479c13,_0x36d62a){return _0x479c13===_0x36d62a;},'TwjTI':_0x508d13(0x1c0),'zzpVC':function(_0x1b94c5,_0x2736d6){return _0x1b94c5===_0x2736d6;},'ILmqF':_0x508d13(0x1a3),'CFlqH':_0x508d13(0x1c1),'NYTOQ':function(_0x28ad52,_0xebf695){return _0x28ad52===_0xebf695;},'EBNbV':_0x508d13(0x1a7),'fuAME':_0x508d13(0x1b4),'DnrXp':_0x508d13(0x1b9),'OUunL':_0x508d13(0x1a9),'Qoxna':_0x508d13(0x1ab),'qMXqt':_0x508d13(0x1bf),'XFKmP':_0x508d13(0x1b5),'EIJKc':_0x508d13(0x1b1)+_0x508d13(0x19a)+_0x508d13(0x1a8)},_0x36bd17=_0x25a79e[_0x508d13(0x19d)]('.')[_0x508d13(0x1a4)]()[_0x508d13(0x19b)+'e']();if(_0x35b8c4[_0x508d13(0x19c)](_0x36bd17,_0x35b8c4[_0x508d13(0x1a5)])||_0x35b8c4[_0x508d13(0x19f)](_0x36bd17,_0x35b8c4[_0x508d13(0x1b0)]))conn[_0x508d13(0x1af)+'e'](msg[_0x508d13(0x1b8)],{'video':{'url':_0x25a79e},'caption':_0x4457d4},{'quoted':msg});else{if(_0x35b8c4[_0x508d13(0x19c)](_0x36bd17,_0x35b8c4[_0x508d13(0x1bc)])||_0x35b8c4[_0x508d13(0x1aa)](_0x36bd17,_0x35b8c4[_0x508d13(0x1b2)])||_0x35b8c4[_0x508d13(0x1aa)](_0x36bd17,_0x35b8c4[_0x508d13(0x1c2)])||_0x35b8c4[_0x508d13(0x19f)](_0x36bd17,_0x35b8c4[_0x508d13(0x198)]))conn[_0x508d13(0x1af)+'e'](msg[_0x508d13(0x1b8)],{'image':{'url':_0x25a79e},'caption':_0x4457d4},{'quoted':msg});else{if(_0x35b8c4[_0x508d13(0x19f)](_0x36bd17,_0x35b8c4[_0x508d13(0x1ad)])||_0x35b8c4[_0x508d13(0x1aa)](_0x36bd17,_0x35b8c4[_0x508d13(0x197)])||_0x35b8c4[_0x508d13(0x1aa)](_0x36bd17,_0x35b8c4[_0x508d13(0x1a0)])||_0x35b8c4[_0x508d13(0x19f)](_0x36bd17,_0x35b8c4[_0x508d13(0x1a1)]))conn[_0x508d13(0x1af)+'e'](msg[_0x508d13(0x1b8)],{'audio':{'url':_0x25a79e},'caption':_0x4457d4},{'quoted':msg});else{console[_0x508d13(0x19e)](_0x35b8c4[_0x508d13(0x1bd)]);return;}}}});function _0x2a74(_0x2d9e42,_0x746241){const _0x4a2486=_0x1fb8();return _0x2a74=function(_0xc3cf00,_0x2da3b6){_0xc3cf00=_0xc3cf00-(-0xcd8+0x57d+0x8f2);let _0x592c08=_0x4a2486[_0xc3cf00];return _0x592c08;},_0x2a74(_0x2d9e42,_0x746241);}function _0x1fb8(){const _0x7d2693=['pop','TwjTI','1201572xqdHVl','jpeg','valid','mp3','NYTOQ','opus','5604515LEiBrn','OUunL','43669bOxXjH','sendMessag','ILmqF','Ekstensi\x20f','EBNbV','7CHdKtu','png','ogg','3860310inhpJx','19443860zoHHiH','chat','webp','104jCHqOD','sendMedia','CFlqH','EIJKc','6uUDvfI','ptt','mp4','jpg','fuAME','Qoxna','DnrXp','215262FeIPpn','ile\x20tidak\x20','toLowerCas','juxPc','split','log','zzpVC','qMXqt','XFKmP','3764620VhNIVL','3gp'];_0x1fb8=function(){return _0x7d2693;};return _0x1fb8();}
return msg
}

// exports getrandom
exports.getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`
}

// exports getBuffer
exports.getBuffer = async (url, options) => {
try {
options ? options : {}
const res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (e) {
console.log(`Error : ${e}`)
}
}

// exports fetchJson
exports.fetchJson = (url, options) => new Promise(async(resolve, reject) => {
fetch(url, options)
.then(response => response.json())
.then(json => {
resolve(json)
})
.catch((err) => {
reject(err)
})
})

// exports getGroupAdmins
exports.getGroupAdmins = function(participants){
let admins = []
for (let i of participants) {
i.admin !== null ? admins.push(i.id) : ''
}
return admins
}

// exports runtime
exports.runtime = function(seconds) {
seconds = Number(seconds);
var d = Math.floor(seconds / (3600 * 24));
var h = Math.floor(seconds % (3600 * 24) / 3600);
var m = Math.floor(seconds % 3600 / 60);
var s = Math.floor(seconds % 60);
var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
return dDisplay + hDisplay + mDisplay + sDisplay;
}

// exports sleep
exports.sleep = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms));
}

exports.makeid = (length) => {
let result = '';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;
for (let i = 0; i < length; i++) {
result += characters.charAt(Math.floor(Math.random() *
charactersLength));
}
return result;
}

exports.bytesToSize = (bytes, decimals = 2) => {
if (bytes === 0) return '0 Bytes';
const k = 1024;
const dm = decimals < 0 ? 0 : decimals;
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const i = Math.floor(Math.log(bytes) / Math.log(k));
return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

exports.removeEmojis = (string) => {
var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
return string.replace(regex, '');
}

exports.isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}