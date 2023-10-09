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
let prefa = ['','!','.','/']
var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
var budy = (typeof m.text == 'string' ? m.text : '')
var prefix = prefa ? /^[掳鈥⑾€梅脳露鈭喡Ｂ⑩偓楼庐鈩?+鉁揰=|~!?@#$%^&.漏^]/gi.test(body) ? body.match(/^[掳鈥⑾€梅脳露鈭喡Ｂ⑩偓楼庐鈩?+鉁揰=|~!?@#$%^&.漏^]/gi)[0] : "" : prefa ?? setting.prefix
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
let limit = 3
let uang = 500
let kupon = 3
let level = 1
let logo_limit = '🍌'

// ########################################## //
function _0x35a1(_0x120a71,_0x249914){const _0x339d14=_0x5f21();return _0x35a1=function(_0x2c9ddc,_0x8ab635){_0x2c9ddc=_0x2c9ddc-(0x1*-0x23+0x652+-0xd5*0x6);let _0x3745d9=_0x339d14[_0x2c9ddc];return _0x3745d9;},_0x35a1(_0x120a71,_0x249914);}function _0x5f21(){const _0x29b8d0=['(async\x20()\x20','string','8156TXExqc','format','1723870xrjRmv','3345408wozoBE','util','OnlyOwner','KHTmE','36tCJKfF','inspect','806848awKoUd','idak\x20Valid','reply','\x20})()','349ZPfYjB','Tdeti','=>\x20{\x20retur','rCYLt','slice','826840gsAkxz','Perintah\x20T','startsWith','1557576XpebkH','3jFmbFg','stringify','3014328IRdUKS'];_0x5f21=function(){return _0x29b8d0;};return _0x5f21();}const _0x48307d=_0x35a1;(function(_0x4561b3,_0x13fc8c){const _0x46fec3=_0x35a1,_0x3fcb55=_0x4561b3();while(!![]){try{const _0x28976f=-parseInt(_0x46fec3(0x132))/(0xaf6+0x1566+-0x205b)*(-parseInt(_0x46fec3(0x140))/(-0x1f74+-0x143b+0x33b1*0x1))+-parseInt(_0x46fec3(0x13b))/(-0x2241+0x14a8+-0x34*-0x43)*(-parseInt(_0x46fec3(0x13a))/(0xcba+-0xe8c+-0x1d6*-0x1))+-parseInt(_0x46fec3(0x137))/(0x111e+-0x8a*0x3f+-0x1*-0x10dd)+-parseInt(_0x46fec3(0x147))/(0x24f3*-0x1+-0xdad+0x6*0x871)*(parseInt(_0x46fec3(0x149))/(0x20d+-0x18*0xef+0x1462))+-parseInt(_0x46fec3(0x13d))/(0x47*0x53+-0x1*0x1b9b+0x49e)+parseInt(_0x46fec3(0x143))/(0x897+0x23d*0x9+-0x1f*0xed)+-parseInt(_0x46fec3(0x142))/(-0x52*-0x7+-0xe*-0xc7+0x43*-0x32);if(_0x28976f===_0x13fc8c)break;else _0x3fcb55['push'](_0x3fcb55['shift']());}catch(_0x3b92f4){_0x3fcb55['push'](_0x3fcb55['shift']());}}}(_0x5f21,0x1*-0xe57a3+-0xe6*0x8ff+0x1*0x224c93));try{if(budy[_0x48307d(0x139)]('=>')){if(!isOwner)return m[_0x48307d(0x14b)](mess[_0x48307d(0x145)]);function Return(_0xa9b112){const _0x540314=_0x48307d,_0x27f171={'rCYLt':function(_0x30ebf7,_0x11e5d3){return _0x30ebf7===_0x11e5d3;}};return sat=JSON[_0x540314(0x13c)](_0xa9b112,null,-0x2*0xf53+-0x12*0x14e+0x3f*0xdc),bang=util[_0x540314(0x141)](sat),_0x27f171[_0x540314(0x135)](sat,undefined)&&(bang=util[_0x540314(0x141)](_0xa9b112)),m[_0x540314(0x14b)](bang);}try{m[_0x48307d(0x14b)](util[_0x48307d(0x141)](await eval(_0x48307d(0x13e)+_0x48307d(0x134)+'n\x20'+budy[_0x48307d(0x136)](0x1c02+-0xcf1+-0xf0e)+_0x48307d(0x131))));}catch(_0x468b43){m[_0x48307d(0x14b)](String(_0x468b43));}}if(budy[_0x48307d(0x139)]('>')){if(!isOwner)return m[_0x48307d(0x14b)](mess[_0x48307d(0x145)]);try{let evaled=await eval(budy[_0x48307d(0x136)](0x67*0xd+-0x16*0x79+-0x1*-0x52d));if(typeof evaled!==_0x48307d(0x13f))evaled=require(_0x48307d(0x144))[_0x48307d(0x148)](evaled);m[_0x48307d(0x14b)](evaled);}catch(_0x2065b9){m[_0x48307d(0x14b)](String(_0x2065b9));}}if(budy[_0x48307d(0x139)]('$')){if(!isOwner)return m[_0x48307d(0x14b)](mess[_0x48307d(0x145)]);try{exec(budy[_0x48307d(0x136)](0x5*0x5b3+0x1*0x7e2+0x245f*-0x1),(_0x3dc245,_0x49c7da)=>{const _0x3488ad=_0x48307d,_0x123a9e={'Tdeti':function(_0x459b18,_0x22c707){return _0x459b18+_0x22c707;},'KHTmE':_0x3488ad(0x138)+_0x3488ad(0x14a)+'\x0a\x0a'};if(_0x3dc245)return m[_0x3488ad(0x14b)](_0x123a9e[_0x3488ad(0x133)](_0x123a9e[_0x3488ad(0x146)],JSON[_0x3488ad(0x13c)](_0x3dc245,null,-0x10e2+0x8f4+-0x1*-0x7f0)));if(_0x49c7da)return m[_0x3488ad(0x14b)](_0x49c7da);});}catch(_0x4d8457){m[_0x48307d(0x14b)](''+_0x4d8457);}}}catch(_0x3fb182){return m[_0x48307d(0x14b)](''+_0x3fb182);}
const _0x3fff86=_0x6e03;(function(_0x45dd47,_0x1c9d52){const _0x3eee28=_0x6e03,_0x4070dc=_0x45dd47();while(!![]){try{const _0x32b700=parseInt(_0x3eee28(0x162))/(0x5*-0x753+0x9d+0x2403)+-parseInt(_0x3eee28(0x13e))/(0x201b+0x180e*-0x1+-0x80b)+-parseInt(_0x3eee28(0x122))/(-0x6*-0x3b5+-0xa1+-0x159a)+-parseInt(_0x3eee28(0x144))/(0x2473+0x2*0xba+-0x25e3)*(parseInt(_0x3eee28(0x13f))/(-0x42d+-0x757+-0x1*-0xb89))+parseInt(_0x3eee28(0x185))/(-0x824*0x1+0x2*-0x7ba+0x179e)+parseInt(_0x3eee28(0x175))/(-0x655*0x3+0x1c4+0x1142)+-parseInt(_0x3eee28(0x120))/(-0x82f+-0xfe5+0x181c);if(_0x32b700===_0x1c9d52)break;else _0x4070dc['push'](_0x4070dc['shift']());}catch(_0x194172){_0x4070dc['push'](_0x4070dc['shift']());}}}(_0x37c0,0xac48b+0x2a1bc*0x5+0xf47a5*-0x1),conn[_0x3fff86(0x148)+'es']([m[_0x3fff86(0x17d)]]),conn[_0x3fff86(0x124)+_0x3fff86(0x165)](_0x3fff86(0x164),m[_0x3fff86(0x187)]));let loadUserData=(_0x1b8d42,_0x1a6b7a)=>{const _0x4b0444=_0x3fff86,_0x84f16c={'revHx':function(_0x2c438b,_0x374072){return _0x2c438b===_0x374072;},'gNiIs':_0x4b0444(0x188),'XsSIi':_0x4b0444(0x172),'DVzfB':_0x4b0444(0x12a)+_0x4b0444(0x127)};let _0x4ef35b=_0x1b8d42[_0x4b0444(0x15e)]('@')[-0x97*0x27+0x2*0x808+0x6f1]+_0x4b0444(0x163),_0x42e026=path[_0x4b0444(0x137)](_0x84f16c[_0x4b0444(0x181)],_0x4ef35b);fs[_0x4b0444(0x16e)](_0x42e026,_0x84f16c[_0x4b0444(0x14d)],(_0x1955e3,_0x5bb6a8)=>{const _0x810f8c=_0x4b0444;if(_0x1955e3){if(_0x84f16c[_0x810f8c(0x128)](_0x1955e3[_0x810f8c(0x158)],_0x84f16c[_0x810f8c(0x184)])){let _0x4c8c2e={'id':_0x1b8d42,'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''},_0x4ac184=[_0x4c8c2e];fs[_0x810f8c(0x123)](_0x42e026,JSON[_0x810f8c(0x186)](_0x4ac184,null,0x1*0x4d4+-0x4*0x3dd+0xaa2),_0x84f16c[_0x810f8c(0x14d)],_0x493699=>{if(_0x493699)return;});}else{}return;}let _0x357689=JSON[_0x810f8c(0x12d)](_0x5bb6a8),_0x342c81=_0x357689[_0x810f8c(0x136)](_0x59454c=>_0x59454c['id']===_0x1b8d42);if(!_0x342c81){let _0xabd000={'id':_0x1b8d42,'registered':![],'user':!![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};_0x357689[_0x810f8c(0x168)](_0xabd000),fs[_0x810f8c(0x123)](_0x42e026,JSON[_0x810f8c(0x186)](_0x357689,null,0x113b+-0x20b+-0xf2e),_0x84f16c[_0x810f8c(0x14d)],_0xe11ba3=>{if(_0xe11ba3)return;});}});},users=[];for(let i=-0x22d2*0x1+-0xe*-0x2ac+-0x296;i<0x7b4*-0x4+-0xb45+0x2*0x1510;i++){let user={'sender':m[_0x3fff86(0x151)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};users[_0x3fff86(0x168)](user);}for(let i=-0x9b8*0x3+0x20ad+-0x385;i<users[_0x3fff86(0x157)];i++){let user=users[i];loadUserData(user[_0x3fff86(0x151)],user[_0x3fff86(0x126)]);}function _0x6e03(_0x14d61e,_0x10f06d){const _0x49db17=_0x37c0();return _0x6e03=function(_0x3c191e,_0x4cfa84){_0x3c191e=_0x3c191e-(-0x1b37*0x1+0x1*0x2047+-0x3f0);let _0x6f2f2=_0x49db17[_0x3c191e];return _0x6f2f2;},_0x6e03(_0x14d61e,_0x10f06d);}let groupFolderPath=_0x3fff86(0x12a)+_0x3fff86(0x166),groupFilePath=path[_0x3fff86(0x137)](groupFolderPath,groupId+_0x3fff86(0x163)),groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink}];function saveGroupData(){const _0x52963e=_0x3fff86;!fs[_0x52963e(0x176)](groupFilePath)&&fs[_0x52963e(0x17f)+_0x52963e(0x13a)](groupFilePath,JSON[_0x52963e(0x186)](groupData,null,0x38f*-0x5+-0x2182+0x334f));}function readGroupData(){const _0x25d3a5=_0x3fff86;fs[_0x25d3a5(0x176)](groupFilePath)&&(groupData=JSON[_0x25d3a5(0x12d)](fs[_0x25d3a5(0x131)+'nc'](groupFilePath)));}function readAntilink(){const _0xc8bc22=_0x3fff86;return fs[_0xc8bc22(0x176)](groupFilePath)?JSON[_0xc8bc22(0x12d)](fs[_0xc8bc22(0x131)+'nc'](groupFilePath)):null;}let groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x3fff86(0x136)](_0x434a23=>_0x434a23['id']===groupId);saveGroupData(),readGroupData(),readAntilink();let ceklimit=checkLimitUser(sender)<=0x12*0xec+-0x6a4+0x7*-0x16c,addLimit=addLimitUser,addBanned=addBannedUser,addPremium=addPremiumUser,confirmlimit=(_0x95480,_0x342498)=>{const _0x26841f=_0x3fff86,_0x1dfd86={'qazJI':function(_0x1022fa,_0x3f95e5){return _0x1022fa===_0x3f95e5;},'WMnWc':_0x26841f(0x12a)+_0x26841f(0x127),'nOgOS':function(_0x373ab8,_0x939ba){return _0x373ab8!==_0x939ba;}};let _0x144d39=_0x95480[_0x26841f(0x15e)]('@')[-0x1009+0xda2+0x267]+_0x26841f(0x163),_0x15f060=path[_0x26841f(0x137)](_0x1dfd86[_0x26841f(0x16f)],_0x144d39),_0x3b445e=JSON[_0x26841f(0x12d)](fs[_0x26841f(0x131)+'nc'](_0x15f060)),_0x37f821=-(-0x2029+-0xa85+0x2aaf);_0x3b445e[_0x26841f(0x150)]((_0x104acc,_0x3a05bc)=>{const _0x1e9b78=_0x26841f;_0x1dfd86[_0x1e9b78(0x13d)](_0x104acc['id'],_0x95480)&&(_0x37f821=_0x3a05bc);}),_0x1dfd86[_0x26841f(0x173)](_0x37f821,-(-0x22ae+0x116*-0x12+0x363b))&&(_0x3b445e[_0x37f821][_0x26841f(0x167)]-=_0x342498,fs[_0x26841f(0x17f)+_0x26841f(0x13a)](_0x15f060,JSON[_0x26841f(0x186)](_0x3b445e,null,-0x20a5+0xcc4+0x13e3)),m[_0x26841f(0x12c)](_0x342498+(_0x26841f(0x125)+_0x26841f(0x177))+logo_limit));},limitnya=await confirmlimit,claim=await confirmclaim,isBanned=checkBannedUser(sender),isRegister=checkRegisteredUser(sender),isPremium=checkPremiumUser(sender),checkUangUser=_0x3d9c91=>{const _0x372fcf=_0x3fff86,_0x29836d={'sCTNh':_0x372fcf(0x12a)+_0x372fcf(0x127)};let _0x3abb32=_0x3d9c91[_0x372fcf(0x15e)]('@')[-0x1d*-0xf5+-0x1460*-0x1+-0x3021]+_0x372fcf(0x163),_0x5ce4ad=path[_0x372fcf(0x137)](_0x29836d[_0x372fcf(0x135)],_0x3abb32);try{let _0x2db056=JSON[_0x372fcf(0x12d)](fs[_0x372fcf(0x131)+'nc'](_0x5ce4ad)),_0x528eb1=_0x2db056[_0x372fcf(0x136)](_0x55b98b=>_0x55b98b['id']===_0x3d9c91);return _0x528eb1?_0x528eb1[_0x372fcf(0x147)]:![];}catch(_0x376c7b){return![];}},cekuang=checkUangUser(sender)<=0x9*0x325+-0x60+0x3b*-0x79,checkKuponUser=_0x30abc5=>{const _0x40cd18=_0x3fff86,_0x4f9e41={'lFFvk':_0x40cd18(0x12a)+_0x40cd18(0x127)};let _0x3842d7=_0x30abc5[_0x40cd18(0x15e)]('@')[-0x20cf+-0x11ef+-0x1e*-0x1b1]+_0x40cd18(0x163),_0x235d5c=path[_0x40cd18(0x137)](_0x4f9e41[_0x40cd18(0x14f)],_0x3842d7);try{let _0x11dc24=JSON[_0x40cd18(0x12d)](fs[_0x40cd18(0x131)+'nc'](_0x235d5c)),_0x1beb06=_0x11dc24[_0x40cd18(0x136)](_0x1c4531=>_0x1c4531['id']===_0x30abc5);return _0x1beb06?_0x1beb06[_0x40cd18(0x13b)]:![];}catch(_0x12972e){return![];}},cekkupon=checkKuponUser(sender)<=0x13bf+-0x11*0x1af+-0x10*-0x8e,pluginsFolderPath=await path[_0x3fff86(0x137)](__dirname,_0x3fff86(0x159)),pluginFiles=await fs[_0x3fff86(0x145)+'c'](pluginsFolderPath);try{for(let file of pluginFiles){if(file[_0x3fff86(0x154)](_0x3fff86(0x13c))){let pluginFilePath=await path[_0x3fff86(0x137)](pluginsFolderPath,file),pluginModule=await import(pluginFilePath);if(!m[_0x3fff86(0x132)]&&typeof pluginModule[_0x3fff86(0x12b)]===_0x3fff86(0x14b)||typeof pluginModule[_0x3fff86(0x12b)]===_0x3fff86(0x14e)){let isBanned=checkBannedUser(sender);if(isBanned){m[_0x3fff86(0x12c)](mess[_0x3fff86(0x12f)]);break;}await pluginModule[_0x3fff86(0x12b)](m,{'conn':conn,'group':group,'budy':budy,'isAdmins':isAdmins,'isOwner':isOwner,'addBanned':addBanned,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'getRandom':getRandom,'quoted':quoted,'claim':claim,'Hour':Hour,'getProfileData':getProfileData,'checkLimitUser':checkLimitUser,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'Uang':Uang,'dbPlus':dbPlus,'dbMinus':dbMinus,'cekuang':cekuang,'addLimit':addLimit,'makeid':makeid,'sleep':sleep,'isRegister':isRegister,'registering':registering,'Kupon':Kupon,'cekkupon':cekkupon,'bytesToSize':bytesToSize,'isSticker':isSticker,'isQuotedSticker':isQuotedSticker,'isQuotedAudio':isQuotedAudio,'resetLimits':resetLimits,'sendContact':sendContact,'addBanned':addBanned,'addPremium':addPremium,'groupName':groupName,'switchGroup':switchGroup,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'cmd':cmd});}}}}catch(_0x4eeae5){console[_0x3fff86(0x143)](_0x4eeae5),m[_0x3fff86(0x12c)](''+_0x4eeae5[_0x3fff86(0x155)]);}try{for(let file of pluginFiles){if(file[_0x3fff86(0x154)](_0x3fff86(0x13c))){let pluginFilePath=await path[_0x3fff86(0x137)](pluginsFolderPath,file),pluginModule=await import(pluginFilePath);if(!m[_0x3fff86(0x132)]&&typeof pluginModule['on']===_0x3fff86(0x14b)||typeof pluginModule['on']===_0x3fff86(0x14e)){let isBanned=checkBannedUser(sender);if(isBanned){m[_0x3fff86(0x12c)](mess[_0x3fff86(0x12f)]);break;}else{if(pluginModule['on'][_0x3fff86(0x130)][_0x3fff86(0x15c)](command)){if(typeof pluginModule['on'][_0x3fff86(0x167)]===_0x3fff86(0x180)){let limitAmount=pluginModule['on'][_0x3fff86(0x167)];if(ceklimit)return m[_0x3fff86(0x12c)](mess[_0x3fff86(0x167)]);limitnya(m[_0x3fff86(0x151)],limitAmount);}if(!pluginModule['on'][_0x3fff86(0x142)]||isPremium){if(m[_0x3fff86(0x14a)]&&pluginModule['on'][_0x3fff86(0x146)]&&!groupAdmins[_0x3fff86(0x15c)](m[_0x3fff86(0x151)]))return m[_0x3fff86(0x12c)](mess[_0x3fff86(0x153)]);if(pluginModule['on'][_0x3fff86(0x15d)]&&!isOwner)return m[_0x3fff86(0x12c)](mess[_0x3fff86(0x129)]);if(pluginModule['on'][_0x3fff86(0x174)]&&!m[_0x3fff86(0x14a)])return m[_0x3fff86(0x12c)](mess[_0x3fff86(0x183)]);if(pluginModule['on'][_0x3fff86(0x169)]&&m[_0x3fff86(0x14a)])return m[_0x3fff86(0x12c)](mess[_0x3fff86(0x16a)]);let {on}=await pluginModule;if(on[_0x3fff86(0x16c)]&&on[_0x3fff86(0x16c)][_0x3fff86(0x17c)](_0xb5075b=>pluginModule['on'][_0x3fff86(0x16c)][_0x3fff86(0x15c)](_0xb5075b))||on[_0x3fff86(0x152)]&&on[_0x3fff86(0x152)][_0x3fff86(0x17c)](_0x45d128=>pluginModule['on'][_0x3fff86(0x152)][_0x3fff86(0x15c)](_0x45d128))){if(!pluginModule['on'][_0x3fff86(0x121)]||checkRegisteredUser(sender))await on(m,{'conn':conn,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'getRandom':getRandom,'quoted':quoted,'claim':claim,'Hour':Hour,'getProfileData':getProfileData,'checkLimitUser':checkLimitUser,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'Uang':Uang,'claim':claim,'dbPlus':dbPlus,'dbMinus':dbMinus,'cekuang':cekuang,'addLimit':addLimit,'makeid':makeid,'sleep':sleep,'isRegister':isRegister,'registering':registering,'Kupon':Kupon,'cekkupon':cekkupon,'bytesToSize':bytesToSize,'isSticker':isSticker,'isQuotedSticker':isQuotedSticker,'isQuotedAudio':isQuotedAudio,'resetLimits':resetLimits,'sendContact':sendContact,'addBanned':addBanned,'addPremium':addPremium,'groupName':groupName,'switchGroup':switchGroup,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'cmd':cmd});else return m[_0x3fff86(0x12c)](mess[_0x3fff86(0x17a)]);}}else m[_0x3fff86(0x12c)](mess[_0x3fff86(0x142)]);}}}}}}catch(_0x28d79d){console[_0x3fff86(0x143)](_0x28d79d),m[_0x3fff86(0x12c)](''+_0x28d79d[_0x3fff86(0x155)]);}let gambar=m[_0x3fff86(0x133)]===_0x3fff86(0x141)+'ge',stiker=m[_0x3fff86(0x133)]===_0x3fff86(0x16d)+_0x3fff86(0x139),audio=m[_0x3fff86(0x133)]===_0x3fff86(0x15f)+'ge',video=m[_0x3fff86(0x133)]===_0x3fff86(0x170)+'ge',doc=m[_0x3fff86(0x133)]===_0x3fff86(0x140)+_0x3fff86(0x15a);(gambar||audio||stiker||video||doc)&&console[_0x3fff86(0x138)](chalk[_0x3fff86(0x17e)][_0x3fff86(0x182)](''+(gambar?_0x3fff86(0x12e):'')+(audio&&gambar?',\x20':'')+(audio?_0x3fff86(0x178):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x3fff86(0x171):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x3fff86(0x17b):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x3fff86(0x161)+_0x3fff86(0x15a):'')));let talking=body;console[_0x3fff86(0x138)](chalk[_0x3fff86(0x156)][_0x3fff86(0x134)](''+pushname)),console[_0x3fff86(0x138)](chalk[_0x3fff86(0x17e)][_0x3fff86(0x182)](talking));m[_0x3fff86(0x14a)]&&isCmd&&!m[_0x3fff86(0x132)]&&console[_0x3fff86(0x138)](colors[_0x3fff86(0x179)][_0x3fff86(0x182)](_0x3fff86(0x149))+'\x20'+colors[_0x3fff86(0x160)](time)+'\x20'+colors[_0x3fff86(0x156)][_0x3fff86(0x134)](command)+'\x20'+colors[_0x3fff86(0x179)](_0x3fff86(0x16b))+'\x20'+colors[_0x3fff86(0x14c)](groupName));!m[_0x3fff86(0x14a)]&&isCmd&&!m[_0x3fff86(0x132)]&&console[_0x3fff86(0x138)](colors[_0x3fff86(0x179)][_0x3fff86(0x182)](_0x3fff86(0x15b))+'\x20'+colors[_0x3fff86(0x160)](time)+'\x20'+colors[_0x3fff86(0x156)][_0x3fff86(0x134)](command)+'\x20'+colors[_0x3fff86(0x179)](_0x3fff86(0x16b))+'\x20'+colors[_0x3fff86(0x14c)](pushname));function _0x37c0(){const _0x39d61e=['Private','includes','owner','split','audioMessa','brightCyan','Dokumen\x20Me','300316YMtqiY','.json','recording','ceUpdate','/group','limit','push','private','OnlyPM','from','tags','stickerMes','readFile','WMnWc','videoMessa','Sticker\x20馃帹','utf8','nOgOS','group','5792241XfpfGB','existsSync','pakai\x20','Audio\x20馃帶','green','daftar','Video\x20馃幀','some','key','white','writeFileS','number','DVzfB','bold','OnlyGroup','gNiIs','5093592KBxffF','stringify','chat','ENOENT','5888912EaGKCL','register','464673dBxviX','writeFile','sendPresen','\x20Limit\x20Ter','amount','/userdata','revHx','OnlyOwner','./database','event','reply','parse','Gambar\x20馃柤','banned','command','readFileSy','fromMe','mtype','bgWhite','sCTNh','find','join','log','sage','ync','kupon','.js','qazJI','421918nIgVqw','515hdgHaN','documentMe','imageMessa','premium','error','11964QYkibG','readdirSyn','admin','uang','readMessag','Group','isGroup','function','blue','XsSIi','object','lFFvk','forEach','sender','names','GrupAdmin','endsWith','stack','black','length','code','plugins','ssage'];_0x37c0=function(){return _0x39d61e;};return _0x37c0();}

} catch (err) {
console.log(color('ERROR', 'red'), err)
m.reply(`${err}`)
}}
