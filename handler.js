process.on('uncaughtException', console.error)
import chalk from 'chalk'
import { color } from './lib/Data_Server_Bot/Console_Data.js'
import { dbPlus, dbMinus, getProfileData, checkLimitUser, addLimitUser, addBannedUser, addPremiumUser, resetLimits, confirmclaim, Hour, Uang, Kupon, checkBannedUser, checkRegisteredUser, registering, checkPremiumUser, switchGroup } from "./lib/database.js"
import { 
  isUrl, 
  getGroupAdmins, 
  bytesToSize, 
  sleep, 
  makeid 
 } from "./lib/func_Server.js"
import {
  setting_JSON, 
  mess_JSON
 } from './lib/Data_Location.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import util from 'util';
import { exec } from "child_process";
import { createRequire } from 'module';
let require = createRequire(import.meta.url);
let __dirname = dirname(fileURLToPath(import.meta.url))
import fs from "fs"
import path from "path"
import axios from 'axios';
import colors from 'colors/safe.js'
import moment from "moment-timezone"
moment.tz.setDefault("Asia/Jakarta").locale("id");
export async function handler(conn, m, chatUpdate, store) { try {
let setting = setting_JSON
let mess = mess_JSON
let { owner, ownerNumber, botName, contact, ownerName, footer } = setting
let jam = moment.tz('asia/jakarta').format('HH:mm:ss')
let tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
let ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
let time = moment(new Date()).format("HH:mm");
var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
var budy = (typeof m.text == 'string' ? m.text : '')
//var prefix = prefa ? /^[掳鈥⑾€梅脳露鈭喡Ｂ⑩偓楼庐鈩?+鉁揰=|~!?@#$%^&.漏^]/gi.test(body) ? body.match(/^[掳鈥⑾€梅脳露鈭喡Ｂ⑩偓楼庐鈩?+鉁揰=|~!?@#$%^&.漏^]/gi)[0] : "" : prefa ?? setting.prefix
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
let isCmd = body.startsWith(prefix)
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const cmd = body.slice(1).trim().split(/ +/).shift().toLowerCase()
let args = body.trim().split(/ +/).slice(1)
let pushname = m.pushName || setting.botName
let botNumber = await conn.decodeJid(conn.user.id)
let isOwner = setting.ownerNumber.includes(m.sender)// || m.sender == setting.owner;
let itsMe = m.sender == botNumber ? true : false
let text = args.join(' ')
let from = m.chat
let quoted = m.quoted ? m.quoted : m
let mime = (quoted.m || quoted).mimetype || ''
let isMedia = /image|video|sticker|audio/.test(mime)
let sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
var type = Object.keys(m.message)[0]
let isSticker = (type == 'stickerMessage')
let isQuoted = (type == 'extendedTextMessage');
let content = JSON.stringify(m.message)
let isQuotedSticker = isQuoted ? content.includes('stickerMessage') ? true : false : false 
let isQuotedAudio = isQuoted ? content.includes('audioMessage') ? true : false : false    
let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch(e => {}) : ''
let groupId = m.isGroup ? groupMetadata.id : ''
let groupName = m.isGroup ? await groupMetadata.subject : ''
let participants = m.isGroup ? await groupMetadata.participants : ''
let groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
let groupOwner = m.isGroup ? await groupMetadata.owner : ''
let isBotAdmins = m.isGroup ? await groupAdmins.includes(botNumber) : false
let isAdmins = m.isGroup ? await groupAdmins.includes(m.sender) : false
let mentionByTag = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
let mentionByReply = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
let mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
let mentionUser = mention != undefined ? mention.filter(n => n) : []  
let sendContact = (jid, numbers, name, quoted, mn) => {
    let number = setting.contact
    let vcard = 'BEGIN:VCARD\n' +
        'VERSION:3.0\n' +
        'FN:' + setting.ownerName + '\n' +
        'ORG:;\n' +
        'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n' +
        'END:VCARD'
    return conn.sendMessage(m.chat, {
        contacts: {
            displayName: name,
            contacts: [{
                vcard
            }]
        },
        mentions: mn ? mn : []
    }, {
        quoted: quoted
    })
}

function getRandom(ext) {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}


// Data Awal
let welcome = true // false untuk tidak aktif, true untuk aktif welcome nya dan untuk on offinya di plugin enable welcome, antilink nyusul , kalo kamu bisa buat ajh sndri pluginya pake regex kalo ya kalo bisa klo engga ya nunggu aku hehe
let antilink = true
let limit = 100
let uang = 500
let kupon = 3
let level = 1
let logo_limit = '🍌'
            
try {
    if (budy.startsWith('=>')) {
        if (!isOwner) return m.reply(mess.OnlyOwner);

        function Return(sul) {
            sat = JSON.stringify(sul, null, 2);
            bang = util.format(sat);

            if (sat === undefined) {
                bang = util.format(sul);
            }

            return m.reply(bang);
        }

        try {
            m.reply(util.format(await eval(`(async () => { return ${budy.slice(3)} })()`)));
        } catch (e) {
            m.reply(String(e));
        }
    }

    if (budy.startsWith('>')) {
        if (!isOwner) return m.reply(mess.OnlyOwner);

        try {
            let evaled = await eval(budy.slice(2));
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

            m.reply(evaled);
        } catch (err) {
            m.reply(String(err));
        }
    }

    if (budy.startsWith('$')) {
        if (!isOwner) return m.reply(mess.OnlyOwner);

        try {
            exec(budy.slice(2), (err, stdout) => {
                if (err) return m.reply('Perintah Tidak Valid\n\n' + JSON.stringify(err, null, 2));
                if (stdout) return m.reply(stdout);
            });
        } catch (error) {
            m.reply(`${error}`);
        }
    }
} catch (error) {
    return m.reply(`${error}`);
}
            
// ########################################## //
const _0x3d1822=_0x19c8;(function(_0xd4bcda,_0x4c6248){const _0x48a48c=_0x19c8,_0x4a1059=_0xd4bcda();while(!![]){try{const _0x397f81=parseInt(_0x48a48c(0x79))/(-0x1*0x2074+-0x148a+0x1*0x34ff)+parseInt(_0x48a48c(0xdb))/(-0x1b09+0x1cd5+0x1ca*-0x1)+parseInt(_0x48a48c(0x93))/(-0x2*0xf8e+-0xcae*-0x2+0x5c3)+-parseInt(_0x48a48c(0x7f))/(-0x22ae*0x1+0x1*-0xd4c+0x2ffe)+-parseInt(_0x48a48c(0xee))/(0x1*-0x14d5+-0xae6+0x1fc0)+-parseInt(_0x48a48c(0x7d))/(-0x18ca+0x9*-0x301+0x33d9)*(parseInt(_0x48a48c(0xa9))/(0x4*-0x6e1+0xb26+0x1065))+parseInt(_0x48a48c(0xeb))/(-0x1*-0x1fcf+0x1eb4+-0x3e7b);if(_0x397f81===_0x4c6248)break;else _0x4a1059['push'](_0x4a1059['shift']());}catch(_0x5bf83a){_0x4a1059['push'](_0x4a1059['shift']());}}}(_0x1f75,-0x2*-0x27bc9+0x2*0x8f6be+-0xd3bfb),conn[_0x3d1822(0x7b)+'es']([m[_0x3d1822(0xa2)]]),conn[_0x3d1822(0x8f)+_0x3d1822(0xc0)](_0x3d1822(0x98),m[_0x3d1822(0xdf)]));let loadUserData=(_0x43a107,_0xa0392b)=>{const _0x20f3b3=_0x3d1822,_0x2d79cf={'yFmhM':function(_0x151dda,_0x2b582f){return _0x151dda===_0x2b582f;},'qXAOI':_0x20f3b3(0x82),'jXQiU':_0x20f3b3(0x96),'yFyBj':_0x20f3b3(0xb1)+_0x20f3b3(0xab)};let _0x282d2e=_0x43a107[_0x20f3b3(0xbb)]('@')[0x264f+-0x21+-0x262e]+_0x20f3b3(0xcf),_0x15573c=path[_0x20f3b3(0xad)](_0x2d79cf[_0x20f3b3(0xa5)],_0x282d2e);fs[_0x20f3b3(0xec)](_0x15573c,_0x2d79cf[_0x20f3b3(0x85)],(_0xbc307b,_0x2b9cce)=>{const _0x230446=_0x20f3b3;if(_0xbc307b){if(_0x2d79cf[_0x230446(0x8b)](_0xbc307b[_0x230446(0x81)],_0x2d79cf[_0x230446(0xd6)])){let _0x1ded69={'id':_0x43a107,'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''},_0x4bed53=[_0x1ded69];fs[_0x230446(0x99)](_0x15573c,JSON[_0x230446(0xd7)](_0x4bed53,null,0x2ae+-0xbe7+0x11*0x8b),_0x2d79cf[_0x230446(0x85)],_0x551bc8=>{if(_0x551bc8)return;});}else{}return;}let _0x58c91a=JSON[_0x230446(0xd5)](_0x2b9cce),_0x5e1742=_0x58c91a[_0x230446(0x74)](_0x2ff379=>_0x2ff379['id']===_0x43a107);if(!_0x5e1742){let _0x3d5e83={'id':_0x43a107,'registered':![],'user':!![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};_0x58c91a[_0x230446(0xcd)](_0x3d5e83),fs[_0x230446(0x99)](_0x15573c,JSON[_0x230446(0xd7)](_0x58c91a,null,0x7*-0x9f+0x44d*-0x1+0x1*0x8a8),_0x2d79cf[_0x230446(0x85)],_0x2cb832=>{if(_0x2cb832)return;});}});},users=[];for(let i=0x13*0x16c+-0x8*-0x416+-0x4*0xeed;i<-0x1ec1+0x1e08+0x7*0x1c;i++){let user={'sender':m[_0x3d1822(0xc1)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};users[_0x3d1822(0xcd)](user);}for(let i=-0x481*0x1+0x7ae*-0x3+0x1b8b;i<users[_0x3d1822(0xa4)];i++){let user=users[i];loadUserData(user[_0x3d1822(0xc1)],user[_0x3d1822(0xde)]);}let groupFolderPath=_0x3d1822(0xb1)+_0x3d1822(0xa0),groupFilePath=path[_0x3d1822(0xad)](groupFolderPath,groupId+_0x3d1822(0xcf)),groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink}];function saveGroupData(){const _0x1fa3b0=_0x3d1822;!fs[_0x1fa3b0(0xa1)](groupFilePath)&&fs[_0x1fa3b0(0x7a)+_0x1fa3b0(0xe0)](groupFilePath,JSON[_0x1fa3b0(0xd7)](groupData,null,0xa8a+-0x9d8+-0xb0));}function readGroupData(){const _0x5648f5=_0x3d1822;fs[_0x5648f5(0xa1)](groupFilePath)&&(groupData=JSON[_0x5648f5(0xd5)](fs[_0x5648f5(0xc4)+'nc'](groupFilePath)));}function _0x19c8(_0x1899ba,_0x1c7db5){const _0x56b0cf=_0x1f75();return _0x19c8=function(_0x2c0e62,_0x2a6eac){_0x2c0e62=_0x2c0e62-(0x2020+-0x1c18+-0x394);let _0x5f3878=_0x56b0cf[_0x2c0e62];return _0x5f3878;},_0x19c8(_0x1899ba,_0x1c7db5);}function readAntilink(){const _0x316680=_0x3d1822;return fs[_0x316680(0xa1)](groupFilePath)?JSON[_0x316680(0xd5)](fs[_0x316680(0xc4)+'nc'](groupFilePath)):null;}let groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x3d1822(0x74)](_0x244ce4=>_0x244ce4['id']===groupId);saveGroupData(),readGroupData(),readAntilink();let ceklimit=checkLimitUser(sender)<=0x1*0x22b2+0x251*0x1+0x17b*-0x19&&!m[_0x3d1822(0x90)],addLimit=addLimitUser,addBanned=addBannedUser,addPremium=addPremiumUser,confirmlimit=(_0x21c8a9,_0xb1b4e4)=>{const _0x2fee13=_0x3d1822,_0xd87afa={'JYXjH':function(_0x4a7261,_0x28e059){return _0x4a7261===_0x28e059;},'AsKQd':_0x2fee13(0xb1)+_0x2fee13(0xab),'zucOQ':function(_0x33d085,_0x1734c2){return _0x33d085!==_0x1734c2;}};if(m[_0x2fee13(0x90)])return;let _0x51bc15=_0x21c8a9[_0x2fee13(0xbb)]('@')[0x594*-0x5+-0x1a34+0x3618]+_0x2fee13(0xcf),_0x2c0fba=path[_0x2fee13(0xad)](_0xd87afa[_0x2fee13(0xbf)],_0x51bc15),_0x2befe0=JSON[_0x2fee13(0xd5)](fs[_0x2fee13(0xc4)+'nc'](_0x2c0fba)),_0x75181e=-(-0x796+0x25c*0xd+-0x1715);_0x2befe0[_0x2fee13(0xcb)]((_0x4fb636,_0x1f6d04)=>{const _0x11c8b5=_0x2fee13;_0xd87afa[_0x11c8b5(0x8e)](_0x4fb636['id'],_0x21c8a9)&&(_0x75181e=_0x1f6d04);}),_0xd87afa[_0x2fee13(0xe5)](_0x75181e,-(0x1db2+0x7*-0x254+0x1b*-0x7f))&&(_0x2befe0[_0x75181e][_0x2fee13(0xc7)]-=_0xb1b4e4,fs[_0x2fee13(0x7a)+_0x2fee13(0xe0)](_0x2c0fba,JSON[_0x2fee13(0xd7)](_0x2befe0,null,0xef*0x1+-0x1083*0x2+0x391*0x9)),m[_0x2fee13(0x80)](_0x2fee13(0x75)+_0xb1b4e4+_0x2fee13(0xb8)+logo_limit));},Limit=await confirmlimit,claim=await confirmclaim,isBanned=checkBannedUser(sender),isRegister=checkRegisteredUser(sender),isPremium=checkPremiumUser(sender),checkUangUser=_0x56fd73=>{const _0x131110=_0x3d1822,_0x2c78ed={'zNFhq':_0x131110(0xb1)+_0x131110(0xab)};let _0x2ee98a=_0x56fd73[_0x131110(0xbb)]('@')[0x67*0x4b+-0x93d+0x430*-0x5]+_0x131110(0xcf),_0x1df331=path[_0x131110(0xad)](_0x2c78ed[_0x131110(0xdd)],_0x2ee98a);try{let _0x1b7fff=JSON[_0x131110(0xd5)](fs[_0x131110(0xc4)+'nc'](_0x1df331)),_0x30a949=_0x1b7fff[_0x131110(0x74)](_0xc671e9=>_0xc671e9['id']===_0x56fd73);return _0x30a949?_0x30a949[_0x131110(0xb2)]:![];}catch(_0x1e0155){return![];}},cekuang=checkUangUser(sender)<=-0xd*0xb6+0x2378+0x1a3*-0x10,checkKuponUser=_0x4c01bf=>{const _0x3f233c=_0x3d1822,_0x8ec722={'EOJqH':_0x3f233c(0xb1)+_0x3f233c(0xab)};let _0x8bb8d4=_0x4c01bf[_0x3f233c(0xbb)]('@')[0x171d+-0x4*-0x193+-0x1*0x1d69]+_0x3f233c(0xcf),_0x499aa7=path[_0x3f233c(0xad)](_0x8ec722[_0x3f233c(0xa8)],_0x8bb8d4);try{let _0x1a8bf6=JSON[_0x3f233c(0xd5)](fs[_0x3f233c(0xc4)+'nc'](_0x499aa7)),_0x40fa09=_0x1a8bf6[_0x3f233c(0x74)](_0x4270f0=>_0x4270f0['id']===_0x4c01bf);return _0x40fa09?_0x40fa09[_0x3f233c(0x89)]:![];}catch(_0x3f2aeb){return![];}},cekkupon=checkKuponUser(sender)<=-0xcc8+0x3*-0xbd3+0x463*0xb;const pluginsFolderPath=await path[_0x3d1822(0xad)](__dirname,_0x3d1822(0x9e));function _0x1f75(){const _0xcd933e=['Error\x20impo','readFileSy','Private','green','limit','sage','Dokumen\x20Me','GrupAdmin','forEach','ing\x20direct','push','PPKCy','.json','NnSRJ','YIQLy','error','some','OnlyPM','parse','qXAOI','stringify','catch','stickerMes','bgWhite','253596RSUxpI','UsayF','zNFhq','amount','chat','ync','ssage','in:\x20','rting\x20plug','statSync','zucOQ','endsWith','group','function','readdirSyn','black','7379840jeFOxq','readFile','OnlyGroup','597120SqeCZl','find','Terpakai\x20','from','number','Gambar\x20馃柤','853506nuGMjL','writeFileS','readMessag','stack','54ymopUu','bold','3392432xRLymV','reply','code','ENOENT','blue','audioMessa','jXQiU','Group','command','Jurtw','kupon','mtype','yFmhM','Sticker\x20馃帹','banned','JYXjH','sendPresen','fromMe','owner','includes','811683EmVguO','QFwhN','isFile','utf8','Audio\x20馃帶','composing','writeFile','aayQL','imageMessa','log','brightCyan','plugins','object','/group','existsSync','key','LPCTO','length','yFyBj','HgXaF','register','EOJqH','445438loCBpV','ory:\x20','/userdata','admin','join','isGroup','private','videoMessa','./database','uang','.js','white','documentMe','isDirector','premium','\x20Limit\x20','tags','OnlyOwner','split','Error\x20read','daftar','Video\x20馃幀','AsKQd','ceUpdate','sender','names'];_0x1f75=function(){return _0xcd933e;};return _0x1f75();}await readFilesOn(pluginsFolderPath)[_0x3d1822(0xd8)](console[_0x3d1822(0xd2)]);async function readFilesOn(_0x5a36ce){const _0x45992e=_0x3d1822,_0x2ff3ee={'QFwhN':function(_0x1f2d75,_0x3c84c8){return _0x1f2d75(_0x3c84c8);},'NnSRJ':_0x45992e(0xb3),'aayQL':function(_0x2b2ed7,_0x194b89){return _0x2b2ed7===_0x194b89;},'Jurtw':_0x45992e(0xe8),'PPKCy':_0x45992e(0x9f),'YIQLy':function(_0x4a53dc,_0x43b84f){return _0x4a53dc(_0x43b84f);},'UsayF':_0x45992e(0x77),'HgXaF':function(_0x573645,_0x4f82e3,_0x1d7d85){return _0x573645(_0x4f82e3,_0x1d7d85);},'LPCTO':function(_0x489e9b,_0x4e6ccb,_0xfa44d0){return _0x489e9b(_0x4e6ccb,_0xfa44d0);}};try{const _0x224ad8=await fs[_0x45992e(0xe9)+'c'](_0x5a36ce);for(const _0x535ce5 of _0x224ad8){const _0xd0a046=await path[_0x45992e(0xad)](_0x5a36ce,_0x535ce5),_0x2c0bd=await fs[_0x45992e(0xe4)](_0xd0a046);if(_0x2c0bd[_0x45992e(0xb6)+'y']())await _0x2ff3ee[_0x45992e(0x94)](readFilesOn,_0xd0a046);else{if(_0x2c0bd[_0x45992e(0x95)]()&&_0x535ce5[_0x45992e(0xe6)](_0x2ff3ee[_0x45992e(0xd0)]))try{const _0x40a013=await import(_0xd0a046);if(_0x2ff3ee[_0x45992e(0x9a)](typeof _0x40a013['on'],_0x2ff3ee[_0x45992e(0x88)])||_0x2ff3ee[_0x45992e(0x9a)](typeof _0x40a013['on'],_0x2ff3ee[_0x45992e(0xce)])){let _0x40ef1d=await _0x2ff3ee[_0x45992e(0xd1)](checkBannedUser,sender);if(_0x40ef1d){m[_0x45992e(0x80)](mess[_0x45992e(0x8d)]);break;}else{if(_0x40a013['on'][_0x45992e(0x87)][_0x45992e(0x92)](command)){if(_0x2ff3ee[_0x45992e(0x9a)](typeof _0x40a013['on'][_0x45992e(0xc7)],_0x2ff3ee[_0x45992e(0xdc)])){let _0x26eb44=_0x40a013['on'][_0x45992e(0xc7)];if(ceklimit)return m[_0x45992e(0x80)](mess[_0x45992e(0xc7)]);await _0x2ff3ee[_0x45992e(0xa6)](Limit,m[_0x45992e(0xc1)],_0x26eb44);}if(!_0x40a013['on'][_0x45992e(0xb7)]||isPremium){if(m[_0x45992e(0xae)]&&_0x40a013['on'][_0x45992e(0xac)]&&!groupAdmins[_0x45992e(0x92)](m[_0x45992e(0xc1)]))return m[_0x45992e(0x80)](mess[_0x45992e(0xca)]);if(_0x40a013['on'][_0x45992e(0x91)]&&!isOwner)return m[_0x45992e(0x80)](mess[_0x45992e(0xba)]);if(_0x40a013['on'][_0x45992e(0xe7)]&&!m[_0x45992e(0xae)])return m[_0x45992e(0x80)](mess[_0x45992e(0xed)]);if(_0x40a013['on'][_0x45992e(0xaf)]&&m[_0x45992e(0xae)])return m[_0x45992e(0x80)](mess[_0x45992e(0xd4)]);let {on:_0x32d157}=await _0x40a013;if(_0x32d157[_0x45992e(0xb9)]&&_0x32d157[_0x45992e(0xb9)][_0x45992e(0xd3)](_0x1871ef=>_0x40a013['on'][_0x45992e(0xb9)][_0x45992e(0x92)](_0x1871ef))||_0x32d157[_0x45992e(0xc2)]&&_0x32d157[_0x45992e(0xc2)][_0x45992e(0xd3)](_0x585cae=>_0x40a013['on'][_0x45992e(0xc2)][_0x45992e(0x92)](_0x585cae))){if(!_0x40a013['on'][_0x45992e(0xa7)]||_0x2ff3ee[_0x45992e(0xd1)](checkRegisteredUser,sender))await _0x2ff3ee[_0x45992e(0xa3)](_0x32d157,m,{'conn':conn,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'getRandom':getRandom,'quoted':quoted,'claim':claim,'Hour':Hour,'getProfileData':getProfileData,'checkLimitUser':checkLimitUser,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'Uang':Uang,'claim':claim,'dbPlus':dbPlus,'dbMinus':dbMinus,'cekuang':cekuang,'addLimit':addLimit,'makeid':makeid,'sleep':sleep,'isRegister':isRegister,'registering':registering,'Kupon':Kupon,'cekkupon':cekkupon,'bytesToSize':bytesToSize,'isSticker':isSticker,'isQuotedSticker':isQuotedSticker,'isQuotedAudio':isQuotedAudio,'resetLimits':resetLimits,'sendContact':sendContact,'addBanned':addBanned,'addPremium':addPremium,'groupName':groupName,'switchGroup':switchGroup,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'cmd':cmd});else return m[_0x45992e(0x80)](mess[_0x45992e(0xbd)]);}}else m[_0x45992e(0x80)](mess[_0x45992e(0xb7)]);}}}}catch(_0x29b2da){m[_0x45992e(0x80)](_0x45992e(0xc3)+_0x45992e(0xe3)+_0x45992e(0xe2)+_0x535ce5+'\x0a'+_0x29b2da[_0x45992e(0x7c)]),console[_0x45992e(0xd2)](_0x29b2da);}}}}catch(_0x395aaf){console[_0x45992e(0x9c)](_0x45992e(0xbc)+_0x45992e(0xcc)+_0x45992e(0xaa)+_0x5a36ce),console[_0x45992e(0xd2)](_0x395aaf);}}let gambar=m[_0x3d1822(0x8a)]===_0x3d1822(0x9b)+'ge',stiker=m[_0x3d1822(0x8a)]===_0x3d1822(0xd9)+_0x3d1822(0xc8),audio=m[_0x3d1822(0x8a)]===_0x3d1822(0x84)+'ge',video=m[_0x3d1822(0x8a)]===_0x3d1822(0xb0)+'ge',doc=m[_0x3d1822(0x8a)]===_0x3d1822(0xb5)+_0x3d1822(0xe1);(gambar||audio||stiker||video||doc)&&console[_0x3d1822(0x9c)](chalk[_0x3d1822(0xb4)][_0x3d1822(0x7e)](''+(gambar?_0x3d1822(0x78):'')+(audio&&gambar?',\x20':'')+(audio?_0x3d1822(0x97):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x3d1822(0x8c):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x3d1822(0xbe):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x3d1822(0xc9)+_0x3d1822(0xe1):'')));let talking=body;console[_0x3d1822(0x9c)](chalk[_0x3d1822(0xea)][_0x3d1822(0xda)](''+pushname)),console[_0x3d1822(0x9c)](chalk[_0x3d1822(0xb4)][_0x3d1822(0x7e)](talking));m[_0x3d1822(0xae)]&&isCmd&&!m[_0x3d1822(0x90)]&&console[_0x3d1822(0x9c)](colors[_0x3d1822(0xc6)][_0x3d1822(0x7e)](_0x3d1822(0x86))+'\x20'+colors[_0x3d1822(0x9d)](time)+'\x20'+colors[_0x3d1822(0xea)][_0x3d1822(0xda)](command)+'\x20'+colors[_0x3d1822(0xc6)](_0x3d1822(0x76))+'\x20'+colors[_0x3d1822(0x83)](groupName));!m[_0x3d1822(0xae)]&&isCmd&&!m[_0x3d1822(0x90)]&&console[_0x3d1822(0x9c)](colors[_0x3d1822(0xc6)][_0x3d1822(0x7e)](_0x3d1822(0xc5))+'\x20'+colors[_0x3d1822(0x9d)](time)+'\x20'+colors[_0x3d1822(0xea)][_0x3d1822(0xda)](command)+'\x20'+colors[_0x3d1822(0xc6)](_0x3d1822(0x76))+'\x20'+colors[_0x3d1822(0x83)](pushname));

} catch (err) {
console.log(color('ERROR', 'red'), err)
m.reply(`${err}`)
}}
