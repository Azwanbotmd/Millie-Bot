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
const _0x2eecf0=_0x1c59;function _0x1c59(_0xb81d97,_0x34ca9f){const _0x1ee257=_0x6ef8();return _0x1c59=function(_0x21ed34,_0x451422){_0x21ed34=_0x21ed34-(-0x944+0x1f6a+-0x1597*0x1);let _0x56caf7=_0x1ee257[_0x21ed34];return _0x56caf7;},_0x1c59(_0xb81d97,_0x34ca9f);}(function(_0x2d5598,_0x22d2df){const _0x2ab95e=_0x1c59,_0x5b3b4c=_0x2d5598();while(!![]){try{const _0x3ea619=-parseInt(_0x2ab95e(0xcf))/(0x1*-0x175b+0x2127+-0x6d*0x17)+-parseInt(_0x2ab95e(0xe9))/(0x1ba5+-0x176e+-0x435)+parseInt(_0x2ab95e(0xce))/(0x23a6+0x95*-0x3e+-0x1*-0x73)+parseInt(_0x2ab95e(0x8f))/(0x1*0x187e+-0x17e7+-0x93)*(parseInt(_0x2ab95e(0x94))/(0x2087+-0x1728+-0x95a))+-parseInt(_0x2ab95e(0xc6))/(0xfb+-0xa06+0x911)*(parseInt(_0x2ab95e(0x9e))/(0x20af+0x1d3+-0x227b))+parseInt(_0x2ab95e(0xc5))/(0xcdb+0xaf1+0x9c*-0x27)*(-parseInt(_0x2ab95e(0x91))/(0x35e+-0xc7*0x18+-0xf53*-0x1))+-parseInt(_0x2ab95e(0xcd))/(0x1d29+0x2aa*-0xd+0x583)*(-parseInt(_0x2ab95e(0x107))/(-0x1*-0xd4b+0x1a77+-0xd3d*0x3));if(_0x3ea619===_0x22d2df)break;else _0x5b3b4c['push'](_0x5b3b4c['shift']());}catch(_0x1b05b7){_0x5b3b4c['push'](_0x5b3b4c['shift']());}}}(_0x6ef8,-0xbe15c+-0x31165+-0x15cdcf*-0x1),conn[_0x2eecf0(0xf8)+'es']([m[_0x2eecf0(0xfd)]]),conn[_0x2eecf0(0xd3)+_0x2eecf0(0xf4)](_0x2eecf0(0xfa),m[_0x2eecf0(0xaa)]));let loadUserData=(_0x40e226,_0x19edca)=>{const _0x3d0fdd=_0x2eecf0,_0x4c4b6b={'rMHsS':function(_0xb690a8,_0x54531d){return _0xb690a8===_0x54531d;},'FDAEY':_0x3d0fdd(0xc9),'sWafx':_0x3d0fdd(0xbf),'NjUoI':_0x3d0fdd(0xc1)+_0x3d0fdd(0x101)};let _0x3929a5=_0x40e226[_0x3d0fdd(0xf2)]('@')[-0x1*-0xe2f+0x14c9*0x1+-0x22f8]+_0x3d0fdd(0xb4),_0x12b957=path[_0x3d0fdd(0xd6)](_0x4c4b6b[_0x3d0fdd(0xc7)],_0x3929a5);fs[_0x3d0fdd(0xdb)](_0x12b957,_0x4c4b6b[_0x3d0fdd(0xad)],(_0x14e374,_0x463ca7)=>{const _0x507db5=_0x3d0fdd;if(_0x14e374){if(_0x4c4b6b[_0x507db5(0xcc)](_0x14e374[_0x507db5(0x9c)],_0x4c4b6b[_0x507db5(0xff)])){let _0x2e0b68={'id':_0x40e226,'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''},_0x166325=[_0x2e0b68];fs[_0x507db5(0xae)](_0x12b957,JSON[_0x507db5(0x9f)](_0x166325,null,-0xe9*0x1d+0xe98+0xbcf),_0x4c4b6b[_0x507db5(0xad)],_0x1ed17f=>{if(_0x1ed17f)return;});}else{}return;}let _0xd7c151=JSON[_0x507db5(0xa2)](_0x463ca7),_0x18cd4f=_0xd7c151[_0x507db5(0x95)](_0x53d40a=>_0x53d40a['id']===_0x40e226);if(!_0x18cd4f){let _0x4ca743={'id':_0x40e226,'registered':![],'user':!![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};_0xd7c151[_0x507db5(0x90)](_0x4ca743),fs[_0x507db5(0xae)](_0x12b957,JSON[_0x507db5(0x9f)](_0xd7c151,null,-0x1*0x35f+-0x2346*-0x1+0x1fe5*-0x1),_0x4c4b6b[_0x507db5(0xad)],_0x51dd88=>{if(_0x51dd88)return;});}});},users=[];for(let i=-0x595*-0x1+0xf07+-0x149c;i<-0x1b7*-0xd+-0x1bba+0x2*0x2bd;i++){let user={'sender':m[_0x2eecf0(0xb6)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};users[_0x2eecf0(0x90)](user);}for(let i=0x1976+-0x2*-0x1f7+0xd1*-0x24;i<users[_0x2eecf0(0x102)];i++){let user=users[i];loadUserData(user[_0x2eecf0(0xb6)],user[_0x2eecf0(0x98)]);}let groupFolderPath=_0x2eecf0(0xc1)+_0x2eecf0(0x96),groupFilePath=path[_0x2eecf0(0xd6)](groupFolderPath,groupId+_0x2eecf0(0xb4)),groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink}];function saveGroupData(){const _0x5d9874=_0x2eecf0;!fs[_0x5d9874(0xb0)](groupFilePath)&&fs[_0x5d9874(0xeb)+_0x5d9874(0xaf)](groupFilePath,JSON[_0x5d9874(0x9f)](groupData,null,-0x1a1+0x5*0xb9+-0x2*0xfd));}function _0x6ef8(){const _0x502fe2=['FDAEY','sYdbk','/userdata','length','bold','white','hLkYJ','isDirector','8232191jJNVxA','limit','KHONN','imageMessa','includes','ing\x20direct','CnPgP','52WazAyV','push','3143268vSryJy','rting\x20plug','uang','38365tSiRDo','find','/group','Terpakai\x20','amount','brightCyan','stickerMes','mtype','code','Dokumen\x20Me','21ygUOdv','stringify','isGroup','fromMe','parse','readFileSy','xCSaX','register','statSync','sage','blue','Group','chat','plugins','\x20Limit\x20','sWafx','writeFile','ync','existsSync','xwiOj','log','names','.json','RjEnz','sender','videoMessa','audioMessa','Video\x20馃幀','from','function','tags','owner','Private','utf8','some','./database','ssage','.js','yemdz','16lkZMqa','1072902XTmPbr','NjUoI','Error\x20read','ENOENT','in:\x20','GrupAdmin','rMHsS','30clbSrI','2047149BIBxQb','583964rbiuSM','ozHdu','EERBO','readdirSyn','sendPresen','black','isFile','join','stack','Sticker\x20馃帹','catch','object','readFile','documentMe','OnlyOwner','Audio\x20馃帶','green','admin','ory:\x20','forEach','kupon','Nfeip','reply','group','qmLvv','bgWhite','1518124VgbDzJ','endsWith','writeFileS','daftar','banned','OnlyPM','OnlyGroup','Gambar\x20馃柤','number','split','fVXta','ceUpdate','error','KuKIO','private','readMessag','Error\x20impo','composing','AkldW','command','key','premium'];_0x6ef8=function(){return _0x502fe2;};return _0x6ef8();}function readGroupData(){const _0x4bd37f=_0x2eecf0;fs[_0x4bd37f(0xb0)](groupFilePath)&&(groupData=JSON[_0x4bd37f(0xa2)](fs[_0x4bd37f(0xa3)+'nc'](groupFilePath)));}function readAntilink(){const _0x18195d=_0x2eecf0;return fs[_0x18195d(0xb0)](groupFilePath)?JSON[_0x18195d(0xa2)](fs[_0x18195d(0xa3)+'nc'](groupFilePath)):null;}let groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x2eecf0(0x95)](_0xb1dbac=>_0xb1dbac['id']===groupId);saveGroupData(),readGroupData(),readAntilink();let ceklimit=await checkLimitUser(sender)<=-0x1d48+0x806+0x1542&&!m[_0x2eecf0(0xa1)],addLimit=addLimitUser,addBanned=addBannedUser,addPremium=addPremiumUser;async function confirmlimit(_0x56cd5d,_0x47400a){const _0x2958ec=_0x2eecf0,_0x11a0d9={'KHONN':function(_0x54d795,_0x153699){return _0x54d795===_0x153699;},'fVXta':_0x2958ec(0xc1)+_0x2958ec(0x101),'KuKIO':function(_0x51e7d4,_0xed7cac){return _0x51e7d4!==_0xed7cac;}};if(m[_0x2958ec(0xa1)])return;let _0x74a30f=_0x56cd5d[_0x2958ec(0xf2)]('@')[0x10ad+-0x2e6*0xc+0x121b]+_0x2958ec(0xb4),_0x37fd15=await path[_0x2958ec(0xd6)](_0x11a0d9[_0x2958ec(0xf3)],_0x74a30f),_0x46fcde=JSON[_0x2958ec(0xa2)](fs[_0x2958ec(0xa3)+'nc'](_0x37fd15)),_0x24005a=-(-0x281+0xeed*0x1+-0xc6b);_0x46fcde[_0x2958ec(0xe2)]((_0x892143,_0x55f4ca)=>{const _0x5404c2=_0x2958ec;_0x11a0d9[_0x5404c2(0x109)](_0x892143['id'],_0x56cd5d)&&(_0x24005a=_0x55f4ca);}),_0x11a0d9[_0x2958ec(0xf6)](_0x24005a,-(0x5d0+-0x24d3+0x2*0xf82))&&(_0x46fcde[_0x24005a][_0x2958ec(0x108)]-=_0x47400a,fs[_0x2958ec(0xeb)+_0x2958ec(0xaf)](_0x37fd15,JSON[_0x2958ec(0x9f)](_0x46fcde,null,0x505*0x3+-0x5c*-0x2f+0x11*-0x1e1)),m[_0x2958ec(0xe5)](_0x2958ec(0x97)+_0x47400a+_0x2958ec(0xac)+logo_limit));};let claim=await confirmclaim,isBanned=checkBannedUser(sender),isRegister=checkRegisteredUser(sender),isPremium=checkPremiumUser(sender),checkUangUser=_0x322b31=>{const _0x8a574c=_0x2eecf0,_0x4b937e={'yemdz':_0x8a574c(0xc1)+_0x8a574c(0x101)};let _0x34e1fd=_0x322b31[_0x8a574c(0xf2)]('@')[-0x46*0x31+0x212b+-0x13c5]+_0x8a574c(0xb4),_0x1cef06=path[_0x8a574c(0xd6)](_0x4b937e[_0x8a574c(0xc4)],_0x34e1fd);try{let _0x648a28=JSON[_0x8a574c(0xa2)](fs[_0x8a574c(0xa3)+'nc'](_0x1cef06)),_0x40e88e=_0x648a28[_0x8a574c(0x95)](_0x13f8e8=>_0x13f8e8['id']===_0x322b31);return _0x40e88e?_0x40e88e[_0x8a574c(0x93)]:![];}catch(_0x3375e2){return![];}},cekuang=checkUangUser(sender)<=-0x3*0xcd+-0x115*-0xa+-0x861,checkKuponUser=_0x467691=>{const _0x19c972=_0x2eecf0,_0x25c59b={'xCSaX':_0x19c972(0xc1)+_0x19c972(0x101)};let _0x2a4d3a=_0x467691[_0x19c972(0xf2)]('@')[0x1fe4+0x770+0x347*-0xc]+_0x19c972(0xb4),_0x5b9f57=path[_0x19c972(0xd6)](_0x25c59b[_0x19c972(0xa4)],_0x2a4d3a);try{let _0x4ba100=JSON[_0x19c972(0xa2)](fs[_0x19c972(0xa3)+'nc'](_0x5b9f57)),_0x345d4d=_0x4ba100[_0x19c972(0x95)](_0x384a12=>_0x384a12['id']===_0x467691);return _0x345d4d?_0x345d4d[_0x19c972(0xe3)]:![];}catch(_0x52eb4e){return![];}},cekkupon=checkKuponUser(sender)<=0xe2a+0x22cd+-0x30f7;const pluginsFolderPath=await path[_0x2eecf0(0xd6)](__dirname,_0x2eecf0(0xab));await readFilesOn(pluginsFolderPath)[_0x2eecf0(0xd9)](console[_0x2eecf0(0xf5)]);async function readFilesOn(_0xe8c15a){const _0x17958a=_0x2eecf0,_0x4dcce7={'xwiOj':function(_0x29c332,_0x50237b){return _0x29c332(_0x50237b);},'CnPgP':_0x17958a(0xc3),'ozHdu':function(_0x5131b3,_0x4f0ef3){return _0x5131b3===_0x4f0ef3;},'RjEnz':_0x17958a(0xbb),'sYdbk':_0x17958a(0xda),'qmLvv':function(_0x47634e,_0x592353){return _0x47634e===_0x592353;},'hLkYJ':_0x17958a(0xf1),'AkldW':function(_0x1f19c3,_0x10b287,_0x543188){return _0x1f19c3(_0x10b287,_0x543188);},'Nfeip':function(_0x3cc063,_0x47c7fb){return _0x3cc063(_0x47c7fb);},'EERBO':function(_0x454965,_0x466566,_0xd581de){return _0x454965(_0x466566,_0xd581de);}};try{const _0x5ee7d8=await fs[_0x17958a(0xd2)+'c'](_0xe8c15a);for(const _0x5d80e3 of _0x5ee7d8){const _0x532116=await path[_0x17958a(0xd6)](_0xe8c15a,_0x5d80e3),_0x3226f1=await fs[_0x17958a(0xa6)](_0x532116);if(_0x3226f1[_0x17958a(0x106)+'y']())await _0x4dcce7[_0x17958a(0xb1)](readFilesOn,_0x532116);else{if(_0x3226f1[_0x17958a(0xd5)]()&&_0x5d80e3[_0x17958a(0xea)](_0x4dcce7[_0x17958a(0x10d)]))try{const _0x2ae791=await import(_0x532116);if(_0x4dcce7[_0x17958a(0xd0)](typeof _0x2ae791['on'],_0x4dcce7[_0x17958a(0xb5)])||_0x4dcce7[_0x17958a(0xd0)](typeof _0x2ae791['on'],_0x4dcce7[_0x17958a(0x100)])){let _0x266b3b=await _0x4dcce7[_0x17958a(0xb1)](checkBannedUser,sender);if(_0x266b3b){m[_0x17958a(0xe5)](mess[_0x17958a(0xed)]);break;}else{if(_0x2ae791['on'][_0x17958a(0xfc)][_0x17958a(0x10b)](command)){if(_0x4dcce7[_0x17958a(0xe7)](typeof _0x2ae791['on'][_0x17958a(0x108)],_0x4dcce7[_0x17958a(0x105)])){const _0x2cabd1=await _0x2ae791['on'][_0x17958a(0x108)];if(ceklimit)return m[_0x17958a(0xe5)](mess[_0x17958a(0x108)]);await _0x4dcce7[_0x17958a(0xfb)](confirmlimit,sender,_0x2cabd1);}if(!_0x2ae791['on'][_0x17958a(0xfe)]||isPremium){if(m[_0x17958a(0xa0)]&&_0x2ae791['on'][_0x17958a(0xe0)]&&!groupAdmins[_0x17958a(0x10b)](m[_0x17958a(0xb6)]))return m[_0x17958a(0xe5)](mess[_0x17958a(0xcb)]);if(_0x2ae791['on'][_0x17958a(0xbd)]&&!isOwner)return m[_0x17958a(0xe5)](mess[_0x17958a(0xdd)]);if(_0x2ae791['on'][_0x17958a(0xe6)]&&!m[_0x17958a(0xa0)])return m[_0x17958a(0xe5)](mess[_0x17958a(0xef)]);if(_0x2ae791['on'][_0x17958a(0xf7)]&&m[_0x17958a(0xa0)])return m[_0x17958a(0xe5)](mess[_0x17958a(0xee)]);let {on:_0x3ad623}=await _0x2ae791;if(_0x3ad623[_0x17958a(0xbc)]&&_0x3ad623[_0x17958a(0xbc)][_0x17958a(0xc0)](_0x2f57ae=>_0x2ae791['on'][_0x17958a(0xbc)][_0x17958a(0x10b)](_0x2f57ae))||_0x3ad623[_0x17958a(0xb3)]&&_0x3ad623[_0x17958a(0xb3)][_0x17958a(0xc0)](_0x33fd28=>_0x2ae791['on'][_0x17958a(0xb3)][_0x17958a(0x10b)](_0x33fd28))){if(!_0x2ae791['on'][_0x17958a(0xa5)]||_0x4dcce7[_0x17958a(0xe4)](checkRegisteredUser,sender))await _0x4dcce7[_0x17958a(0xd1)](_0x3ad623,m,{'conn':conn,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'getRandom':getRandom,'quoted':quoted,'claim':claim,'Hour':Hour,'getProfileData':getProfileData,'checkLimitUser':checkLimitUser,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'Uang':Uang,'claim':claim,'dbPlus':dbPlus,'dbMinus':dbMinus,'cekuang':cekuang,'addLimit':addLimit,'makeid':makeid,'sleep':sleep,'isRegister':isRegister,'registering':registering,'Kupon':Kupon,'cekkupon':cekkupon,'bytesToSize':bytesToSize,'isSticker':isSticker,'isQuotedSticker':isQuotedSticker,'isQuotedAudio':isQuotedAudio,'resetLimits':resetLimits,'sendContact':sendContact,'addBanned':addBanned,'addPremium':addPremium,'groupName':groupName,'switchGroup':switchGroup,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'cmd':cmd});else return m[_0x17958a(0xe5)](mess[_0x17958a(0xec)]);}}else m[_0x17958a(0xe5)](mess[_0x17958a(0xfe)]);}}}}catch(_0x213cd0){m[_0x17958a(0xe5)](_0x17958a(0xf9)+_0x17958a(0x92)+_0x17958a(0xca)+_0x5d80e3+'\x0a'+_0x213cd0[_0x17958a(0xd7)]),console[_0x17958a(0xf5)](_0x213cd0);}}}}catch(_0x2c1d55){console[_0x17958a(0xb2)](_0x17958a(0xc8)+_0x17958a(0x10c)+_0x17958a(0xe1)+_0xe8c15a),console[_0x17958a(0xf5)](_0x2c1d55);}}let gambar=m[_0x2eecf0(0x9b)]===_0x2eecf0(0x10a)+'ge',stiker=m[_0x2eecf0(0x9b)]===_0x2eecf0(0x9a)+_0x2eecf0(0xa7),audio=m[_0x2eecf0(0x9b)]===_0x2eecf0(0xb8)+'ge',video=m[_0x2eecf0(0x9b)]===_0x2eecf0(0xb7)+'ge',doc=m[_0x2eecf0(0x9b)]===_0x2eecf0(0xdc)+_0x2eecf0(0xc2);(gambar||audio||stiker||video||doc)&&console[_0x2eecf0(0xb2)](chalk[_0x2eecf0(0x104)][_0x2eecf0(0x103)](''+(gambar?_0x2eecf0(0xf0):'')+(audio&&gambar?',\x20':'')+(audio?_0x2eecf0(0xde):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x2eecf0(0xd8):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x2eecf0(0xb9):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x2eecf0(0x9d)+_0x2eecf0(0xc2):'')));let talking=body;console[_0x2eecf0(0xb2)](chalk[_0x2eecf0(0xd4)][_0x2eecf0(0xe8)](''+pushname)),console[_0x2eecf0(0xb2)](chalk[_0x2eecf0(0x104)][_0x2eecf0(0x103)](talking));m[_0x2eecf0(0xa0)]&&isCmd&&!m[_0x2eecf0(0xa1)]&&console[_0x2eecf0(0xb2)](colors[_0x2eecf0(0xdf)][_0x2eecf0(0x103)](_0x2eecf0(0xa9))+'\x20'+colors[_0x2eecf0(0x99)](time)+'\x20'+colors[_0x2eecf0(0xd4)][_0x2eecf0(0xe8)](command)+'\x20'+colors[_0x2eecf0(0xdf)](_0x2eecf0(0xba))+'\x20'+colors[_0x2eecf0(0xa8)](groupName));!m[_0x2eecf0(0xa0)]&&isCmd&&!m[_0x2eecf0(0xa1)]&&console[_0x2eecf0(0xb2)](colors[_0x2eecf0(0xdf)][_0x2eecf0(0x103)](_0x2eecf0(0xbe))+'\x20'+colors[_0x2eecf0(0x99)](time)+'\x20'+colors[_0x2eecf0(0xd4)][_0x2eecf0(0xe8)](command)+'\x20'+colors[_0x2eecf0(0xdf)](_0x2eecf0(0xba))+'\x20'+colors[_0x2eecf0(0xa8)](pushname));

} catch (err) {
console.log(color('ERROR', 'red'), err)
m.reply(`${err}`)
}}
