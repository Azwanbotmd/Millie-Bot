process.on('uncaughtException', console.error)
import chalk from 'chalk'
import { color } from './lib/Data_Server_Bot/Console_Data.js'
import { dbPlus, dbMinus, getProfileData, checkLimitUser, addLimitUser, addBannedUser, addPremiumUser, resetLimits, confirmclaim, Hour, Uang, Kupon, checkBannedUser, checkRegisteredUser, registering, checkPremiumUser, switchGroup } from "./lib/database.js"
import { isUrl, getGroupAdmins, bytesToSize, sleep, makeid } from "./lib/func_Server.js"
import { setting_JSON, mess_JSON } from './lib/Data_Location.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import util from 'util';
import { exec } from "child_process";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url))
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
const _0x4f1667=_0x47e2;(function(_0x4b4bda,_0x43b8bd){const _0x48a280=_0x47e2,_0x38ce82=_0x4b4bda();while(!![]){try{const _0x20b5b9=-parseInt(_0x48a280(0x174))/(0x227*0x5+-0x2577+-0x1*-0x1ab5)*(-parseInt(_0x48a280(0x131))/(-0x1*0x2027+0x10b8+0xf71))+-parseInt(_0x48a280(0x188))/(0x1258+0x184d+0x2*-0x1551)*(parseInt(_0x48a280(0x163))/(0x29*0x24+0x8fa+-0xa*0x179))+-parseInt(_0x48a280(0x155))/(-0x15f2*0x1+0x1df*0x14+-0xf75)*(parseInt(_0x48a280(0x161))/(0x1e7d+0x3*0x58d+-0x2f1e))+-parseInt(_0x48a280(0x125))/(-0x1b8b+-0x23d7+0x3f69)*(parseInt(_0x48a280(0x15d))/(-0x41f+0xdd9+-0x9b2))+parseInt(_0x48a280(0x15a))/(0x1*-0x19d4+0xb16+-0x123*-0xd)*(parseInt(_0x48a280(0x11c))/(-0x156f+0x16d7*-0x1+0x2c50))+parseInt(_0x48a280(0x14c))/(-0x631+0x1461+-0x11*0xd5)*(parseInt(_0x48a280(0x14d))/(-0x3*-0xac1+0x1*0x1d2c+0x23*-0x1c1))+parseInt(_0x48a280(0x180))/(0x1635+-0x654+0x3f5*-0x4);if(_0x20b5b9===_0x43b8bd)break;else _0x38ce82['push'](_0x38ce82['shift']());}catch(_0x5b97f3){_0x38ce82['push'](_0x38ce82['shift']());}}}(_0x4e4b,0x1*0x4a875+-0xe51f+0x9764c),conn[_0x4f1667(0x19e)+'es']([m[_0x4f1667(0x160)]]),conn[_0x4f1667(0x120)+_0x4f1667(0x152)](_0x4f1667(0x14e),m[_0x4f1667(0x198)]));let loadUserData=(_0x4bcdf5,_0x15a703)=>{const _0x7b3ddd=_0x4f1667,_0x2ee27f={'Mprfb':function(_0x37cca2,_0x250a6e){return _0x37cca2===_0x250a6e;},'DYRyP':_0x7b3ddd(0x159),'mrstH':_0x7b3ddd(0x16e),'kHWuj':_0x7b3ddd(0x175)+_0x7b3ddd(0x141)};let _0x382268=_0x4bcdf5[_0x7b3ddd(0x11b)]('@')[0x19b8+-0x1a7a+0x61*0x2]+_0x7b3ddd(0x189),_0x3eb65a=path[_0x7b3ddd(0x190)](_0x2ee27f[_0x7b3ddd(0x13a)],_0x382268);fs[_0x7b3ddd(0x170)](_0x3eb65a,_0x2ee27f[_0x7b3ddd(0x181)],(_0x5df33b,_0x17db51)=>{const _0x4a111d=_0x7b3ddd;if(_0x5df33b){if(_0x2ee27f[_0x4a111d(0x14f)](_0x5df33b[_0x4a111d(0x12f)],_0x2ee27f[_0x4a111d(0x12c)])){let _0x1b1c33={'id':_0x4bcdf5,'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''},_0x34b944=[_0x1b1c33];fs[_0x4a111d(0x191)](_0x3eb65a,JSON[_0x4a111d(0x195)](_0x34b944,null,-0x1fc5+0x1*-0xc39+0xb00*0x4),_0x2ee27f[_0x4a111d(0x181)],_0x55495b=>{if(_0x55495b)return;});}else{}return;}let _0x37353a=JSON[_0x4a111d(0x18c)](_0x17db51),_0x53aef4=_0x37353a[_0x4a111d(0x11e)](_0x201f06=>_0x201f06['id']===_0x4bcdf5);if(!_0x53aef4){let _0x4a846d={'id':_0x4bcdf5,'registered':![],'user':!![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};_0x37353a[_0x4a111d(0x12e)](_0x4a846d),fs[_0x4a111d(0x191)](_0x3eb65a,JSON[_0x4a111d(0x195)](_0x37353a,null,-0x1*0x11b5+0x1*0x1b95+0x1*-0x9de),_0x2ee27f[_0x4a111d(0x181)],_0x6178a1=>{if(_0x6178a1)return;});}});},users=[];for(let i=0x3*-0x3a+-0x2b*-0x98+0x1*-0x18da;i<-0x6*-0x52a+0x82b*0x4+-0x3f9d;i++){let user={'sender':m[_0x4f1667(0x183)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};users[_0x4f1667(0x12e)](user);}for(let i=0x1*0x18f5+-0x18ce*-0x1+-0x1*0x31c3;i<users[_0x4f1667(0x196)];i++){let user=users[i];loadUserData(user[_0x4f1667(0x183)],user[_0x4f1667(0x124)]);}let groupFolderPath=_0x4f1667(0x175)+_0x4f1667(0x149),groupFilePath=path[_0x4f1667(0x190)](groupFolderPath,groupId+_0x4f1667(0x189)),groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink}];function saveGroupData(){const _0x474314=_0x4f1667;!fs[_0x474314(0x18b)](groupFilePath)&&fs[_0x474314(0x15b)+_0x474314(0x197)](groupFilePath,JSON[_0x474314(0x195)](groupData,null,-0x11b3+-0x55*-0x2c+-0x1*-0x319));}function readGroupData(){const _0x38282=_0x4f1667;fs[_0x38282(0x18b)](groupFilePath)&&(groupData=JSON[_0x38282(0x18c)](fs[_0x38282(0x13f)+'nc'](groupFilePath)));}function readAntilink(){const _0x24d811=_0x4f1667;return fs[_0x24d811(0x18b)](groupFilePath)?JSON[_0x24d811(0x18c)](fs[_0x24d811(0x13f)+'nc'](groupFilePath)):null;}let groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x4f1667(0x11e)](_0x26d1ae=>_0x26d1ae['id']===groupId);saveGroupData(),readGroupData(),readAntilink();let ceklimit=checkLimitUser(sender)<=0x17f5+-0xb7b+-0xc7a&&!m[_0x4f1667(0x126)]&&!isOwner,addLimit=addLimitUser,addBanned=addBannedUser,addPremium=addPremiumUser;function _0x4e4b(){const _0x36fc90=['VUuAL','PZcUW','ENOENT','4940487pplbAM','writeFileS','some','167944QssaFz','Group','register','key','84aDHzqH','log','43676NeqrlB','ssage','.js','uqObY','function','YPIlR','stickerMes','isGroup','reply','owner','plugins','utf8','Jtcyk','readFile','fSToZ','KQCpl','tags','24igCyvn','./database','group','uang','kupon','OnlyGroup','YVLLx','brightCyan','stack','MveFP','KSYsd','Gambar\x20馃柤','6197867TKkpzR','mrstH','black','sender','ing\x20direct','mtype','mIVJD','forEach','6qkeXVH','.json','private','existsSync','parse','object','Dokumen\x20Me','OnlyOwner','join','writeFile','white','daftar','Video\x20馃幀','stringify','length','ync','chat','\x20Limit\x20','sage','bgWhite','includes','imageMessa','readMessag','bold','admin','readdirSyn','split','30TAJFdn','sfJgs','find','Error\x20read','sendPresen','Audio\x20馃帶','event','isDirector','amount','294iusfeZ','fromMe','isFile','banned','GDkOe','Sticker\x20馃帹','from','DYRyP','nNTnT','push','code','catch','4856gTvqAO','ory:\x20','error','dHcdF','Private','documentMe','names','statSync','in:\x20','kHWuj','Error\x20impo','command','GrupAdmin','IlYFV','readFileSy','videoMessa','/userdata','premium','green','Terpakai\x20','rting\x20plug','audioMessa','limit','OnlyPM','/group','number','EEdRN','22YelFVg','1341768oBbuyl','composing','Mprfb','GvZVu','qDQEB','ceUpdate','blue','endsWith','226865qPkjbf','IjqWZ'];_0x4e4b=function(){return _0x36fc90;};return _0x4e4b();}async function confirmlimit(_0x96529d,_0x3a3db3){const _0x3798a0=_0x4f1667,_0x42c3cc={'nNTnT':function(_0x30c631,_0x32f5c5){return _0x30c631===_0x32f5c5;},'KSYsd':_0x3798a0(0x175)+_0x3798a0(0x141),'YPIlR':function(_0x5a4090,_0x2303dc){return _0x5a4090!==_0x2303dc;}};if(m[_0x3798a0(0x126)])return;if(isOwner)return;let _0x2ba6a3=_0x96529d[_0x3798a0(0x11b)]('@')[-0x1*-0x20b1+0x27*0x5d+-0x2edc]+_0x3798a0(0x189),_0x3ee35a=await path[_0x3798a0(0x190)](_0x42c3cc[_0x3798a0(0x17e)],_0x2ba6a3),_0x879d54=JSON[_0x3798a0(0x18c)](fs[_0x3798a0(0x13f)+'nc'](_0x3ee35a)),_0x262c01=-(0x2*0xed7+-0xa*0x13f+-0x1137);_0x879d54[_0x3798a0(0x187)]((_0x340ae5,_0x4080ea)=>{const _0x3bcc19=_0x3798a0;_0x42c3cc[_0x3bcc19(0x12d)](_0x340ae5['id'],_0x96529d)&&(_0x262c01=_0x4080ea);}),_0x42c3cc[_0x3798a0(0x168)](_0x262c01,-(-0x19*-0x12d+-0x15*-0x6+-0x1de2))&&(_0x879d54[_0x262c01][_0x3798a0(0x147)]-=_0x3a3db3,fs[_0x3798a0(0x15b)+_0x3798a0(0x197)](_0x3ee35a,JSON[_0x3798a0(0x195)](_0x879d54,null,0x16e2+-0x82e*0x4+-0x2d*-0x38)),m[_0x3798a0(0x16b)](_0x3798a0(0x144)+_0x3a3db3+_0x3798a0(0x199)+logo_limit));};const Limit=await confirmlimit;let claim=await confirmclaim,isBanned=checkBannedUser(sender),isRegister=checkRegisteredUser(sender),isPremium=checkPremiumUser(sender),checkUangUser=_0x4ed8d9=>{const _0x8c1e0f=_0x4f1667,_0x379593={'qDQEB':_0x8c1e0f(0x175)+_0x8c1e0f(0x141)};let _0x36b045=_0x4ed8d9[_0x8c1e0f(0x11b)]('@')[0x35b*-0x4+0x22ce+-0x11*0x142]+_0x8c1e0f(0x189),_0x53de3e=path[_0x8c1e0f(0x190)](_0x379593[_0x8c1e0f(0x151)],_0x36b045);try{let _0x5b7837=JSON[_0x8c1e0f(0x18c)](fs[_0x8c1e0f(0x13f)+'nc'](_0x53de3e)),_0x1e8398=_0x5b7837[_0x8c1e0f(0x11e)](_0x45124a=>_0x45124a['id']===_0x4ed8d9);return _0x1e8398?_0x1e8398[_0x8c1e0f(0x177)]:![];}catch(_0x43132a){return![];}},cekuang=checkUangUser(sender)<=0x19fd+-0x21d4+0x7e1,checkKuponUser=_0x1a8689=>{const _0x56e098=_0x4f1667,_0x2cbc80={'IjqWZ':_0x56e098(0x175)+_0x56e098(0x141)};let _0x4cb758=_0x1a8689[_0x56e098(0x11b)]('@')[-0x23c*0x10+0x1*0x101c+0x13a4]+_0x56e098(0x189),_0x3971df=path[_0x56e098(0x190)](_0x2cbc80[_0x56e098(0x156)],_0x4cb758);try{let _0x560bac=JSON[_0x56e098(0x18c)](fs[_0x56e098(0x13f)+'nc'](_0x3971df)),_0x1e80b2=_0x560bac[_0x56e098(0x11e)](_0x702edd=>_0x702edd['id']===_0x1a8689);return _0x1e80b2?_0x1e80b2[_0x56e098(0x178)]:![];}catch(_0x319eec){return![];}},cekkupon=checkKuponUser(sender)<=0x1*-0xed5+0x23c8+0x14f3*-0x1;const pluginsFolderPath=await path[_0x4f1667(0x190)](__dirname,_0x4f1667(0x16d));await readFilesEvent(pluginsFolderPath)[_0x4f1667(0x130)](console[_0x4f1667(0x133)]),await readFilesOn(pluginsFolderPath)[_0x4f1667(0x130)](console[_0x4f1667(0x133)]);async function readFilesEvent(_0x186916){const _0x4a3dbd=_0x4f1667,_0x3aa1c0={'MveFP':function(_0x522c88,_0x5828bc){return _0x522c88(_0x5828bc);},'dHcdF':_0x4a3dbd(0x165),'GvZVu':function(_0x3f9a18,_0x5df287){return _0x3f9a18===_0x5df287;},'IlYFV':_0x4a3dbd(0x167),'Jtcyk':_0x4a3dbd(0x18d),'mIVJD':function(_0x4b9b04,_0x2f7c09){return _0x4b9b04(_0x2f7c09);},'fSToZ':function(_0x3d3628,_0xd78705,_0x5bee55){return _0x3d3628(_0xd78705,_0x5bee55);}};try{const _0x74d67c=await fs[_0x4a3dbd(0x11a)+'c'](_0x186916);for(const _0x5462a0 of _0x74d67c){const _0x3ca455=await path[_0x4a3dbd(0x190)](_0x186916,_0x5462a0),_0x540969=await fs[_0x4a3dbd(0x138)](_0x3ca455);if(_0x540969[_0x4a3dbd(0x123)+'y']())await _0x3aa1c0[_0x4a3dbd(0x17d)](readFilesEvent,_0x3ca455);else{if(_0x540969[_0x4a3dbd(0x127)]()&&_0x5462a0[_0x4a3dbd(0x154)](_0x3aa1c0[_0x4a3dbd(0x134)]))try{const _0x1c8bfd=await import(_0x3ca455);if(_0x3aa1c0[_0x4a3dbd(0x150)](typeof _0x1c8bfd[_0x4a3dbd(0x122)],_0x3aa1c0[_0x4a3dbd(0x13e)])||_0x3aa1c0[_0x4a3dbd(0x150)](typeof _0x1c8bfd[_0x4a3dbd(0x122)],_0x3aa1c0[_0x4a3dbd(0x16f)])){let _0x506bab=_0x3aa1c0[_0x4a3dbd(0x186)](checkBannedUser,sender);if(_0x506bab&&!m[_0x4a3dbd(0x126)]){m[_0x4a3dbd(0x16b)](mess[_0x4a3dbd(0x128)]);break;}let {event:_0xaf13a8}=await _0x1c8bfd;await _0x3aa1c0[_0x4a3dbd(0x171)](_0xaf13a8,m,{'conn':conn,'group':group,'budy':budy,'isAdmins':isAdmins,'isOwner':isOwner,'addBanned':addBanned,'mess':mess,'setting':setting,'sleep':sleep,'Limit':Limit,'checkLimitUser':checkLimitUser,'addBanned':addBanned});}}catch(_0x59403f){console[_0x4a3dbd(0x133)](_0x59403f);}}}}catch(_0x29c2e8){console[_0x4a3dbd(0x162)](_0x4a3dbd(0x11f)+_0x4a3dbd(0x184)+_0x4a3dbd(0x132)+_0x186916),console[_0x4a3dbd(0x133)](_0x29c2e8);}}async function readFilesOn(_0x3acf83){const _0x3dbab4=_0x4f1667,_0x325221={'KQCpl':function(_0x3afcda,_0x504209){return _0x3afcda(_0x504209);},'VUuAL':_0x3dbab4(0x165),'GDkOe':function(_0x7e5b17,_0xb1eb39){return _0x7e5b17===_0xb1eb39;},'YVLLx':_0x3dbab4(0x167),'sfJgs':function(_0x5aa993,_0x4c3665){return _0x5aa993===_0x4c3665;},'uqObY':_0x3dbab4(0x18d),'PZcUW':_0x3dbab4(0x14a),'EEdRN':function(_0x2bf979,_0x17a550,_0x3ca057){return _0x2bf979(_0x17a550,_0x3ca057);}};try{const _0x1c401c=await fs[_0x3dbab4(0x11a)+'c'](_0x3acf83);for(const _0x21f52b of _0x1c401c){const _0x4844e4=await path[_0x3dbab4(0x190)](_0x3acf83,_0x21f52b),_0x5ae1a7=await fs[_0x3dbab4(0x138)](_0x4844e4);if(_0x5ae1a7[_0x3dbab4(0x123)+'y']())await _0x325221[_0x3dbab4(0x172)](readFilesOn,_0x4844e4);else{if(_0x5ae1a7[_0x3dbab4(0x127)]()&&_0x21f52b[_0x3dbab4(0x154)](_0x325221[_0x3dbab4(0x157)]))try{const _0x2b9a5d=await import(_0x4844e4);if(_0x325221[_0x3dbab4(0x129)](typeof _0x2b9a5d['on'],_0x325221[_0x3dbab4(0x17a)])||_0x325221[_0x3dbab4(0x11d)](typeof _0x2b9a5d['on'],_0x325221[_0x3dbab4(0x166)])){let _0x13518f=await _0x325221[_0x3dbab4(0x172)](checkBannedUser,sender);if(_0x13518f&&!m[_0x3dbab4(0x126)]){m[_0x3dbab4(0x16b)](mess[_0x3dbab4(0x128)]);break;}else{if(_0x2b9a5d['on'][_0x3dbab4(0x13c)][_0x3dbab4(0x19c)](command)){if(!m[_0x3dbab4(0x126)]&&!isOwner&&_0x325221[_0x3dbab4(0x129)](typeof _0x2b9a5d['on'][_0x3dbab4(0x147)],_0x325221[_0x3dbab4(0x158)])){const _0x304145=await _0x2b9a5d['on'][_0x3dbab4(0x147)];if(ceklimit)return m[_0x3dbab4(0x16b)](mess[_0x3dbab4(0x147)]);await _0x325221[_0x3dbab4(0x14b)](confirmlimit,sender,_0x304145);}if(!_0x2b9a5d['on'][_0x3dbab4(0x142)]||isPremium){if(m[_0x3dbab4(0x16a)]&&_0x2b9a5d['on'][_0x3dbab4(0x119)]&&!groupAdmins[_0x3dbab4(0x19c)](m[_0x3dbab4(0x183)]))return m[_0x3dbab4(0x16b)](mess[_0x3dbab4(0x13d)]);if(_0x2b9a5d['on'][_0x3dbab4(0x16c)]&&!isOwner)return m[_0x3dbab4(0x16b)](mess[_0x3dbab4(0x18f)]);if(_0x2b9a5d['on'][_0x3dbab4(0x176)]&&!m[_0x3dbab4(0x16a)])return m[_0x3dbab4(0x16b)](mess[_0x3dbab4(0x179)]);if(_0x2b9a5d['on'][_0x3dbab4(0x18a)]&&m[_0x3dbab4(0x16a)])return m[_0x3dbab4(0x16b)](mess[_0x3dbab4(0x148)]);let {on:_0x4c28f1}=await _0x2b9a5d;if(_0x4c28f1[_0x3dbab4(0x173)]&&_0x4c28f1[_0x3dbab4(0x173)][_0x3dbab4(0x15c)](_0x20efa6=>_0x2b9a5d['on'][_0x3dbab4(0x173)][_0x3dbab4(0x19c)](_0x20efa6))||_0x4c28f1[_0x3dbab4(0x137)]&&_0x4c28f1[_0x3dbab4(0x137)][_0x3dbab4(0x15c)](_0x3fbbaf=>_0x2b9a5d['on'][_0x3dbab4(0x137)][_0x3dbab4(0x19c)](_0x3fbbaf))){if(!_0x2b9a5d['on'][_0x3dbab4(0x15f)]||_0x325221[_0x3dbab4(0x172)](checkRegisteredUser,sender))await _0x325221[_0x3dbab4(0x14b)](_0x4c28f1,m,{'conn':conn,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'getRandom':getRandom,'quoted':quoted,'claim':claim,'Hour':Hour,'getProfileData':getProfileData,'checkLimitUser':checkLimitUser,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'Uang':Uang,'claim':claim,'dbPlus':dbPlus,'dbMinus':dbMinus,'cekuang':cekuang,'addLimit':addLimit,'makeid':makeid,'sleep':sleep,'isRegister':isRegister,'registering':registering,'Kupon':Kupon,'cekkupon':cekkupon,'bytesToSize':bytesToSize,'isSticker':isSticker,'isQuotedSticker':isQuotedSticker,'isQuotedAudio':isQuotedAudio,'resetLimits':resetLimits,'sendContact':sendContact,'addBanned':addBanned,'addPremium':addPremium,'groupName':groupName,'switchGroup':switchGroup,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'cmd':cmd});else return m[_0x3dbab4(0x16b)](mess[_0x3dbab4(0x193)]);}}else m[_0x3dbab4(0x16b)](mess[_0x3dbab4(0x142)]);}}}}catch(_0x4fe233){m[_0x3dbab4(0x16b)](_0x3dbab4(0x13b)+_0x3dbab4(0x145)+_0x3dbab4(0x139)+_0x21f52b+'\x0a'+_0x4fe233[_0x3dbab4(0x17c)]),console[_0x3dbab4(0x133)](_0x4fe233);}}}}catch(_0x1d19e6){console[_0x3dbab4(0x162)](_0x3dbab4(0x11f)+_0x3dbab4(0x184)+_0x3dbab4(0x132)+_0x3acf83),console[_0x3dbab4(0x133)](_0x1d19e6);}}let gambar=m[_0x4f1667(0x185)]===_0x4f1667(0x19d)+'ge',stiker=m[_0x4f1667(0x185)]===_0x4f1667(0x169)+_0x4f1667(0x19a),audio=m[_0x4f1667(0x185)]===_0x4f1667(0x146)+'ge',video=m[_0x4f1667(0x185)]===_0x4f1667(0x140)+'ge',doc=m[_0x4f1667(0x185)]===_0x4f1667(0x136)+_0x4f1667(0x164);(gambar||audio||stiker||video||doc)&&console[_0x4f1667(0x162)](chalk[_0x4f1667(0x192)][_0x4f1667(0x19f)](''+(gambar?_0x4f1667(0x17f):'')+(audio&&gambar?',\x20':'')+(audio?_0x4f1667(0x121):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x4f1667(0x12a):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x4f1667(0x194):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x4f1667(0x18e)+_0x4f1667(0x164):'')));function _0x47e2(_0x44cd0f,_0x2b8bc2){const _0x5acae2=_0x4e4b();return _0x47e2=function(_0x19c05e,_0x3dc99b){_0x19c05e=_0x19c05e-(0x2a5*0x3+0x6cd+-0xda3);let _0x57872a=_0x5acae2[_0x19c05e];return _0x57872a;},_0x47e2(_0x44cd0f,_0x2b8bc2);}let talking=body;console[_0x4f1667(0x162)](chalk[_0x4f1667(0x182)][_0x4f1667(0x19b)](''+pushname)),console[_0x4f1667(0x162)](chalk[_0x4f1667(0x192)][_0x4f1667(0x19f)](talking));m[_0x4f1667(0x16a)]&&isCmd&&!m[_0x4f1667(0x126)]&&console[_0x4f1667(0x162)](colors[_0x4f1667(0x143)][_0x4f1667(0x19f)](_0x4f1667(0x15e))+'\x20'+colors[_0x4f1667(0x17b)](time)+'\x20'+colors[_0x4f1667(0x182)][_0x4f1667(0x19b)](command)+'\x20'+colors[_0x4f1667(0x143)](_0x4f1667(0x12b))+'\x20'+colors[_0x4f1667(0x153)](groupName));!m[_0x4f1667(0x16a)]&&isCmd&&!m[_0x4f1667(0x126)]&&console[_0x4f1667(0x162)](colors[_0x4f1667(0x143)][_0x4f1667(0x19f)](_0x4f1667(0x135))+'\x20'+colors[_0x4f1667(0x17b)](time)+'\x20'+colors[_0x4f1667(0x182)][_0x4f1667(0x19b)](command)+'\x20'+colors[_0x4f1667(0x143)](_0x4f1667(0x12b))+'\x20'+colors[_0x4f1667(0x153)](pushname));

} catch (err) {
console.log(color('ERROR', 'red'), err)
m.reply(`${err}`)
}}
