process.on('uncaughtException', console.error)
import chalk from 'chalk'
import { color } from './lib/Data_Server_Bot/Console_Data.js'
import { dbPlus, dbMinus, getProfileData, addLimitUser, addBannedUser, addPremiumUser, resetLimits, confirmclaim, Hour, Uang, Kupon, checkBannedUser, checkRegisteredUser, registering, checkPremiumUser, switchGroup } from "./lib/database.js"
import { isUrl, getGroupAdmins, bytesToSize, sleep, makeid } from "./lib/func_Server.js"
import { setting_JSON, mess_JSON } from './lib/Data_Location.js'
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
export async function handler(conn, m, chatUpdate) {
    try {
        // Data Awal 
        let welcome = true // false untuk tidak aktif, true untuk aktif welcome nya dan untuk on offinya di plugin enable welcome, antilink nyusul , kalo kamu bisa buat ajh sndri pluginya pake regex kalo ya kalo bisa klo engga ya nunggu aku hehe
        let antilink = true
        let limit = 100
        let uang = 500
        let kupon = 3
        let level = 1
        let logo_limit = '🍌'

        let setting = setting_JSON
        let mess = mess_JSON
        let {
            owner,
            ownerNumber,
            botName,
            contact,
            ownerName,
            footer
        } = setting
        let jam = moment.tz('asia/jakarta').format('HH:mm:ss')
        let tanggal = moment().tz("Asia/Jakarta").format("ll")
        let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        let time = moment(new Date()).format("HH:mm");
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var type = Object.keys(m.message)[0]
        //var prefix = prefa ? /^[掳鈥⑾€梅脳露鈭喡Ｂ⑩偓楼庐鈩?+鉁揰=|~!?@#$%^&.漏^]/gi.test(body) ? body.match(/^[掳鈥⑾€梅脳露鈭喡Ｂ⑩偓楼庐鈩?+鉁揰=|~!?@#$%^&.漏^]/gi)[0] : "" : prefa ?? setting.prefix
        let prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
        let isCmd = body.startsWith(prefix)
        let command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        let cmd = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        let args = body.trim().split(/ +/).slice(1)
        let pushname = m.pushName || setting.botName
        let botNumber = await conn.decodeJid(conn.user.id)
        let isOwner = setting.ownerNumber.includes(m.sender) // || m.sender == setting.owner;
        let itsMe = m.sender == botNumber ? true : false
        let text = args.join(' ')
        let from = m.chat
        let quoted = m.quoted ? m.quoted : m
        let mime = (quoted.m || quoted).mimetype || ''
        let isMedia = /image|video|sticker|audio/.test(mime)
        let sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
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
        const _0x507398=_0x2657;(function(_0x335714,_0x1efe9c){const _0x40d738=_0x2657,_0x3ad275=_0x335714();while(!![]){try{const _0x16eef1=-parseInt(_0x40d738(0x20b))/(0xbbd+-0x27b*-0x2+-0x10b2)*(parseInt(_0x40d738(0x214))/(-0x14a6*-0x1+0x430+0xe3*-0x1c))+parseInt(_0x40d738(0x1ef))/(-0x2*0xda3+-0x1d51+-0x2*-0x1c4d)+-parseInt(_0x40d738(0x1fe))/(0x1dc*-0xe+-0xb0e*0x1+0x62f*0x6)*(-parseInt(_0x40d738(0x218))/(-0x21f7+0x3e9+0x1e13))+parseInt(_0x40d738(0x1f0))/(-0xa7*-0x2b+-0x2195+0x58e)+parseInt(_0x40d738(0x243))/(0x14f9+0x3c*0x47+-0x1*0x2596)+parseInt(_0x40d738(0x208))/(0x21f5*0x1+-0x2*-0xc87+-0x3afb)+-parseInt(_0x40d738(0x220))/(0x1bd1+0x13a6+-0x2f6e);if(_0x16eef1===_0x1efe9c)break;else _0x3ad275['push'](_0x3ad275['shift']());}catch(_0x4f04be){_0x3ad275['push'](_0x3ad275['shift']());}}}(_0x32d8,0x2*-0x36f4d+0x6c90f+0x76509),conn[_0x507398(0x22b)+'es']([m[_0x507398(0x1ee)]]),conn[_0x507398(0x215)+_0x507398(0x226)](_0x507398(0x1eb),m[_0x507398(0x234)]));let loadUserData=(_0x52a5e1,_0x361638)=>{const _0x4a53c8=_0x507398,_0x511148={'dciWa':function(_0x134a4b,_0x1fb9c8){return _0x134a4b===_0x1fb9c8;},'kgbvx':_0x4a53c8(0x227),'SZqYc':_0x4a53c8(0x25d),'PqbWA':_0x4a53c8(0x1f8)+_0x4a53c8(0x20f)};let _0x1d829d=_0x52a5e1[_0x4a53c8(0x1ea)]('@')[0x19*-0x127+-0x2*0xeb1+-0x1*-0x3a31]+_0x4a53c8(0x20c),_0x1e3bae=path[_0x4a53c8(0x20e)](_0x511148[_0x4a53c8(0x21a)],_0x1d829d);fs[_0x4a53c8(0x24d)](_0x1e3bae,_0x511148[_0x4a53c8(0x262)],(_0x5daa92,_0xfd822f)=>{const _0x5d5105=_0x4a53c8;if(_0x5daa92){if(_0x511148[_0x5d5105(0x21d)](_0x5daa92[_0x5d5105(0x21b)],_0x511148[_0x5d5105(0x261)])){let _0x22b5c9={'id':_0x52a5e1,'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''},_0x27b862=[_0x22b5c9];fs[_0x5d5105(0x206)](_0x1e3bae,JSON[_0x5d5105(0x22f)](_0x27b862,null,0x47*-0x3d+-0x1*-0x73+0x107a),_0x511148[_0x5d5105(0x262)],_0x10f326=>{if(_0x10f326)return;});}else{}return;}let _0x137cab=JSON[_0x5d5105(0x229)](_0xfd822f),_0x3ee048=_0x137cab[_0x5d5105(0x228)](_0x9d51b8=>_0x9d51b8['id']===_0x52a5e1);if(!_0x3ee048){let _0x1dd052={'id':_0x52a5e1,'registered':![],'user':!![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};_0x137cab[_0x5d5105(0x26e)](_0x1dd052),fs[_0x5d5105(0x206)](_0x1e3bae,JSON[_0x5d5105(0x22f)](_0x137cab,null,0x223*-0xb+-0x16ee+-0x1*-0x2e71),_0x511148[_0x5d5105(0x262)],_0x3d07dc=>{if(_0x3d07dc)return;});}});},users=[];for(let i=0x50c+-0x15f1+0x10e5;i<0xfb1+-0x22f1+0x134b;i++){let user={'sender':m[_0x507398(0x1f5)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};users[_0x507398(0x26e)](user);}for(let i=-0x112*-0x13+-0x422*-0x2+-0x1c9a;i<users[_0x507398(0x255)];i++){let user=users[i];loadUserData(user[_0x507398(0x1f5)],user[_0x507398(0x1fa)]);}let groupFolderPath=_0x507398(0x1f8)+_0x507398(0x244),groupFilePath=path[_0x507398(0x20e)](groupFolderPath,groupId+_0x507398(0x20c)),groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink}];function saveGroupData(){const _0x2f0064=_0x507398;!fs[_0x2f0064(0x257)](groupFilePath)&&fs[_0x2f0064(0x254)+_0x2f0064(0x221)](groupFilePath,JSON[_0x2f0064(0x22f)](groupData,null,0x1d*-0xea+-0x1*0x1de7+-0x457*-0xd));}function readGroupData(){const _0x18aa6a=_0x507398;fs[_0x18aa6a(0x257)](groupFilePath)&&(groupData=JSON[_0x18aa6a(0x229)](fs[_0x18aa6a(0x211)+'nc'](groupFilePath)));}function _0x2657(_0x269f3c,_0x1efcb3){const _0x32a0f5=_0x32d8();return _0x2657=function(_0x558218,_0x6ada91){_0x558218=_0x558218-(-0x6*0x1d0+0x18f3+-0x1*0xc29);let _0x54ab93=_0x32a0f5[_0x558218];return _0x54ab93;},_0x2657(_0x269f3c,_0x1efcb3);}function readAntilink(){const _0x5bd2fb=_0x507398;return fs[_0x5bd2fb(0x257)](groupFilePath)?JSON[_0x5bd2fb(0x229)](fs[_0x5bd2fb(0x211)+'nc'](groupFilePath)):null;}let groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x507398(0x228)](_0x5de832=>_0x5de832['id']===groupId);saveGroupData(),readGroupData(),readAntilink();let checkLimitUser=_0x1a7576=>{const _0x2a384d=_0x507398,_0x4886ce={'jUtKI':_0x2a384d(0x1f8)+_0x2a384d(0x20f)};if(m[_0x2a384d(0x1fd)])return;if(isOwner)return;let _0x4cff9e=_0x1a7576[_0x2a384d(0x1ea)]('@')[-0x186b+-0x1582+0x2ded]+_0x2a384d(0x20c),_0x3af391=path[_0x2a384d(0x20e)](_0x4886ce[_0x2a384d(0x239)],_0x4cff9e);try{let _0x159ed1=JSON[_0x2a384d(0x229)](fs[_0x2a384d(0x211)+'nc'](_0x3af391)),_0x5582ab=_0x159ed1[_0x2a384d(0x228)](_0x5011c5=>_0x5011c5['id']===_0x1a7576);return _0x5582ab?_0x5582ab[_0x2a384d(0x21e)]:![];}catch(_0x1afffd){return![];}},ceklimit=checkLimitUser(sender)<=-0x1d1*0xd+-0x13a2+0x2b3f,addLimit=addLimitUser,addBanned=addBannedUser,addPremium=addPremiumUser;async function confirmlimit(_0x15c1ec,_0x534340){const _0x5b44a6=_0x507398,_0x5a5948={'VvQAQ':function(_0x2957b5,_0x312019){return _0x2957b5===_0x312019;},'FvtSF':_0x5b44a6(0x1f8)+_0x5b44a6(0x20f),'mfpyH':function(_0x4d6c11,_0x7edc55){return _0x4d6c11!==_0x7edc55;}};if(m[_0x5b44a6(0x1fd)])return;if(isOwner)return;let _0x3e57f2=_0x15c1ec[_0x5b44a6(0x1ea)]('@')[-0x5*0x15f+0x2509+0x2*-0xf17]+_0x5b44a6(0x20c),_0x4c03a8=await path[_0x5b44a6(0x20e)](_0x5a5948[_0x5b44a6(0x225)],_0x3e57f2),_0xa81780=JSON[_0x5b44a6(0x229)](fs[_0x5b44a6(0x211)+'nc'](_0x4c03a8)),_0x4dce29=-(0x1*-0x541+-0x2024+0x2566);_0xa81780[_0x5b44a6(0x252)]((_0x11367d,_0x3305e8)=>{const _0x42845f=_0x5b44a6;_0x5a5948[_0x42845f(0x21c)](_0x11367d['id'],_0x15c1ec)&&(_0x4dce29=_0x3305e8);}),_0x5a5948[_0x5b44a6(0x21f)](_0x4dce29,-(0x1*-0x119b+0x2*-0x230+0x1c*0xc9))&&(_0xa81780[_0x4dce29][_0x5b44a6(0x21e)]-=_0x534340,fs[_0x5b44a6(0x254)+_0x5b44a6(0x221)](_0x4c03a8,JSON[_0x5b44a6(0x22f)](_0xa81780,null,0x2*-0xd73+0x1586+0x562)),m[_0x5b44a6(0x20a)](_0x5b44a6(0x22a)+_0x534340+_0x5b44a6(0x201)+logo_limit));};function _0x32d8(){const _0x5ebbc7=['videoMessa','5TopDeq','group','PqbWA','code','VvQAQ','dciWa','limit','mfpyH','22356477Dytlgy','ync','NivbQ','aNTtl','error','FvtSF','ceUpdate','ENOENT','find','parse','Terpakai\x20','readMessag','WjZCK','brightCyan','from','stringify','Terjadi\x20Ke','stickerMes','bgWhite','green','chat','BYMqv','Dokumen\x20Me','event','some','jUtKI','premium','JZvqr','GrupAdmin','log','isDirector','private','mtype','names','endsWith','6492794igvDld','/group','banned','daftar','owner','OnlyPM','OnlyGroup','Group','pwXnw','isFile','readFile','JBhjJ','ozWxi','tags','YRPox','forEach','catch','writeFileS','length','Gambar\x20馃柤','existsSync','command','readdirSyn','uang','esYyC','Error\x20read','utf8','documentMe','OnlyOwner','ory:\x20','kgbvx','SZqYc','includes','Audio\x20馃帶','audioMessa','poEEV','Video\x20馃幀','KnNQx','salahan\x20','imageMessa','vRZpj','blue','flQNC','push','split','composing','isGroup','black','key','1011315iqSIwW','5345976ibuxve','number','admin','.js','stack','sender','bold','VOKFx','./database','ssage','amount','white','Private','fromMe','1431272VJMvZs','sage','MuxQa','\x20Limit\x20','xctBv','xntkP','redFA','ing\x20direct','writeFile','function','7313168JZtPpZ','Sticker\x20馃帹','reply','1MwhlUA','.json','object','join','/userdata','kupon','readFileSy','plugins','statSync','928904lYFTDl','sendPresen','register'];_0x32d8=function(){return _0x5ebbc7;};return _0x32d8();}let Limit=await confirmlimit,claim=await confirmclaim,isBanned=checkBannedUser(sender),isRegister=checkRegisteredUser(sender),isPremium=checkPremiumUser(sender),checkUangUser=_0xce9c5d=>{const _0x70e371=_0x507398,_0xb40e7={'WjZCK':_0x70e371(0x1f8)+_0x70e371(0x20f)};let _0x1a5c0a=_0xce9c5d[_0x70e371(0x1ea)]('@')[0x71a*-0x4+0x277+0xe5*0x1d]+_0x70e371(0x20c),_0x5f0ddc=path[_0x70e371(0x20e)](_0xb40e7[_0x70e371(0x22c)],_0x1a5c0a);try{let _0x30a46a=JSON[_0x70e371(0x229)](fs[_0x70e371(0x211)+'nc'](_0x5f0ddc)),_0x40ff7e=_0x30a46a[_0x70e371(0x228)](_0x5dc6b5=>_0x5dc6b5['id']===_0xce9c5d);return _0x40ff7e?_0x40ff7e[_0x70e371(0x25a)]:![];}catch(_0x128df4){return![];}},cekuang=checkUangUser(sender)<=0xb2b+-0x1ce0+-0x4d*-0x3b,checkKuponUser=_0x552ccc=>{const _0xcf3925=_0x507398,_0x183422={'KnNQx':_0xcf3925(0x1f8)+_0xcf3925(0x20f)};let _0x1c7887=_0x552ccc[_0xcf3925(0x1ea)]('@')[0x1dfb+0x1d*0x8b+-0x2dba]+_0xcf3925(0x20c),_0x28d04e=path[_0xcf3925(0x20e)](_0x183422[_0xcf3925(0x268)],_0x1c7887);try{let _0x89d6a=JSON[_0xcf3925(0x229)](fs[_0xcf3925(0x211)+'nc'](_0x28d04e)),_0x4d9b23=_0x89d6a[_0xcf3925(0x228)](_0x2ab878=>_0x2ab878['id']===_0x552ccc);return _0x4d9b23?_0x4d9b23[_0xcf3925(0x210)]:![];}catch(_0x4fc514){return![];}},cekkupon=checkKuponUser(sender)<=0xf17+0x4c*0x3b+0x1*-0x209b,pluginsFolderPath=await path[_0x507398(0x20e)](__dirname,_0x507398(0x212));await readFilesEvent(pluginsFolderPath)[_0x507398(0x253)](console[_0x507398(0x224)]),await readFilesOn(pluginsFolderPath)[_0x507398(0x253)](console[_0x507398(0x224)]);async function readFilesEvent(_0x4e60f6){const _0x3d75e2=_0x507398,_0x2e5b6e={'xctBv':function(_0x4da1ed,_0x40060c){return _0x4da1ed(_0x40060c);},'JZvqr':_0x3d75e2(0x1f3),'pwXnw':function(_0x26af8a,_0x13a107){return _0x26af8a===_0x13a107;},'NivbQ':_0x3d75e2(0x207),'esYyC':function(_0x2dba52,_0x484976){return _0x2dba52===_0x484976;},'poEEV':_0x3d75e2(0x20d),'VOKFx':function(_0x2f0fc1,_0x98ac8a){return _0x2f0fc1(_0x98ac8a);},'flQNC':function(_0x23a1aa,_0xb4dd85,_0xd0ef97){return _0x23a1aa(_0xb4dd85,_0xd0ef97);}};try{let _0x196dba=await fs[_0x3d75e2(0x259)+'c'](_0x4e60f6);for(let _0xd1e8db of _0x196dba){let _0x1ef401=await path[_0x3d75e2(0x20e)](_0x4e60f6,_0xd1e8db),_0x5d8665=await fs[_0x3d75e2(0x213)](_0x1ef401);if(_0x5d8665[_0x3d75e2(0x23e)+'y']())await _0x2e5b6e[_0x3d75e2(0x202)](readFilesEvent,_0x1ef401);else{if(_0x5d8665[_0x3d75e2(0x24c)]()&&_0xd1e8db[_0x3d75e2(0x242)](_0x2e5b6e[_0x3d75e2(0x23b)]))try{let _0x41b006=await import(_0x1ef401);if(_0x2e5b6e[_0x3d75e2(0x24b)](typeof _0x41b006[_0x3d75e2(0x237)],_0x2e5b6e[_0x3d75e2(0x222)])||_0x2e5b6e[_0x3d75e2(0x25b)](typeof _0x41b006[_0x3d75e2(0x237)],_0x2e5b6e[_0x3d75e2(0x266)])){let _0x566b0b=_0x2e5b6e[_0x3d75e2(0x1f7)](checkBannedUser,sender);if(_0x566b0b&&!m[_0x3d75e2(0x1fd)]){m[_0x3d75e2(0x20a)](mess[_0x3d75e2(0x245)]);break;}let {event:_0x32877b}=await _0x41b006;await _0x2e5b6e[_0x3d75e2(0x26d)](_0x32877b,m,{'conn':conn,'group':group,'budy':budy,'isAdmins':isAdmins,'isOwner':isOwner,'addBanned':addBanned,'mess':mess,'setting':setting,'sleep':sleep,'Limit':Limit,'checkLimitUser':checkLimitUser,'addBanned':addBanned,'dbPlus':dbPlus,'dbMinus':dbMinus});}}catch(_0x43dbf7){console[_0x3d75e2(0x224)](_0x43dbf7);}}}}catch(_0x4de66f){console[_0x3d75e2(0x23d)](_0x3d75e2(0x25c)+_0x3d75e2(0x205)+_0x3d75e2(0x260)+_0x4e60f6),console[_0x3d75e2(0x224)](_0x4de66f);}}async function readFilesOn(_0x2bd351){const _0x5f2389=_0x507398,_0x23d6fb={'ozWxi':function(_0x98191e,_0x2420df){return _0x98191e(_0x2420df);},'redFA':_0x5f2389(0x1f3),'YRPox':function(_0x2043ea,_0x4aaf14){return _0x2043ea===_0x4aaf14;},'vRZpj':_0x5f2389(0x207),'BYMqv':function(_0x1b1f29,_0xef2533){return _0x1b1f29===_0xef2533;},'aNTtl':_0x5f2389(0x20d),'MuxQa':_0x5f2389(0x1f1),'xntkP':function(_0x161e21,_0x374b79,_0x7ebc80){return _0x161e21(_0x374b79,_0x7ebc80);},'JBhjJ':function(_0x3ef0b7,_0x12e55e,_0x3a983d){return _0x3ef0b7(_0x12e55e,_0x3a983d);}};try{let _0x1e976a=await fs[_0x5f2389(0x259)+'c'](_0x2bd351);for(let _0xe3927 of _0x1e976a){let _0x296411=await path[_0x5f2389(0x20e)](_0x2bd351,_0xe3927),_0x3225e9=await fs[_0x5f2389(0x213)](_0x296411);if(_0x3225e9[_0x5f2389(0x23e)+'y']())await _0x23d6fb[_0x5f2389(0x24f)](readFilesOn,_0x296411);else{if(_0x3225e9[_0x5f2389(0x24c)]()&&_0xe3927[_0x5f2389(0x242)](_0x23d6fb[_0x5f2389(0x204)]))try{let _0x40d0d9=await import(_0x296411);if(_0x23d6fb[_0x5f2389(0x251)](typeof _0x40d0d9['on'],_0x23d6fb[_0x5f2389(0x26b)])||_0x23d6fb[_0x5f2389(0x235)](typeof _0x40d0d9['on'],_0x23d6fb[_0x5f2389(0x223)])){let _0x4deeef=await _0x23d6fb[_0x5f2389(0x24f)](checkBannedUser,sender);if(_0x4deeef&&!m[_0x5f2389(0x1fd)]){m[_0x5f2389(0x20a)](mess[_0x5f2389(0x245)]);break;}else{if(_0x40d0d9['on'][_0x5f2389(0x258)][_0x5f2389(0x263)](command)){if(!m[_0x5f2389(0x1fd)]&&!isOwner&&_0x23d6fb[_0x5f2389(0x235)](typeof _0x40d0d9['on'][_0x5f2389(0x21e)],_0x23d6fb[_0x5f2389(0x200)])){let _0x568fc0=await _0x40d0d9['on'][_0x5f2389(0x21e)];if(ceklimit)return m[_0x5f2389(0x20a)](mess[_0x5f2389(0x21e)]);await _0x23d6fb[_0x5f2389(0x203)](confirmlimit,sender,_0x568fc0);}if(!_0x40d0d9['on'][_0x5f2389(0x23a)]||isPremium){if(m[_0x5f2389(0x1ec)]&&_0x40d0d9['on'][_0x5f2389(0x1f2)]&&!groupAdmins[_0x5f2389(0x263)](m[_0x5f2389(0x1f5)]))return m[_0x5f2389(0x20a)](mess[_0x5f2389(0x23c)]);if(_0x40d0d9['on'][_0x5f2389(0x247)]&&!isOwner)return m[_0x5f2389(0x20a)](mess[_0x5f2389(0x25f)]);if(_0x40d0d9['on'][_0x5f2389(0x219)]&&!m[_0x5f2389(0x1ec)])return m[_0x5f2389(0x20a)](mess[_0x5f2389(0x249)]);if(_0x40d0d9['on'][_0x5f2389(0x23f)]&&m[_0x5f2389(0x1ec)])return m[_0x5f2389(0x20a)](mess[_0x5f2389(0x248)]);let {on:_0xed3439}=await _0x40d0d9;if(_0xed3439[_0x5f2389(0x250)]&&_0xed3439[_0x5f2389(0x250)][_0x5f2389(0x238)](_0x43bd63=>_0x40d0d9['on'][_0x5f2389(0x250)][_0x5f2389(0x263)](_0x43bd63))||_0xed3439[_0x5f2389(0x241)]&&_0xed3439[_0x5f2389(0x241)][_0x5f2389(0x238)](_0x32b2c5=>_0x40d0d9['on'][_0x5f2389(0x241)][_0x5f2389(0x263)](_0x32b2c5))){if(!_0x40d0d9['on'][_0x5f2389(0x216)]||_0x23d6fb[_0x5f2389(0x24f)](checkRegisteredUser,sender))await _0x23d6fb[_0x5f2389(0x24e)](_0xed3439,m,{'conn':conn,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'getRandom':getRandom,'quoted':quoted,'claim':claim,'Hour':Hour,'getProfileData':getProfileData,'checkLimitUser':checkLimitUser,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'Uang':Uang,'claim':claim,'dbPlus':dbPlus,'dbMinus':dbMinus,'cekuang':cekuang,'addLimit':addLimit,'makeid':makeid,'sleep':sleep,'isRegister':isRegister,'registering':registering,'Kupon':Kupon,'cekkupon':cekkupon,'bytesToSize':bytesToSize,'isSticker':isSticker,'isQuotedSticker':isQuotedSticker,'isQuotedAudio':isQuotedAudio,'resetLimits':resetLimits,'sendContact':sendContact,'addBanned':addBanned,'addPremium':addPremium,'groupName':groupName,'switchGroup':switchGroup,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'cmd':cmd});else return m[_0x5f2389(0x20a)](mess[_0x5f2389(0x246)]);}}else m[_0x5f2389(0x20a)](mess[_0x5f2389(0x23a)]);}}}}catch(_0x4be5ea){m[_0x5f2389(0x20a)](_0x5f2389(0x230)+_0x5f2389(0x269)+_0xe3927+'\x0a'+_0x4be5ea[_0x5f2389(0x1f4)]),console[_0x5f2389(0x224)](_0x4be5ea);}}}}catch(_0x418f28){console[_0x5f2389(0x23d)](_0x5f2389(0x25c)+_0x5f2389(0x205)+_0x5f2389(0x260)+_0x2bd351),console[_0x5f2389(0x224)](_0x418f28);}}let gambar=m[_0x507398(0x240)]===_0x507398(0x26a)+'ge',stiker=m[_0x507398(0x240)]===_0x507398(0x231)+_0x507398(0x1ff),audio=m[_0x507398(0x240)]===_0x507398(0x265)+'ge',video=m[_0x507398(0x240)]===_0x507398(0x217)+'ge',doc=m[_0x507398(0x240)]===_0x507398(0x25e)+_0x507398(0x1f9);(gambar||audio||stiker||video||doc)&&console[_0x507398(0x23d)](chalk[_0x507398(0x1fb)][_0x507398(0x1f6)](''+(gambar?_0x507398(0x256):'')+(audio&&gambar?',\x20':'')+(audio?_0x507398(0x264):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x507398(0x209):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x507398(0x267):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x507398(0x236)+_0x507398(0x1f9):'')));let talking=body;console[_0x507398(0x23d)](chalk[_0x507398(0x1ed)][_0x507398(0x232)](''+pushname)),console[_0x507398(0x23d)](chalk[_0x507398(0x1fb)][_0x507398(0x1f6)](talking));m[_0x507398(0x1ec)]&&isCmd&&!m[_0x507398(0x1fd)]&&console[_0x507398(0x23d)](colors[_0x507398(0x233)][_0x507398(0x1f6)](_0x507398(0x24a))+'\x20'+colors[_0x507398(0x22d)](time)+'\x20'+colors[_0x507398(0x1ed)][_0x507398(0x232)](command)+'\x20'+colors[_0x507398(0x233)](_0x507398(0x22e))+'\x20'+colors[_0x507398(0x26c)](groupName));!m[_0x507398(0x1ec)]&&isCmd&&!m[_0x507398(0x1fd)]&&console[_0x507398(0x23d)](colors[_0x507398(0x233)][_0x507398(0x1f6)](_0x507398(0x1fc))+'\x20'+colors[_0x507398(0x22d)](time)+'\x20'+colors[_0x507398(0x1ed)][_0x507398(0x232)](command)+'\x20'+colors[_0x507398(0x233)](_0x507398(0x22e))+'\x20'+colors[_0x507398(0x26c)](pushname));        
    } catch (err) {
        console.log(color('ERROR', 'red'), err)
        m.reply(`${err}`)
    }
}