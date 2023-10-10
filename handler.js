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
let command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
let cmd = body.slice(1).trim().split(/ +/).shift().toLowerCase()
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
let limit = 250
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
const _0x48491c=_0x3537;(function(_0x1c2c6b,_0x67db01){const _0x33637e=_0x3537,_0x77fd91=_0x1c2c6b();while(!![]){try{const _0x5c78de=-parseInt(_0x33637e(0x17f))/(-0x1f*-0x7b+-0x168b+0x7a7)*(-parseInt(_0x33637e(0x1dd))/(0x2027+0x143c+-0x4c3*0xb))+-parseInt(_0x33637e(0x194))/(-0x21f6+0xd38+0x14c1)*(-parseInt(_0x33637e(0x1cb))/(-0xb*-0x67+0xa52+-0xebb))+parseInt(_0x33637e(0x178))/(0x26cf+0x1baf+-0x4279)+parseInt(_0x33637e(0x16b))/(0x2*-0xe6+-0x406+0x1*0x5d8)*(parseInt(_0x33637e(0x1b1))/(0x17e9*0x1+0x32*0xa+-0x19d6))+parseInt(_0x33637e(0x19d))/(-0xfd9+-0x172c+-0x1*-0x270d)+-parseInt(_0x33637e(0x1a8))/(0x6f6+0x772+-0xe5f)+parseInt(_0x33637e(0x191))/(-0x5d*0xb+0x1452+-0x17b*0xb)*(-parseInt(_0x33637e(0x180))/(-0x449*-0x6+-0x1d*0x97+0x8*-0x112));if(_0x5c78de===_0x67db01)break;else _0x77fd91['push'](_0x77fd91['shift']());}catch(_0x376853){_0x77fd91['push'](_0x77fd91['shift']());}}}(_0x564f,0x505c2*-0x4+-0x89d74+0x2977c3),conn[_0x48491c(0x1b7)+'es']([m[_0x48491c(0x1b2)]]),conn[_0x48491c(0x1a1)+_0x48491c(0x1a4)](_0x48491c(0x172),m[_0x48491c(0x1ca)]));let loadUserData=(_0x1267fa,_0x53f5bb)=>{const _0x3d0dc7=_0x48491c,_0xd1efc2={'ZWYBa':function(_0x4779ee,_0x1510fe){return _0x4779ee===_0x1510fe;},'xJziA':_0x3d0dc7(0x1b5),'cdeHI':_0x3d0dc7(0x19b),'JeWOP':_0x3d0dc7(0x1b6)+_0x3d0dc7(0x1ad)};let _0x4d2946=_0x1267fa[_0x3d0dc7(0x18d)]('@')[0x99d*0x1+0xa*0x34d+-0x2a9f]+_0x3d0dc7(0x1cd),_0x4d8e3f=path[_0x3d0dc7(0x181)](_0xd1efc2[_0x3d0dc7(0x18e)],_0x4d2946);fs[_0x3d0dc7(0x1e2)](_0x4d8e3f,_0xd1efc2[_0x3d0dc7(0x1b8)],(_0x218438,_0x3037e8)=>{const _0x72b40d=_0x3d0dc7;if(_0x218438){if(_0xd1efc2[_0x72b40d(0x1b4)](_0x218438[_0x72b40d(0x1a2)],_0xd1efc2[_0x72b40d(0x1e1)])){let _0x25831d={'id':_0x1267fa,'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''},_0x137d31=[_0x25831d];fs[_0x72b40d(0x1a6)](_0x4d8e3f,JSON[_0x72b40d(0x1d4)](_0x137d31,null,-0x1*0x18c1+0x4f4*-0x4+0x2c93*0x1),_0xd1efc2[_0x72b40d(0x1b8)],_0x14c365=>{if(_0x14c365)return;});}else{}return;}let _0x2b987e=JSON[_0x72b40d(0x1d7)](_0x3037e8),_0x5e8ac7=_0x2b987e[_0x72b40d(0x16f)](_0x3b4c59=>_0x3b4c59['id']===_0x1267fa);if(!_0x5e8ac7){let _0x4ed8d2={'id':_0x1267fa,'registered':![],'user':!![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};_0x2b987e[_0x72b40d(0x182)](_0x4ed8d2),fs[_0x72b40d(0x1a6)](_0x4d8e3f,JSON[_0x72b40d(0x1d4)](_0x2b987e,null,0x1617+0x1*0x19b1+-0x2fc6),_0xd1efc2[_0x72b40d(0x1b8)],_0x92f5d8=>{if(_0x92f5d8)return;});}});},users=[];for(let i=-0xf*0x18e+-0x13ea*0x1+0x159e*0x2;i<-0xba9+0xa9+0xb0b;i++){let user={'sender':m[_0x48491c(0x1d9)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};users[_0x48491c(0x182)](user);}for(let i=0xfb*0x3+0x1*0x2582+-0x2873;i<users[_0x48491c(0x166)];i++){let user=users[i];loadUserData(user[_0x48491c(0x1d9)],user[_0x48491c(0x184)]);}let groupFolderPath=_0x48491c(0x1b6)+_0x48491c(0x1ba),groupFilePath=path[_0x48491c(0x181)](groupFolderPath,groupId+_0x48491c(0x1cd)),groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink}];function saveGroupData(){const _0x4fe8c8=_0x48491c;!fs[_0x4fe8c8(0x18c)](groupFilePath)&&fs[_0x4fe8c8(0x1d8)+_0x4fe8c8(0x1e5)](groupFilePath,JSON[_0x4fe8c8(0x1d4)](groupData,null,-0x16b4+-0x1c0d+0x32c3));}function readGroupData(){const _0x5e378d=_0x48491c;fs[_0x5e378d(0x18c)](groupFilePath)&&(groupData=JSON[_0x5e378d(0x1d7)](fs[_0x5e378d(0x1e8)+'nc'](groupFilePath)));}function readAntilink(){const _0x8f166=_0x48491c;return fs[_0x8f166(0x18c)](groupFilePath)?JSON[_0x8f166(0x1d7)](fs[_0x8f166(0x1e8)+'nc'](groupFilePath)):null;}let groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x48491c(0x16f)](_0x10ba53=>_0x10ba53['id']===groupId);saveGroupData(),readGroupData(),readAntilink();let ceklimit=checkLimitUser(sender)<=0x12*-0x1d3+0x1*0x1552+-0x16*-0x86,addLimit=addLimitUser,addBanned=addBannedUser,addPremium=addPremiumUser,confirmlimit=(_0x2eeb85,_0x127dd9)=>{const _0x4158e5=_0x48491c,_0x1eb35f={'XZMvi':function(_0x441a8f,_0x35b415){return _0x441a8f===_0x35b415;},'shVtl':_0x4158e5(0x1b6)+_0x4158e5(0x1ad),'LghrI':function(_0x5cdb63,_0xa50521){return _0x5cdb63!==_0xa50521;}};let _0x51f644=_0x2eeb85[_0x4158e5(0x18d)]('@')[-0x15fb+0x5*-0x13+0x165a]+_0x4158e5(0x1cd),_0x3038c1=path[_0x4158e5(0x181)](_0x1eb35f[_0x4158e5(0x1c1)],_0x51f644),_0x323874=JSON[_0x4158e5(0x1d7)](fs[_0x4158e5(0x1e8)+'nc'](_0x3038c1)),_0x479360=-(0x1*-0xb51+-0xa3f*-0x3+-0x136b);_0x323874[_0x4158e5(0x1af)]((_0x581c31,_0x3e8a32)=>{const _0x1a31e7=_0x4158e5;_0x1eb35f[_0x1a31e7(0x1cc)](_0x581c31['id'],_0x2eeb85)&&(_0x479360=_0x3e8a32);}),_0x1eb35f[_0x4158e5(0x1a0)](_0x479360,-(0xeab+-0x2654+0x1*0x17aa))&&(_0x323874[_0x479360][_0x4158e5(0x19e)]-=_0x127dd9,fs[_0x4158e5(0x1d8)+_0x4158e5(0x1e5)](_0x3038c1,JSON[_0x4158e5(0x1d4)](_0x323874,null,0x18e8+-0x1f32+0x64c)),m[_0x4158e5(0x1c6)](_0x4158e5(0x1db)+_0x127dd9+_0x4158e5(0x1a9)+logo_limit));},limitnya=await confirmlimit,claim=await confirmclaim,isBanned=checkBannedUser(sender),isRegister=checkRegisteredUser(sender),isPremium=checkPremiumUser(sender),checkUangUser=_0x120565=>{const _0x46e482=_0x48491c,_0x531a2d={'hyYcC':_0x46e482(0x1b6)+_0x46e482(0x1ad)};let _0x35cd1d=_0x120565[_0x46e482(0x18d)]('@')[-0x196b+0x24e5+-0xe2*0xd]+_0x46e482(0x1cd),_0xaf47d4=path[_0x46e482(0x181)](_0x531a2d[_0x46e482(0x177)],_0x35cd1d);try{let _0x4cc205=JSON[_0x46e482(0x1d7)](fs[_0x46e482(0x1e8)+'nc'](_0xaf47d4)),_0x590bc9=_0x4cc205[_0x46e482(0x16f)](_0x734886=>_0x734886['id']===_0x120565);return _0x590bc9?_0x590bc9[_0x46e482(0x17b)]:![];}catch(_0x158d9b){return![];}},cekuang=checkUangUser(sender)<=0x232*0x5+-0x158e+-0x6*-0x1c5,checkKuponUser=_0x251807=>{const _0x2792ff=_0x48491c,_0x1ccd21={'HrLKf':_0x2792ff(0x1b6)+_0x2792ff(0x1ad)};let _0x575dcf=_0x251807[_0x2792ff(0x18d)]('@')[0x1d6+0x2164+-0x233a]+_0x2792ff(0x1cd),_0x10dc57=path[_0x2792ff(0x181)](_0x1ccd21[_0x2792ff(0x1ac)],_0x575dcf);try{let _0x1a4962=JSON[_0x2792ff(0x1d7)](fs[_0x2792ff(0x1e8)+'nc'](_0x10dc57)),_0x1d8651=_0x1a4962[_0x2792ff(0x16f)](_0x6fce3e=>_0x6fce3e['id']===_0x251807);return _0x1d8651?_0x1d8651[_0x2792ff(0x174)]:![];}catch(_0x5f0594){return![];}},cekkupon=checkKuponUser(sender)<=-0x1d61+-0x3e4+0x2145;const pluginsFolderPath=await path[_0x48491c(0x181)](__dirname,_0x48491c(0x17c));await readFilesEvent(pluginsFolderPath)[_0x48491c(0x1c4)](console[_0x48491c(0x170)]),await readFilesOn(pluginsFolderPath)[_0x48491c(0x1c4)](console[_0x48491c(0x170)]);async function readFilesEvent(_0x3dcb32){const _0x4c60c3=_0x48491c,_0x496046={'WKwzf':function(_0x5dfdec,_0x5c7f00){return _0x5dfdec(_0x5c7f00);},'CzVDB':_0x4c60c3(0x18a),'uZPhz':function(_0xc7fcb4,_0x126ba6){return _0xc7fcb4===_0x126ba6;},'iPYro':_0x4c60c3(0x1c0),'PbHbw':function(_0x48d490,_0x2440b6){return _0x48d490===_0x2440b6;},'LmuNq':_0x4c60c3(0x1df),'qmYyq':function(_0x4454c1,_0x4e30f4){return _0x4454c1(_0x4e30f4);},'TLKuH':function(_0x33d59e,_0xf54af3,_0x598ba2){return _0x33d59e(_0xf54af3,_0x598ba2);}};try{const _0x196677=await fs[_0x4c60c3(0x16d)+'c'](_0x3dcb32);for(const _0xfe5032 of _0x196677){const _0x2b7bbc=await path[_0x4c60c3(0x181)](_0x3dcb32,_0xfe5032),_0x35795c=await fs[_0x4c60c3(0x1a5)](_0x2b7bbc);if(_0x35795c[_0x4c60c3(0x168)+'y']())await _0x496046[_0x4c60c3(0x165)](readFilesEvent,_0x2b7bbc);else{if(_0x35795c[_0x4c60c3(0x1bb)]()&&_0xfe5032[_0x4c60c3(0x1d1)](_0x496046[_0x4c60c3(0x1d3)]))try{const _0xb099ec=await import(_0x2b7bbc);if(_0x496046[_0x4c60c3(0x16c)](typeof _0xb099ec[_0x4c60c3(0x1d5)],_0x496046[_0x4c60c3(0x196)])||_0x496046[_0x4c60c3(0x1de)](typeof _0xb099ec[_0x4c60c3(0x1d5)],_0x496046[_0x4c60c3(0x1d2)])){let _0x3e9b12=_0x496046[_0x4c60c3(0x164)](checkBannedUser,sender);if(_0x3e9b12){m[_0x4c60c3(0x1c6)](mess[_0x4c60c3(0x16e)]);break;}let {event:_0x25a648}=await _0xb099ec;await _0x496046[_0x4c60c3(0x1b3)](_0x25a648,m,{'conn':conn,'group':group,'budy':budy,'isAdmins':isAdmins,'isOwner':isOwner,'addBanned':addBanned,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'getRandom':getRandom,'quoted':quoted,'claim':claim,'Hour':Hour,'limitnya':limitnya,'ceklimit':ceklimit,'getProfileData':getProfileData,'checkLimitUser':checkLimitUser,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'Uang':Uang,'dbPlus':dbPlus,'dbMinus':dbMinus,'cekuang':cekuang,'addLimit':addLimit,'makeid':makeid,'sleep':sleep,'isRegister':isRegister,'registering':registering,'Kupon':Kupon,'cekkupon':cekkupon,'bytesToSize':bytesToSize,'isSticker':isSticker,'isQuotedSticker':isQuotedSticker,'isQuotedAudio':isQuotedAudio,'resetLimits':resetLimits,'sendContact':sendContact,'addBanned':addBanned,'addPremium':addPremium,'groupName':groupName,'switchGroup':switchGroup,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'cmd':cmd});}}catch(_0x42c216){console[_0x4c60c3(0x187)](_0x4c60c3(0x192)+_0x4c60c3(0x1bd)+_0x4c60c3(0x1c8)+_0xfe5032),console[_0x4c60c3(0x170)](_0x42c216);}}}}catch(_0x18cee8){console[_0x4c60c3(0x187)](_0x4c60c3(0x1a7)+_0x4c60c3(0x1c7)+_0x4c60c3(0x171)+_0x3dcb32),console[_0x4c60c3(0x170)](_0x18cee8);}}async function readFilesOn(_0x15feec){const _0x2c689f=_0x48491c,_0x177a40={'oJJhr':function(_0x29158f,_0x88f3bd){return _0x29158f(_0x88f3bd);},'OgIIV':_0x2c689f(0x18a),'zspvV':function(_0x2673a6,_0x17d509){return _0x2673a6===_0x17d509;},'Qeyrc':_0x2c689f(0x1c0),'rNBbw':function(_0x4a585c,_0x49adb5){return _0x4a585c===_0x49adb5;},'rNxKM':_0x2c689f(0x1df),'grPyT':function(_0x23a987,_0x38452b){return _0x23a987===_0x38452b;},'BraLx':_0x2c689f(0x1a3),'epWfP':function(_0xc5f331,_0xa8c4a1,_0x539ffe){return _0xc5f331(_0xa8c4a1,_0x539ffe);},'CDnjw':function(_0x27217e,_0xe5a438){return _0x27217e(_0xe5a438);}};try{const _0x22e535=await fs[_0x2c689f(0x16d)+'c'](_0x15feec);for(const _0x2de813 of _0x22e535){const _0x5b8e7c=await path[_0x2c689f(0x181)](_0x15feec,_0x2de813),_0x4e14bb=await fs[_0x2c689f(0x1a5)](_0x5b8e7c);if(_0x4e14bb[_0x2c689f(0x168)+'y']())await _0x177a40[_0x2c689f(0x195)](readFilesOn,_0x5b8e7c);else{if(_0x4e14bb[_0x2c689f(0x1bb)]()&&_0x2de813[_0x2c689f(0x1d1)](_0x177a40[_0x2c689f(0x167)]))try{const _0x126e88=await import(_0x5b8e7c);if(_0x177a40[_0x2c689f(0x1d6)](typeof _0x126e88['on'],_0x177a40[_0x2c689f(0x198)])||_0x177a40[_0x2c689f(0x1e6)](typeof _0x126e88['on'],_0x177a40[_0x2c689f(0x1be)])){let _0x438ee9=_0x177a40[_0x2c689f(0x195)](checkBannedUser,sender);if(_0x438ee9){m[_0x2c689f(0x1c6)](mess[_0x2c689f(0x16e)]);break;}else{if(_0x126e88['on'][_0x2c689f(0x1bc)][_0x2c689f(0x18b)](command)){if(_0x177a40[_0x2c689f(0x1b9)](typeof _0x126e88['on'][_0x2c689f(0x19e)],_0x177a40[_0x2c689f(0x173)])){let _0x4f622b=_0x126e88['on'][_0x2c689f(0x19e)];if(ceklimit)return m[_0x2c689f(0x1c6)](mess[_0x2c689f(0x19e)]);_0x177a40[_0x2c689f(0x1ce)](limitnya,m[_0x2c689f(0x1d9)],_0x4f622b);}if(!_0x126e88['on'][_0x2c689f(0x17e)]||isPremium){if(m[_0x2c689f(0x16a)]&&_0x126e88['on'][_0x2c689f(0x1da)]&&!groupAdmins[_0x2c689f(0x18b)](m[_0x2c689f(0x1d9)]))return m[_0x2c689f(0x1c6)](mess[_0x2c689f(0x1ae)]);if(_0x126e88['on'][_0x2c689f(0x1c9)]&&!isOwner)return m[_0x2c689f(0x1c6)](mess[_0x2c689f(0x1d0)]);if(_0x126e88['on'][_0x2c689f(0x1e9)]&&!m[_0x2c689f(0x16a)])return m[_0x2c689f(0x1c6)](mess[_0x2c689f(0x19c)]);if(_0x126e88['on'][_0x2c689f(0x17d)]&&m[_0x2c689f(0x16a)])return m[_0x2c689f(0x1c6)](mess[_0x2c689f(0x175)]);let {on:_0x157239}=await _0x126e88;if(_0x157239[_0x2c689f(0x193)]&&_0x157239[_0x2c689f(0x193)][_0x2c689f(0x176)](_0x17bad7=>_0x126e88['on'][_0x2c689f(0x193)][_0x2c689f(0x18b)](_0x17bad7))||_0x157239[_0x2c689f(0x197)]&&_0x157239[_0x2c689f(0x197)][_0x2c689f(0x176)](_0x478ef1=>_0x126e88['on'][_0x2c689f(0x197)][_0x2c689f(0x18b)](_0x478ef1))){if(!_0x126e88['on'][_0x2c689f(0x19f)]||_0x177a40[_0x2c689f(0x189)](checkRegisteredUser,sender))await _0x177a40[_0x2c689f(0x1ce)](_0x157239,m,{'conn':conn,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'getRandom':getRandom,'quoted':quoted,'claim':claim,'Hour':Hour,'getProfileData':getProfileData,'checkLimitUser':checkLimitUser,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'Uang':Uang,'claim':claim,'dbPlus':dbPlus,'dbMinus':dbMinus,'cekuang':cekuang,'addLimit':addLimit,'makeid':makeid,'sleep':sleep,'isRegister':isRegister,'registering':registering,'Kupon':Kupon,'cekkupon':cekkupon,'bytesToSize':bytesToSize,'isSticker':isSticker,'isQuotedSticker':isQuotedSticker,'isQuotedAudio':isQuotedAudio,'resetLimits':resetLimits,'sendContact':sendContact,'addBanned':addBanned,'addPremium':addPremium,'groupName':groupName,'switchGroup':switchGroup,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'cmd':cmd});else return m[_0x2c689f(0x1c6)](mess[_0x2c689f(0x1b0)]);}}else m[_0x2c689f(0x1c6)](mess[_0x2c689f(0x17e)]);}}}}catch(_0x544a44){console[_0x2c689f(0x187)](_0x2c689f(0x192)+_0x2c689f(0x1bd)+_0x2c689f(0x1c8)+_0x2de813),console[_0x2c689f(0x170)](_0x544a44);}}}}catch(_0x52d8bb){console[_0x2c689f(0x187)](_0x2c689f(0x1a7)+_0x2c689f(0x1c7)+_0x2c689f(0x171)+_0x15feec),console[_0x2c689f(0x170)](_0x52d8bb);}}let gambar=m[_0x48491c(0x1cf)]===_0x48491c(0x185)+'ge',stiker=m[_0x48491c(0x1cf)]===_0x48491c(0x1dc)+_0x48491c(0x188),audio=m[_0x48491c(0x1cf)]===_0x48491c(0x19a)+'ge',video=m[_0x48491c(0x1cf)]===_0x48491c(0x1bf)+'ge',doc=m[_0x48491c(0x1cf)]===_0x48491c(0x190)+_0x48491c(0x183);(gambar||audio||stiker||video||doc)&&console[_0x48491c(0x187)](chalk[_0x48491c(0x169)][_0x48491c(0x1e3)](''+(gambar?_0x48491c(0x1e7):'')+(audio&&gambar?',\x20':'')+(audio?_0x48491c(0x17a):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x48491c(0x1e0):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x48491c(0x199):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x48491c(0x1ab)+_0x48491c(0x183):'')));let talking=body;console[_0x48491c(0x187)](chalk[_0x48491c(0x179)][_0x48491c(0x1c3)](''+pushname)),console[_0x48491c(0x187)](chalk[_0x48491c(0x169)][_0x48491c(0x1e3)](talking));function _0x3537(_0x23c852,_0x201acd){const _0xf86249=_0x564f();return _0x3537=function(_0x3182cd,_0x447cad){_0x3182cd=_0x3182cd-(0x1*-0x19ff+-0x106d+0x2bcf);let _0x40f725=_0xf86249[_0x3182cd];return _0x40f725;},_0x3537(_0x23c852,_0x201acd);}m[_0x48491c(0x16a)]&&isCmd&&!m[_0x48491c(0x1c2)]&&console[_0x48491c(0x187)](colors[_0x48491c(0x1e4)][_0x48491c(0x1e3)](_0x48491c(0x1c5))+'\x20'+colors[_0x48491c(0x163)](time)+'\x20'+colors[_0x48491c(0x179)][_0x48491c(0x1c3)](command)+'\x20'+colors[_0x48491c(0x1e4)](_0x48491c(0x186))+'\x20'+colors[_0x48491c(0x18f)](groupName));!m[_0x48491c(0x16a)]&&isCmd&&!m[_0x48491c(0x1c2)]&&console[_0x48491c(0x187)](colors[_0x48491c(0x1e4)][_0x48491c(0x1e3)](_0x48491c(0x1aa))+'\x20'+colors[_0x48491c(0x163)](time)+'\x20'+colors[_0x48491c(0x179)][_0x48491c(0x1c3)](command)+'\x20'+colors[_0x48491c(0x1e4)](_0x48491c(0x186))+'\x20'+colors[_0x48491c(0x18f)](pushname));function _0x564f(){const _0x173445=['statSync','writeFile','Error\x20read','1125333BAVRaO','\x20Limit\x20','Private','Dokumen\x20Me','HrLKf','/userdata','GrupAdmin','forEach','daftar','8743uYMqmV','key','TLKuH','ZWYBa','ENOENT','./database','readMessag','cdeHI','grPyT','/group','isFile','command','rting\x20plug','rNxKM','videoMessa','function','shVtl','fromMe','bgWhite','catch','Group','reply','ing\x20direct','in:\x20','owner','chat','105188WawJLD','XZMvi','.json','epWfP','mtype','OnlyOwner','endsWith','LmuNq','CzVDB','stringify','event','zspvV','parse','writeFileS','sender','admin','Terpakai\x20','stickerMes','44MkRzwI','PbHbw','object','Sticker\x20馃帹','xJziA','readFile','bold','green','ync','rNBbw','Gambar\x20馃柤','readFileSy','group','brightCyan','qmYyq','WKwzf','length','OgIIV','isDirector','white','isGroup','6330BuIXIu','uZPhz','readdirSyn','banned','find','error','ory:\x20','composing','BraLx','kupon','OnlyPM','some','hyYcC','6259085KslwSF','black','Audio\x20馃帶','uang','plugins','private','premium','61965xUKBvU','37609XmHxPK','join','push','ssage','amount','imageMessa','from','log','sage','CDnjw','.js','includes','existsSync','split','JeWOP','blue','documentMe','12830HeQwGp','Error\x20impo','tags','129GrHsjP','oJJhr','iPYro','names','Qeyrc','Video\x20馃幀','audioMessa','utf8','OnlyGroup','2276192RdtYao','limit','register','LghrI','sendPresen','code','number','ceUpdate'];_0x564f=function(){return _0x173445;};return _0x564f();}

} catch (err) {
console.log(color('ERROR', 'red'), err)
m.reply(`${err}`)
}}
