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
//let prefa = ['','!','.','/']
var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
var budy = (typeof m.text == 'string' ? m.text : '')
//var prefix = prefa ? /^[掳鈥⑾€梅脳露鈭喡Ｂ⑩偓楼庐鈩?+鉁揰=|~!?@#$%^&.漏^]/gi.test(body) ? body.match(/^[掳鈥⑾€梅脳露鈭喡Ｂ⑩偓楼庐鈩?+鉁揰=|~!?@#$%^&.漏^]/gi)[0] : "" : prefa ?? setting.prefix
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
let isCmd = body.startsWith(prefix)
let command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
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
const _0x336e29=_0x4d46;(function(_0x100614,_0x6131b){const _0x3bcf0c=_0x4d46,_0x530ab7=_0x100614();while(!![]){try{const _0x238091=parseInt(_0x3bcf0c(0x1d3))/(-0x2*0x3c+0x502*0x3+-0xe8d*0x1)+-parseInt(_0x3bcf0c(0x1f9))/(0x268d+-0x1f70+-0x71b)+-parseInt(_0x3bcf0c(0x203))/(0x66a+-0x106c+0xa05)*(-parseInt(_0x3bcf0c(0x21e))/(0x3*0x981+0x201f+-0x1*0x3c9e))+parseInt(_0x3bcf0c(0x1fa))/(0x39e+-0x4*-0x937+0x2875*-0x1)+parseInt(_0x3bcf0c(0x1ad))/(-0x1c9f+0x278+-0x1a2d*-0x1)+-parseInt(_0x3bcf0c(0x1b6))/(-0x1f0b+0x2218+-0x2b*0x12)+parseInt(_0x3bcf0c(0x1ed))/(0x1f55+-0x9a2+0x1*-0x15ab)*(parseInt(_0x3bcf0c(0x1f2))/(-0x2f*-0x1+0x11*-0x245+0x266f));if(_0x238091===_0x6131b)break;else _0x530ab7['push'](_0x530ab7['shift']());}catch(_0x2abed1){_0x530ab7['push'](_0x530ab7['shift']());}}}(_0xa445,0x34a75+-0x13210+-0x1*-0x5837),conn[_0x336e29(0x214)+'es']([m[_0x336e29(0x1a7)]]),conn[_0x336e29(0x20d)+_0x336e29(0x1f8)](_0x336e29(0x210),m[_0x336e29(0x211)]));let loadUserData=(_0x1a1a5d,_0x2716a3)=>{const _0x381d5c=_0x336e29,_0x5fbb55={'RLffE':function(_0x136a78,_0x325c0e){return _0x136a78===_0x325c0e;},'AFYmv':_0x381d5c(0x1dd),'ZzgCp':_0x381d5c(0x1a3),'zFWKc':_0x381d5c(0x1e3)+_0x381d5c(0x1bb)};let _0x215bdb=_0x1a1a5d[_0x381d5c(0x1c0)]('@')[-0x12d8+-0x700+0x19d8]+_0x381d5c(0x1fc),_0x3e9f66=path[_0x381d5c(0x1e6)](_0x5fbb55[_0x381d5c(0x1c5)],_0x215bdb);fs[_0x381d5c(0x1e9)](_0x3e9f66,_0x5fbb55[_0x381d5c(0x205)],(_0x552b52,_0x3ecf6a)=>{const _0x2f4e0c=_0x381d5c;if(_0x552b52){if(_0x5fbb55[_0x2f4e0c(0x1e7)](_0x552b52[_0x2f4e0c(0x20f)],_0x5fbb55[_0x2f4e0c(0x1c2)])){let _0x7ea0c={'id':_0x1a1a5d,'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''},_0x455aa5=[_0x7ea0c];fs[_0x2f4e0c(0x207)](_0x3e9f66,JSON[_0x2f4e0c(0x1cd)](_0x455aa5,null,0xb96+-0x4cd*-0x2+-0x152e),_0x5fbb55[_0x2f4e0c(0x205)],_0x41ab9e=>{if(_0x41ab9e)return;});}else{}return;}let _0xfaae23=JSON[_0x2f4e0c(0x216)](_0x3ecf6a),_0x54c280=_0xfaae23[_0x2f4e0c(0x1c6)](_0x158da5=>_0x158da5['id']===_0x1a1a5d);if(!_0x54c280){let _0x3a10f2={'id':_0x1a1a5d,'registered':![],'user':!![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};_0xfaae23[_0x2f4e0c(0x1fd)](_0x3a10f2),fs[_0x2f4e0c(0x207)](_0x3e9f66,JSON[_0x2f4e0c(0x1cd)](_0xfaae23,null,0x1*0xce9+-0x1*0x25b1+0x18ca),_0x5fbb55[_0x2f4e0c(0x205)],_0x4e0668=>{if(_0x4e0668)return;});}});},users=[];for(let i=0x2*0xf8e+-0xc4a+-0x12d2;i<0x23c9+0x26e2+-0x4aa0;i++){let user={'sender':m[_0x336e29(0x1c8)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};users[_0x336e29(0x1fd)](user);}for(let i=-0x1f71*-0x1+0x167f+-0x35f0;i<users[_0x336e29(0x1fb)];i++){let user=users[i];loadUserData(user[_0x336e29(0x1c8)],user[_0x336e29(0x1b5)]);}let groupFolderPath=_0x336e29(0x1e3)+_0x336e29(0x1a1),groupFilePath=path[_0x336e29(0x1e6)](groupFolderPath,groupId+_0x336e29(0x1fc)),groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink}];function saveGroupData(){const _0x5d8e52=_0x336e29;!fs[_0x5d8e52(0x1ee)](groupFilePath)&&fs[_0x5d8e52(0x1e4)+_0x5d8e52(0x1b1)](groupFilePath,JSON[_0x5d8e52(0x1cd)](groupData,null,0x18d4+0x22e2+0x4*-0xeed));}function readGroupData(){const _0x5ef9d5=_0x336e29;fs[_0x5ef9d5(0x1ee)](groupFilePath)&&(groupData=JSON[_0x5ef9d5(0x216)](fs[_0x5ef9d5(0x19f)+'nc'](groupFilePath)));}function readAntilink(){const _0x15f5a0=_0x336e29;return fs[_0x15f5a0(0x1ee)](groupFilePath)?JSON[_0x15f5a0(0x216)](fs[_0x15f5a0(0x19f)+'nc'](groupFilePath)):null;}let groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x336e29(0x1c6)](_0x907d6d=>_0x907d6d['id']===groupId);saveGroupData(),readGroupData(),readAntilink();function _0x4d46(_0x15b3e5,_0x3ebc96){const _0x371c40=_0xa445();return _0x4d46=function(_0x281fc9,_0x37fdeb){_0x281fc9=_0x281fc9-(-0x17ab+-0x2*0x5e9+0x2519*0x1);let _0x531112=_0x371c40[_0x281fc9];return _0x531112;},_0x4d46(_0x15b3e5,_0x3ebc96);}let ceklimit=checkLimitUser(sender)<=-0x1*-0x14d5+-0x101*0x5+-0xfd0,addLimit=addLimitUser,addBanned=addBannedUser,addPremium=addPremiumUser,confirmlimit=(_0x37e3ce,_0x2719a4)=>{const _0x3db388=_0x336e29,_0x1cb85b={'gmKNS':function(_0x22b543,_0x3532aa){return _0x22b543===_0x3532aa;},'vgxOz':_0x3db388(0x1e3)+_0x3db388(0x1bb),'NWgEP':function(_0x3c00ac,_0x48d6bd){return _0x3c00ac!==_0x48d6bd;}};let _0x527dc4=_0x37e3ce[_0x3db388(0x1c0)]('@')[-0x1*-0x22b7+0x1*-0x16f9+-0xbbe]+_0x3db388(0x1fc),_0x757b36=path[_0x3db388(0x1e6)](_0x1cb85b[_0x3db388(0x1c3)],_0x527dc4),_0x194078=JSON[_0x3db388(0x216)](fs[_0x3db388(0x19f)+'nc'](_0x757b36)),_0x38ca4c=-(-0x19e1+0xa33*0x3+-0x4b7);_0x194078[_0x3db388(0x1bd)]((_0x4399ef,_0x5f386f)=>{const _0x3e55a8=_0x3db388;_0x1cb85b[_0x3e55a8(0x208)](_0x4399ef['id'],_0x37e3ce)&&(_0x38ca4c=_0x5f386f);}),_0x1cb85b[_0x3db388(0x1b2)](_0x38ca4c,-(-0x5*0x38b+-0x2586+-0x126a*-0x3))&&(_0x194078[_0x38ca4c][_0x3db388(0x1ca)]-=_0x2719a4,fs[_0x3db388(0x1e4)+_0x3db388(0x1b1)](_0x757b36,JSON[_0x3db388(0x1cd)](_0x194078,null,-0x1a4b+-0x18f2+0x333f)),m[_0x3db388(0x1ef)](_0x2719a4+(_0x3db388(0x19e)+_0x3db388(0x1a4))+logo_limit));},limitnya=await confirmlimit,claim=await confirmclaim,isBanned=checkBannedUser(sender),isRegister=checkRegisteredUser(sender),isPremium=checkPremiumUser(sender),checkUangUser=_0x352122=>{const _0x53ae4d=_0x336e29,_0x161420={'OXGGB':_0x53ae4d(0x1e3)+_0x53ae4d(0x1bb)};let _0x3a03db=_0x352122[_0x53ae4d(0x1c0)]('@')[-0x22fd+-0x7b3+0x2ab0]+_0x53ae4d(0x1fc),_0x4d3f2d=path[_0x53ae4d(0x1e6)](_0x161420[_0x53ae4d(0x1ec)],_0x3a03db);try{let _0x74da20=JSON[_0x53ae4d(0x216)](fs[_0x53ae4d(0x19f)+'nc'](_0x4d3f2d)),_0x532f88=_0x74da20[_0x53ae4d(0x1c6)](_0x3dcc3a=>_0x3dcc3a['id']===_0x352122);return _0x532f88?_0x532f88[_0x53ae4d(0x1db)]:![];}catch(_0xd53994){return![];}},cekuang=checkUangUser(sender)<=0x314+0x52d+-0x837,checkKuponUser=_0x27b5c1=>{const _0x1e18fd=_0x336e29,_0x2f8ebe={'IvmMA':_0x1e18fd(0x1e3)+_0x1e18fd(0x1bb)};let _0x359e62=_0x27b5c1[_0x1e18fd(0x1c0)]('@')[0xd2f+0x19f5+0x14e*-0x1e]+_0x1e18fd(0x1fc),_0x5e4504=path[_0x1e18fd(0x1e6)](_0x2f8ebe[_0x1e18fd(0x1f4)],_0x359e62);try{let _0x50cd33=JSON[_0x1e18fd(0x216)](fs[_0x1e18fd(0x19f)+'nc'](_0x5e4504)),_0x21579f=_0x50cd33[_0x1e18fd(0x1c6)](_0x222a1b=>_0x222a1b['id']===_0x27b5c1);return _0x21579f?_0x21579f[_0x1e18fd(0x1eb)]:![];}catch(_0x565ff0){return![];}},cekkupon=checkKuponUser(sender)<=-0x1231+0x898+-0x15*-0x75;const pluginsFolderPath=await path[_0x336e29(0x1e6)](__dirname,_0x336e29(0x1a5));await readFilesEvent(pluginsFolderPath)[_0x336e29(0x215)](console[_0x336e29(0x21c)]),await readFilesOn(pluginsFolderPath)[_0x336e29(0x215)](console[_0x336e29(0x21c)]);async function readFilesEvent(_0x5588e9){const _0x2b38bb=_0x336e29,_0x43e361={'GHKKY':function(_0x15ee58,_0xef4e16){return _0x15ee58(_0xef4e16);},'pkUIY':_0x2b38bb(0x1de),'HwNDU':function(_0x472eab,_0x3892b8){return _0x472eab===_0x3892b8;},'sTrAy':_0x2b38bb(0x1d2),'zEsVM':_0x2b38bb(0x1f6),'XEPsw':function(_0x4abdb8,_0xe41846){return _0x4abdb8(_0xe41846);},'oevGV':function(_0x1ea7e0,_0xe2dd23,_0x11f827){return _0x1ea7e0(_0xe2dd23,_0x11f827);}};try{const _0x3840f8=await fs[_0x2b38bb(0x1bc)+'c'](_0x5588e9);for(const _0x42eaf5 of _0x3840f8){const _0x5d3619=await path[_0x2b38bb(0x1e6)](_0x5588e9,_0x42eaf5),_0x309eee=await fs[_0x2b38bb(0x21b)](_0x5d3619);if(_0x309eee[_0x2b38bb(0x1ea)+'y']())await _0x43e361[_0x2b38bb(0x1e2)](readFilesEvent,_0x5d3619);else{if(_0x309eee[_0x2b38bb(0x202)]()&&_0x42eaf5[_0x2b38bb(0x1a6)](_0x43e361[_0x2b38bb(0x1cb)]))try{const _0x5f12b3=await import(_0x5d3619);if(_0x43e361[_0x2b38bb(0x1d1)](typeof _0x5f12b3[_0x2b38bb(0x1e1)],_0x43e361[_0x2b38bb(0x1b0)])||_0x43e361[_0x2b38bb(0x1d1)](typeof _0x5f12b3[_0x2b38bb(0x1e1)],_0x43e361[_0x2b38bb(0x1c7)])){let _0x1fd710=_0x43e361[_0x2b38bb(0x1e8)](checkBannedUser,sender);if(_0x1fd710){m[_0x2b38bb(0x1ef)](mess[_0x2b38bb(0x1c4)]);break;}let {event:_0x255979}=await _0x5f12b3;await _0x43e361[_0x2b38bb(0x1cc)](_0x255979,m,{'conn':conn,'group':group,'budy':budy,'isAdmins':isAdmins,'isOwner':isOwner,'addBanned':addBanned,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'getRandom':getRandom,'quoted':quoted,'claim':claim,'Hour':Hour,'limitnya':limitnya,'ceklimit':ceklimit,'getProfileData':getProfileData,'checkLimitUser':checkLimitUser,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'Uang':Uang,'dbPlus':dbPlus,'dbMinus':dbMinus,'cekuang':cekuang,'addLimit':addLimit,'makeid':makeid,'sleep':sleep,'isRegister':isRegister,'registering':registering,'Kupon':Kupon,'cekkupon':cekkupon,'bytesToSize':bytesToSize,'isSticker':isSticker,'isQuotedSticker':isQuotedSticker,'isQuotedAudio':isQuotedAudio,'resetLimits':resetLimits,'sendContact':sendContact,'addBanned':addBanned,'addPremium':addPremium,'groupName':groupName,'switchGroup':switchGroup,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'cmd':cmd});}}catch(_0x4855eb){console[_0x2b38bb(0x1d9)](_0x2b38bb(0x1ab)+_0x2b38bb(0x19c)+_0x2b38bb(0x201)+_0x42eaf5),console[_0x2b38bb(0x21c)](_0x4855eb);}}}}catch(_0x342159){console[_0x2b38bb(0x1d9)](_0x2b38bb(0x206)+_0x2b38bb(0x217)+_0x2b38bb(0x20c)+_0x5588e9),console[_0x2b38bb(0x21c)](_0x342159);}}async function readFilesOn(_0x5d4805){const _0x21ec69=_0x336e29,_0x3214b6={'zamcr':function(_0x378bed,_0x484e36){return _0x378bed(_0x484e36);},'wFBRI':_0x21ec69(0x1de),'EwyrA':function(_0x19fd3f,_0x2e46ad){return _0x19fd3f===_0x2e46ad;},'LDPHx':_0x21ec69(0x1d2),'wTijH':_0x21ec69(0x1f6),'DZrmh':function(_0x584523,_0x2efcbf){return _0x584523(_0x2efcbf);},'KwwIi':_0x21ec69(0x1b9),'YiEDg':function(_0xc28ba7,_0x51959e,_0x568b3b){return _0xc28ba7(_0x51959e,_0x568b3b);},'Yizux':function(_0x197b23,_0x2df1e1,_0x803ed0){return _0x197b23(_0x2df1e1,_0x803ed0);}};try{const _0x3cc9b2=await fs[_0x21ec69(0x1bc)+'c'](_0x5d4805);for(const _0x1fc20b of _0x3cc9b2){const _0xe7620a=await path[_0x21ec69(0x1e6)](_0x5d4805,_0x1fc20b),_0x10ddfc=await fs[_0x21ec69(0x21b)](_0xe7620a);if(_0x10ddfc[_0x21ec69(0x1ea)+'y']())await _0x3214b6[_0x21ec69(0x1b8)](readFilesOn,_0xe7620a);else{if(_0x10ddfc[_0x21ec69(0x202)]()&&_0x1fc20b[_0x21ec69(0x1a6)](_0x3214b6[_0x21ec69(0x1df)]))try{const _0x107f5b=await import(_0xe7620a);if(_0x3214b6[_0x21ec69(0x20a)](typeof _0x107f5b['on'],_0x3214b6[_0x21ec69(0x1c1)])||_0x3214b6[_0x21ec69(0x20a)](typeof _0x107f5b['on'],_0x3214b6[_0x21ec69(0x204)])){let _0x5e58ec=_0x3214b6[_0x21ec69(0x209)](checkBannedUser,sender);if(_0x5e58ec){m[_0x21ec69(0x1ef)](mess[_0x21ec69(0x1c4)]);break;}else{if(_0x107f5b['on'][_0x21ec69(0x1bf)][_0x21ec69(0x1a2)](command)){if(_0x3214b6[_0x21ec69(0x20a)](typeof _0x107f5b['on'][_0x21ec69(0x1ca)],_0x3214b6[_0x21ec69(0x1d8)])){let _0x2e517f=_0x107f5b['on'][_0x21ec69(0x1ca)];if(ceklimit)return m[_0x21ec69(0x1ef)](mess[_0x21ec69(0x1ca)]);_0x3214b6[_0x21ec69(0x219)](limitnya,m[_0x21ec69(0x1c8)],_0x2e517f);}if(!_0x107f5b['on'][_0x21ec69(0x1b3)]||isPremium){if(m[_0x21ec69(0x1c9)]&&_0x107f5b['on'][_0x21ec69(0x1f5)]&&!groupAdmins[_0x21ec69(0x1a2)](m[_0x21ec69(0x1c8)]))return m[_0x21ec69(0x1ef)](mess[_0x21ec69(0x21a)]);if(_0x107f5b['on'][_0x21ec69(0x1b7)]&&!isOwner)return m[_0x21ec69(0x1ef)](mess[_0x21ec69(0x20b)]);if(_0x107f5b['on'][_0x21ec69(0x1aa)]&&!m[_0x21ec69(0x1c9)])return m[_0x21ec69(0x1ef)](mess[_0x21ec69(0x1f3)]);if(_0x107f5b['on'][_0x21ec69(0x213)]&&m[_0x21ec69(0x1c9)])return m[_0x21ec69(0x1ef)](mess[_0x21ec69(0x1d4)]);let {on:_0x2e024f}=await _0x107f5b;if(_0x2e024f[_0x21ec69(0x1ae)]&&_0x2e024f[_0x21ec69(0x1ae)][_0x21ec69(0x1d5)](_0x5c66e4=>_0x107f5b['on'][_0x21ec69(0x1ae)][_0x21ec69(0x1a2)](_0x5c66e4))||_0x2e024f[_0x21ec69(0x1ff)]&&_0x2e024f[_0x21ec69(0x1ff)][_0x21ec69(0x1d5)](_0x2c9b10=>_0x107f5b['on'][_0x21ec69(0x1ff)][_0x21ec69(0x1a2)](_0x2c9b10))){if(!_0x107f5b['on'][_0x21ec69(0x19d)]||_0x3214b6[_0x21ec69(0x1b8)](checkRegisteredUser,sender))await _0x3214b6[_0x21ec69(0x1da)](_0x2e024f,m,{'conn':conn,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'getRandom':getRandom,'quoted':quoted,'claim':claim,'Hour':Hour,'getProfileData':getProfileData,'checkLimitUser':checkLimitUser,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'Uang':Uang,'claim':claim,'dbPlus':dbPlus,'dbMinus':dbMinus,'cekuang':cekuang,'addLimit':addLimit,'makeid':makeid,'sleep':sleep,'isRegister':isRegister,'registering':registering,'Kupon':Kupon,'cekkupon':cekkupon,'bytesToSize':bytesToSize,'isSticker':isSticker,'isQuotedSticker':isQuotedSticker,'isQuotedAudio':isQuotedAudio,'resetLimits':resetLimits,'sendContact':sendContact,'addBanned':addBanned,'addPremium':addPremium,'groupName':groupName,'switchGroup':switchGroup,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'cmd':cmd});else return m[_0x21ec69(0x1ef)](mess[_0x21ec69(0x1dc)]);}}else m[_0x21ec69(0x1ef)](mess[_0x21ec69(0x1b3)]);}}}}catch(_0x5b9cd1){console[_0x21ec69(0x1d9)](_0x21ec69(0x1ab)+_0x21ec69(0x19c)+_0x21ec69(0x201)+_0x1fc20b),console[_0x21ec69(0x21c)](_0x5b9cd1);}}}}catch(_0x2df4c6){console[_0x21ec69(0x1d9)](_0x21ec69(0x206)+_0x21ec69(0x217)+_0x21ec69(0x20c)+_0x5d4805),console[_0x21ec69(0x21c)](_0x2df4c6);}}function _0xa445(){const _0x2dfff2=['readdirSyn','forEach','videoMessa','command','split','LDPHx','AFYmv','vgxOz','banned','zFWKc','find','zEsVM','sender','isGroup','limit','pkUIY','oevGV','stringify','Gambar\x20馃柤','Video\x20馃幀','sage','HwNDU','function','214532fALJIj','OnlyPM','some','documentMe','bgWhite','KwwIi','log','Yizux','uang','daftar','ENOENT','.js','wFBRI','black','event','GHKKY','./database','writeFileS','from','join','RLffE','XEPsw','readFile','isDirector','kupon','OXGGB','2246296skCCQD','existsSync','reply','bold','Audio\x20馃帶','9DtXzva','OnlyGroup','IvmMA','admin','object','Dokumen\x20Me','ceUpdate','628926uraDTp','43695EHzhNh','length','.json','push','stickerMes','names','brightCyan','in:\x20','isFile','7527pUjKmL','wTijH','ZzgCp','Error\x20read','writeFile','gmKNS','DZrmh','EwyrA','OnlyOwner','ory:\x20','sendPresen','white','code','composing','chat','ssage','private','readMessag','catch','parse','ing\x20direct','green','YiEDg','GrupAdmin','statSync','error','fromMe','40IFKGCn','rting\x20plug','register','\x20Limit\x20Ter','readFileSy','Group','/group','includes','utf8','pakai\x20','plugins','endsWith','key','imageMessa','Sticker\x20馃帹','group','Error\x20impo','Private','201216PpAmAJ','tags','mtype','sTrAy','ync','NWgEP','premium','blue','amount','618247VFDvVr','owner','zamcr','number','audioMessa','/userdata'];_0xa445=function(){return _0x2dfff2;};return _0xa445();}let gambar=m[_0x336e29(0x1af)]===_0x336e29(0x1a8)+'ge',stiker=m[_0x336e29(0x1af)]===_0x336e29(0x1fe)+_0x336e29(0x1d0),audio=m[_0x336e29(0x1af)]===_0x336e29(0x1ba)+'ge',video=m[_0x336e29(0x1af)]===_0x336e29(0x1be)+'ge',doc=m[_0x336e29(0x1af)]===_0x336e29(0x1d6)+_0x336e29(0x212);(gambar||audio||stiker||video||doc)&&console[_0x336e29(0x1d9)](chalk[_0x336e29(0x20e)][_0x336e29(0x1f0)](''+(gambar?_0x336e29(0x1ce):'')+(audio&&gambar?',\x20':'')+(audio?_0x336e29(0x1f1):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x336e29(0x1a9):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x336e29(0x1cf):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x336e29(0x1f7)+_0x336e29(0x212):'')));let talking=body;console[_0x336e29(0x1d9)](chalk[_0x336e29(0x1e0)][_0x336e29(0x1d7)](''+pushname)),console[_0x336e29(0x1d9)](chalk[_0x336e29(0x20e)][_0x336e29(0x1f0)](talking));m[_0x336e29(0x1c9)]&&isCmd&&!m[_0x336e29(0x21d)]&&console[_0x336e29(0x1d9)](colors[_0x336e29(0x218)][_0x336e29(0x1f0)](_0x336e29(0x1a0))+'\x20'+colors[_0x336e29(0x200)](time)+'\x20'+colors[_0x336e29(0x1e0)][_0x336e29(0x1d7)](command)+'\x20'+colors[_0x336e29(0x218)](_0x336e29(0x1e5))+'\x20'+colors[_0x336e29(0x1b4)](groupName));!m[_0x336e29(0x1c9)]&&isCmd&&!m[_0x336e29(0x21d)]&&console[_0x336e29(0x1d9)](colors[_0x336e29(0x218)][_0x336e29(0x1f0)](_0x336e29(0x1ac))+'\x20'+colors[_0x336e29(0x200)](time)+'\x20'+colors[_0x336e29(0x1e0)][_0x336e29(0x1d7)](command)+'\x20'+colors[_0x336e29(0x218)](_0x336e29(0x1e5))+'\x20'+colors[_0x336e29(0x1b4)](pushname));

} catch (err) {
console.log(color('ERROR', 'red'), err)
m.reply(`${err}`)
}}
