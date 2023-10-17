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
        const _0x29d563=_0x306e;(function(_0x58531f,_0x5ca5e8){const _0x59b141=_0x306e,_0x23c950=_0x58531f();while(!![]){try{const _0x5e59b6=-parseInt(_0x59b141(0x9c))/(-0x1224+0x16b9+-0x494)+-parseInt(_0x59b141(0xc8))/(0x2571+-0x44*-0x6d+-0x4263)+parseInt(_0x59b141(0xa4))/(0x182*0xe+0x859*-0x3+0x3f2)*(-parseInt(_0x59b141(0x9f))/(0xc93*0x1+0x33e+-0xfcd))+-parseInt(_0x59b141(0x9b))/(-0x7*-0x1bd+0x3*-0x4e8+0x292)*(-parseInt(_0x59b141(0x117))/(0x2*0x7ff+-0x1216+0x21e))+-parseInt(_0x59b141(0xfe))/(-0x1fff*0x1+0x2519+-0x1*0x513)*(parseInt(_0x59b141(0xb5))/(-0xde+-0x1729+-0x3*-0x805))+-parseInt(_0x59b141(0xa1))/(-0x265*0x7+0x146c+-0x3a0)*(-parseInt(_0x59b141(0x9a))/(0x5c*-0x9+-0x133b*0x1+0x1681))+parseInt(_0x59b141(0xb8))/(-0xc7*-0x2d+0x13b8+-0x36a8);if(_0x5e59b6===_0x5ca5e8)break;else _0x23c950['push'](_0x23c950['shift']());}catch(_0x4a7edc){_0x23c950['push'](_0x23c950['shift']());}}}(_0x4538,-0x9*-0x5803+0x416*0x4bd+-0xc9775),conn[_0x29d563(0xba)+'es']([m[_0x29d563(0xd2)]]),conn[_0x29d563(0xce)+_0x29d563(0xbf)](_0x29d563(0xe1),m[_0x29d563(0xf4)]));let loadUserData=(_0x3dfb9f,_0x248ea6)=>{const _0x6bbb02=_0x29d563,_0x1bdcd5={'kYMNf':function(_0x2d0d60,_0x31b381){return _0x2d0d60===_0x31b381;},'Lsgza':_0x6bbb02(0xb6),'NsWBE':_0x6bbb02(0xae),'nhbAn':_0x6bbb02(0xb3)+_0x6bbb02(0x10a)};let _0x3e07d2=_0x3dfb9f[_0x6bbb02(0xa3)]('@')[-0x5e*0x65+0x125c+0x12ba]+_0x6bbb02(0x10d),_0x22bbfa=path[_0x6bbb02(0x9e)](_0x1bdcd5[_0x6bbb02(0xb7)],_0x3e07d2);fs[_0x6bbb02(0xff)](_0x22bbfa,_0x1bdcd5[_0x6bbb02(0xbc)],(_0xc51cdf,_0x1f1b17)=>{const _0x389507=_0x6bbb02;if(_0xc51cdf){if(_0x1bdcd5[_0x389507(0xfb)](_0xc51cdf[_0x389507(0xda)],_0x1bdcd5[_0x389507(0xcb)])){let _0xba75b5={'id':_0x3dfb9f,'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''},_0x3ce16c=[_0xba75b5];fs[_0x389507(0x104)](_0x22bbfa,JSON[_0x389507(0x99)](_0x3ce16c,null,0x337+-0x1001+0xccc),_0x1bdcd5[_0x389507(0xbc)],_0x4c5ded=>{if(_0x4c5ded)return;});}else{}return;}let _0xfd56e5=JSON[_0x389507(0xa0)](_0x1f1b17),_0x2f7669=_0xfd56e5[_0x389507(0xfd)](_0xdbbf0c=>_0xdbbf0c['id']===_0x3dfb9f);if(!_0x2f7669){let _0x5c7bd4={'id':_0x3dfb9f,'registered':![],'user':!![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};_0xfd56e5[_0x389507(0xa9)](_0x5c7bd4),fs[_0x389507(0x104)](_0x22bbfa,JSON[_0x389507(0x99)](_0xfd56e5,null,0x261b*-0x1+0x1*0x991+0x1c8c),_0x1bdcd5[_0x389507(0xbc)],_0x4f3e6e=>{if(_0x4f3e6e)return;});}});},users=[];for(let i=0xc3+0x1*0x940+-0xa03;i<-0x945+0x1*-0xf67+-0x25*-0xab;i++){let user={'sender':m[_0x29d563(0xfc)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};users[_0x29d563(0xa9)](user);}for(let i=-0x1d10+0xdd+-0x1*-0x1c33;i<users[_0x29d563(0xcd)];i++){let user=users[i];loadUserData(user[_0x29d563(0xfc)],user[_0x29d563(0xe2)]);}let groupFolderPath=_0x29d563(0xb3)+_0x29d563(0xac),groupFilePath=path[_0x29d563(0x9e)](groupFolderPath,groupId+_0x29d563(0x10d)),groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink}];function _0x4538(){const _0x18f100=['84tuqogO','GolHH','bold','from','white','stringify','598210wQyFIi','154545znmYjm','285898CNeUpC','\x20Limit\x20','join','2116300NJEnlL','parse','144UJPplz','mtype','split','3mwocMY','Dokumen\x20Me','imageMessa','bgWhite','reply','push','owner','MrUeg','/group','Aixlf','utf8','statSync','kupon','forEach','Group','./database','group','2248StVXmk','ENOENT','nhbAn','16117090DjBpXd','Crnic','readMessag','Gambar\x20馃柤','NsWBE','gjPrn','banned','ceUpdate','tqAFe','.js','Terpakai\x20','readdirSyn','uang','Lzysd','OnlyGroup','ory:\x20','2570482iNlCJQ','stickerMes','object','Lsgza','videoMessa','length','sendPresen','Video\x20馃幀','black','some','key','error','writeFileS','limit','isGroup','BxgUw','OYnqq','LBxTR','code','YIRhm','private','includes','zjjSf','tags','brightCyan','composing','amount','ssage','KTSzR','NPDPT','admin','register','log','Terjadi\x20Ke','Sticker\x20馃帹','plugins','green','stack','readFileSy','names','GrupAdmin','rLBFR','event','premium','chat','catch','existsSync','UGkvY','audioMessa','wkUCA','Audio\x20馃帶','kYMNf','sender','find','2702zFjAiN','readFile','OnlyOwner','fromMe','ing\x20direct','isDirector','writeFile','command','sage','daftar','Private','lNXJn','/userdata','isFile','number','.json','Error\x20read','function','WOvxE','ync','salahan\x20','OnlyPM','endsWith','documentMe','blue'];_0x4538=function(){return _0x18f100;};return _0x4538();}function saveGroupData(){const _0x524fc6=_0x29d563;!fs[_0x524fc6(0xf6)](groupFilePath)&&fs[_0x524fc6(0xd4)+_0x524fc6(0x111)](groupFilePath,JSON[_0x524fc6(0x99)](groupData,null,0xee3+-0x19fa+-0xb19*-0x1));}function readGroupData(){const _0x598992=_0x29d563;fs[_0x598992(0xf6)](groupFilePath)&&(groupData=JSON[_0x598992(0xa0)](fs[_0x598992(0xee)+'nc'](groupFilePath)));}function readAntilink(){const _0x529b03=_0x29d563;return fs[_0x529b03(0xf6)](groupFilePath)?JSON[_0x529b03(0xa0)](fs[_0x529b03(0xee)+'nc'](groupFilePath)):null;}let groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x29d563(0xfd)](_0x30dbea=>_0x30dbea['id']===groupId);saveGroupData(),readGroupData(),readAntilink();let checkLimitUser=_0x2bac33=>{const _0x116ecb=_0x29d563,_0x28ab80={'BxgUw':_0x116ecb(0xb3)+_0x116ecb(0x10a)};if(m[_0x116ecb(0x101)])return;if(isOwner)return;let _0x30949b=_0x2bac33[_0x116ecb(0xa3)]('@')[0x49f+-0x2057*0x1+0x1bb8]+_0x116ecb(0x10d),_0xa7d761=path[_0x116ecb(0x9e)](_0x28ab80[_0x116ecb(0xd7)],_0x30949b);try{let _0x4b4782=JSON[_0x116ecb(0xa0)](fs[_0x116ecb(0xee)+'nc'](_0xa7d761)),_0x1794c0=_0x4b4782[_0x116ecb(0xfd)](_0x522ba3=>_0x522ba3['id']===_0x2bac33);return _0x1794c0?_0x1794c0[_0x116ecb(0xd5)]:![];}catch(_0x33b884){return![];}},ceklimit=checkLimitUser(sender)<=-0xbac+0xe21*-0x1+0x19cd,addLimit=addLimitUser,addBanned=addBannedUser,addPremium=addPremiumUser;async function confirmlimit(_0x552fa0,_0x43ac60){const _0x61c92f=_0x29d563,_0x14307a={'gjPrn':function(_0x48cc8d,_0xae38ef){return _0x48cc8d===_0xae38ef;},'WOvxE':_0x61c92f(0xb3)+_0x61c92f(0x10a),'MrUeg':function(_0x271631,_0x4e5ceb){return _0x271631!==_0x4e5ceb;}};if(m[_0x61c92f(0x101)])return;if(isOwner)return;let _0x4bf0ff=_0x552fa0[_0x61c92f(0xa3)]('@')[0x70a+0x2a5*0xe+-0x2c10]+_0x61c92f(0x10d),_0x8df1c1=await path[_0x61c92f(0x9e)](_0x14307a[_0x61c92f(0x110)],_0x4bf0ff),_0x5e17e3=JSON[_0x61c92f(0xa0)](fs[_0x61c92f(0xee)+'nc'](_0x8df1c1)),_0x150aaa=-(-0x2111*-0x1+0x527*0x2+-0x2b5e);_0x5e17e3[_0x61c92f(0xb1)]((_0x1af2ea,_0x52359b)=>{const _0x319ae3=_0x61c92f;_0x14307a[_0x319ae3(0xbd)](_0x1af2ea['id'],_0x552fa0)&&(_0x150aaa=_0x52359b);}),_0x14307a[_0x61c92f(0xab)](_0x150aaa,-(-0x6c3*-0x1+-0x145a+0xd98))&&(_0x5e17e3[_0x150aaa][_0x61c92f(0xd5)]-=_0x43ac60,fs[_0x61c92f(0xd4)+_0x61c92f(0x111)](_0x8df1c1,JSON[_0x61c92f(0x99)](_0x5e17e3,null,-0x1d21+0xeb*-0xb+-0x1b*-0x174)),m[_0x61c92f(0xa8)](_0x61c92f(0xc2)+_0x43ac60+_0x61c92f(0x9d)+logo_limit));};function _0x306e(_0x252837,_0x2c9c56){const _0x1cc0cd=_0x4538();return _0x306e=function(_0x73e87,_0x4b3536){_0x73e87=_0x73e87-(0x1*-0x1702+-0x467+0x1c01);let _0x6e74d1=_0x1cc0cd[_0x73e87];return _0x6e74d1;},_0x306e(_0x252837,_0x2c9c56);}let Limit=await confirmlimit,claim=await confirmclaim,isBanned=checkBannedUser(sender),isRegister=checkRegisteredUser(sender),isPremium=checkPremiumUser(sender),checkUangUser=_0xec263f=>{const _0x512dbf=_0x29d563,_0x4a83f6={'lNXJn':_0x512dbf(0xb3)+_0x512dbf(0x10a)};let _0x81ff12=_0xec263f[_0x512dbf(0xa3)]('@')[0x1878+0x121*-0x8+-0x2*0x7b8]+_0x512dbf(0x10d),_0x5b16ce=path[_0x512dbf(0x9e)](_0x4a83f6[_0x512dbf(0x109)],_0x81ff12);try{let _0x268591=JSON[_0x512dbf(0xa0)](fs[_0x512dbf(0xee)+'nc'](_0x5b16ce)),_0x3f05ad=_0x268591[_0x512dbf(0xfd)](_0x11229a=>_0x11229a['id']===_0xec263f);return _0x3f05ad?_0x3f05ad[_0x512dbf(0xc4)]:![];}catch(_0x2f66b3){return![];}},cekuang=checkUangUser(sender)<=-0xbb6+0x1c97+-0x10d7*0x1,checkKuponUser=_0x1c0d91=>{const _0x4982a1=_0x29d563,_0x31906f={'LBxTR':_0x4982a1(0xb3)+_0x4982a1(0x10a)};let _0x5ca630=_0x1c0d91[_0x4982a1(0xa3)]('@')[0x1be0+-0x162b+-0x5b5]+_0x4982a1(0x10d),_0x19c9ce=path[_0x4982a1(0x9e)](_0x31906f[_0x4982a1(0xd9)],_0x5ca630);try{let _0x5be86a=JSON[_0x4982a1(0xa0)](fs[_0x4982a1(0xee)+'nc'](_0x19c9ce)),_0xe5f9f2=_0x5be86a[_0x4982a1(0xfd)](_0x51c716=>_0x51c716['id']===_0x1c0d91);return _0xe5f9f2?_0xe5f9f2[_0x4982a1(0xb0)]:![];}catch(_0x84235c){return![];}},cekkupon=checkKuponUser(sender)<=-0x149a+0x8cd+0xbcd*0x1,pluginsFolderPath=await path[_0x29d563(0x9e)](__dirname,_0x29d563(0xeb));await readFilesEvent(pluginsFolderPath)[_0x29d563(0xf5)](console[_0x29d563(0xd3)]),await readFilesOn(pluginsFolderPath)[_0x29d563(0xf5)](console[_0x29d563(0xd3)]);async function readFilesEvent(_0x3f7d55){const _0x2cbe93=_0x29d563,_0x1a6e0d={'NPDPT':function(_0x380cb9,_0xa4f849){return _0x380cb9(_0xa4f849);},'Crnic':_0x2cbe93(0xc1),'rLBFR':function(_0x535710,_0xf1ce19){return _0x535710===_0xf1ce19;},'KTSzR':_0x2cbe93(0x10f),'wkUCA':_0x2cbe93(0xca),'YIRhm':function(_0x1a7e7e,_0x367eb5,_0x450763){return _0x1a7e7e(_0x367eb5,_0x450763);}};try{let _0x15685e=await fs[_0x2cbe93(0xc3)+'c'](_0x3f7d55);for(let _0x46864d of _0x15685e){let _0x36075a=await path[_0x2cbe93(0x9e)](_0x3f7d55,_0x46864d),_0x309483=await fs[_0x2cbe93(0xaf)](_0x36075a);if(_0x309483[_0x2cbe93(0x103)+'y']())await _0x1a6e0d[_0x2cbe93(0xe5)](readFilesEvent,_0x36075a);else{if(_0x309483[_0x2cbe93(0x10b)]()&&_0x46864d[_0x2cbe93(0x114)](_0x1a6e0d[_0x2cbe93(0xb9)]))try{let _0x3fcc7b=await import(_0x36075a);if(_0x1a6e0d[_0x2cbe93(0xf1)](typeof _0x3fcc7b[_0x2cbe93(0xf2)],_0x1a6e0d[_0x2cbe93(0xe4)])||_0x1a6e0d[_0x2cbe93(0xf1)](typeof _0x3fcc7b[_0x2cbe93(0xf2)],_0x1a6e0d[_0x2cbe93(0xf9)])){let _0x42a269=_0x1a6e0d[_0x2cbe93(0xe5)](checkBannedUser,sender);if(_0x42a269&&!m[_0x2cbe93(0x101)])return;let {event:_0x30757a}=await _0x3fcc7b;await _0x1a6e0d[_0x2cbe93(0xdb)](_0x30757a,m,{'conn':conn,'group':group,'budy':budy,'isAdmins':isAdmins,'isOwner':isOwner,'addBanned':addBanned,'mess':mess,'setting':setting,'sleep':sleep,'Limit':Limit,'checkLimitUser':checkLimitUser,'addBanned':addBanned,'dbPlus':dbPlus,'dbMinus':dbMinus});}}catch(_0x332655){console[_0x2cbe93(0xd3)](_0x332655);}}}}catch(_0x3846ca){console[_0x2cbe93(0xe8)](_0x2cbe93(0x10e)+_0x2cbe93(0x102)+_0x2cbe93(0xc7)+_0x3f7d55),console[_0x2cbe93(0xd3)](_0x3846ca);}}async function readFilesOn(_0x3f906b){const _0x54ab0b=_0x29d563,_0x1277e8={'zjjSf':function(_0x1f3c59,_0xc989b2){return _0x1f3c59(_0xc989b2);},'OYnqq':_0x54ab0b(0xc1),'Aixlf':function(_0x49faf9,_0x198db6){return _0x49faf9===_0x198db6;},'Lzysd':_0x54ab0b(0x10f),'tqAFe':_0x54ab0b(0xca),'UGkvY':_0x54ab0b(0x10c),'GolHH':function(_0x74c724,_0x3ce79b,_0x4c1fe4){return _0x74c724(_0x3ce79b,_0x4c1fe4);}};try{let _0xd4f593=await fs[_0x54ab0b(0xc3)+'c'](_0x3f906b);for(let _0x580dbc of _0xd4f593){let _0x587d28=await path[_0x54ab0b(0x9e)](_0x3f906b,_0x580dbc),_0x3321fd=await fs[_0x54ab0b(0xaf)](_0x587d28);if(_0x3321fd[_0x54ab0b(0x103)+'y']())await _0x1277e8[_0x54ab0b(0xde)](readFilesOn,_0x587d28);else{if(_0x3321fd[_0x54ab0b(0x10b)]()&&_0x580dbc[_0x54ab0b(0x114)](_0x1277e8[_0x54ab0b(0xd8)]))try{let _0x6c70f5=await import(_0x587d28);if(_0x1277e8[_0x54ab0b(0xad)](typeof _0x6c70f5['on'],_0x1277e8[_0x54ab0b(0xc5)])||_0x1277e8[_0x54ab0b(0xad)](typeof _0x6c70f5['on'],_0x1277e8[_0x54ab0b(0xc0)])){if(_0x6c70f5['on'][_0x54ab0b(0x105)][_0x54ab0b(0xdd)](command)){if(!m[_0x54ab0b(0x101)]&&!isOwner&&_0x1277e8[_0x54ab0b(0xad)](typeof _0x6c70f5['on'][_0x54ab0b(0xd5)],_0x1277e8[_0x54ab0b(0xf7)])){let _0x257957=await _0x6c70f5['on'][_0x54ab0b(0xd5)];if(ceklimit)return m[_0x54ab0b(0xa8)](mess[_0x54ab0b(0xd5)]);await _0x1277e8[_0x54ab0b(0x118)](confirmlimit,sender,_0x257957);}let _0x201784=_0x1277e8[_0x54ab0b(0xde)](checkBannedUser,sender);if(_0x201784&&!m[_0x54ab0b(0x101)])return m[_0x54ab0b(0xa8)](mess[_0x54ab0b(0xbe)]);if(!_0x6c70f5['on'][_0x54ab0b(0xf3)]||isPremium){if(m[_0x54ab0b(0xd6)]&&_0x6c70f5['on'][_0x54ab0b(0xe6)]&&!groupAdmins[_0x54ab0b(0xdd)](m[_0x54ab0b(0xfc)]))return m[_0x54ab0b(0xa8)](mess[_0x54ab0b(0xf0)]);if(_0x6c70f5['on'][_0x54ab0b(0xaa)]&&!isOwner)return m[_0x54ab0b(0xa8)](mess[_0x54ab0b(0x100)]);if(_0x6c70f5['on'][_0x54ab0b(0xb4)]&&!m[_0x54ab0b(0xd6)])return m[_0x54ab0b(0xa8)](mess[_0x54ab0b(0xc6)]);if(_0x6c70f5['on'][_0x54ab0b(0xdc)]&&m[_0x54ab0b(0xd6)])return m[_0x54ab0b(0xa8)](mess[_0x54ab0b(0x113)]);let {on:_0x56dc41}=await _0x6c70f5;if(_0x56dc41[_0x54ab0b(0xdf)]&&_0x56dc41[_0x54ab0b(0xdf)][_0x54ab0b(0xd1)](_0x513b26=>_0x6c70f5['on'][_0x54ab0b(0xdf)][_0x54ab0b(0xdd)](_0x513b26))||_0x56dc41[_0x54ab0b(0xef)]&&_0x56dc41[_0x54ab0b(0xef)][_0x54ab0b(0xd1)](_0x249e17=>_0x6c70f5['on'][_0x54ab0b(0xef)][_0x54ab0b(0xdd)](_0x249e17))){if(!_0x6c70f5['on'][_0x54ab0b(0xe7)]||_0x1277e8[_0x54ab0b(0xde)](checkRegisteredUser,sender))await _0x1277e8[_0x54ab0b(0x118)](_0x56dc41,m,{'conn':conn,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'getRandom':getRandom,'quoted':quoted,'claim':claim,'Hour':Hour,'getProfileData':getProfileData,'checkLimitUser':checkLimitUser,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'Uang':Uang,'claim':claim,'dbPlus':dbPlus,'dbMinus':dbMinus,'cekuang':cekuang,'addLimit':addLimit,'makeid':makeid,'sleep':sleep,'isRegister':isRegister,'registering':registering,'Kupon':Kupon,'cekkupon':cekkupon,'bytesToSize':bytesToSize,'isSticker':isSticker,'isQuotedSticker':isQuotedSticker,'isQuotedAudio':isQuotedAudio,'resetLimits':resetLimits,'sendContact':sendContact,'addBanned':addBanned,'addPremium':addPremium,'groupName':groupName,'switchGroup':switchGroup,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'cmd':cmd});else return m[_0x54ab0b(0xa8)](mess[_0x54ab0b(0x107)]);}}else m[_0x54ab0b(0xa8)](mess[_0x54ab0b(0xf3)]);}}}catch(_0x13d554){m[_0x54ab0b(0xa8)](_0x54ab0b(0xe9)+_0x54ab0b(0x112)+_0x580dbc+'\x0a'+_0x13d554[_0x54ab0b(0xed)]),console[_0x54ab0b(0xd3)](_0x13d554);}}}}catch(_0xb505cc){console[_0x54ab0b(0xe8)](_0x54ab0b(0x10e)+_0x54ab0b(0x102)+_0x54ab0b(0xc7)+_0x3f906b),console[_0x54ab0b(0xd3)](_0xb505cc);}}let gambar=m[_0x29d563(0xa2)]===_0x29d563(0xa6)+'ge',stiker=m[_0x29d563(0xa2)]===_0x29d563(0xc9)+_0x29d563(0x106),audio=m[_0x29d563(0xa2)]===_0x29d563(0xf8)+'ge',video=m[_0x29d563(0xa2)]===_0x29d563(0xcc)+'ge',doc=m[_0x29d563(0xa2)]===_0x29d563(0x115)+_0x29d563(0xe3);(gambar||audio||stiker||video||doc)&&console[_0x29d563(0xe8)](chalk[_0x29d563(0x98)][_0x29d563(0x119)](''+(gambar?_0x29d563(0xbb):'')+(audio&&gambar?',\x20':'')+(audio?_0x29d563(0xfa):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x29d563(0xea):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x29d563(0xcf):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x29d563(0xa5)+_0x29d563(0xe3):'')));let talking=body;console[_0x29d563(0xe8)](chalk[_0x29d563(0xd0)][_0x29d563(0xa7)](''+pushname)),console[_0x29d563(0xe8)](chalk[_0x29d563(0x98)][_0x29d563(0x119)](talking));m[_0x29d563(0xd6)]&&isCmd&&!m[_0x29d563(0x101)]&&console[_0x29d563(0xe8)](colors[_0x29d563(0xec)][_0x29d563(0x119)](_0x29d563(0xb2))+'\x20'+colors[_0x29d563(0xe0)](time)+'\x20'+colors[_0x29d563(0xd0)][_0x29d563(0xa7)](command)+'\x20'+colors[_0x29d563(0xec)](_0x29d563(0x11a))+'\x20'+colors[_0x29d563(0x116)](groupName));!m[_0x29d563(0xd6)]&&isCmd&&!m[_0x29d563(0x101)]&&console[_0x29d563(0xe8)](colors[_0x29d563(0xec)][_0x29d563(0x119)](_0x29d563(0x108))+'\x20'+colors[_0x29d563(0xe0)](time)+'\x20'+colors[_0x29d563(0xd0)][_0x29d563(0xa7)](command)+'\x20'+colors[_0x29d563(0xec)](_0x29d563(0x11a))+'\x20'+colors[_0x29d563(0x116)](pushname));
    } catch (err) {
        console.log(color('ERROR', 'red'), err)
        m.reply(`${err}`)
    }
}