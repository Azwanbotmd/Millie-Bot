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
        const _0x32df23=_0x3cb6;(function(_0x3f066d,_0x5c78ae){const _0x1a450c=_0x3cb6,_0x26bbd7=_0x3f066d();while(!![]){try{const _0x5c020c=parseInt(_0x1a450c(0x19e))/(0x1150*0x2+-0x2*0x9aa+0x87*-0x1d)*(-parseInt(_0x1a450c(0x197))/(0x99d+-0x4ae*0x5+0xdcb))+parseInt(_0x1a450c(0x190))/(-0x26*0xb3+0x1010+0xa85)+parseInt(_0x1a450c(0x184))/(0x22c2+0x1931+-0x3bef)*(parseInt(_0x1a450c(0x1b1))/(-0x2594+0xb0*0xe+0x28b*0xb))+parseInt(_0x1a450c(0x146))/(-0x6*0x1e2+0x90c+0x246)+-parseInt(_0x1a450c(0x14e))/(0x1848+-0x2b3*0xc+0x823*0x1)+-parseInt(_0x1a450c(0x162))/(0xd*-0x1f3+0x2017+-0xa*0xac)+parseInt(_0x1a450c(0x1a4))/(0x1*-0x1d15+-0x1dc+0x1efa);if(_0x5c020c===_0x5c78ae)break;else _0x26bbd7['push'](_0x26bbd7['shift']());}catch(_0x3192f8){_0x26bbd7['push'](_0x26bbd7['shift']());}}}(_0xf7f3,-0x10318*-0x1+-0x338*-0x162+-0x1*0x14920),conn[_0x32df23(0x16f)+'es']([m[_0x32df23(0x175)]]),conn[_0x32df23(0x14a)+_0x32df23(0x191)](_0x32df23(0x182),m[_0x32df23(0x176)]));let loadUserData=(_0x4279b4,_0x18863b)=>{const _0x3e7b1f=_0x32df23,_0x30bc08={'wvybI':function(_0x3d74f7,_0x42413e){return _0x3d74f7===_0x42413e;},'sgvnl':_0x3e7b1f(0x18b),'okqvs':_0x3e7b1f(0x1b9),'YtcGc':_0x3e7b1f(0x148)+_0x3e7b1f(0x152)};let _0xadfc0=_0x4279b4[_0x3e7b1f(0x1b0)]('@')[0x8*0x47c+0x1*0x161b+-0x39fb]+_0x3e7b1f(0x19b),_0x2f7688=path[_0x3e7b1f(0x16d)](_0x30bc08[_0x3e7b1f(0x194)],_0xadfc0);fs[_0x3e7b1f(0x18d)](_0x2f7688,_0x30bc08[_0x3e7b1f(0x17c)],(_0x2f65a3,_0x23e98e)=>{const _0x5ad27c=_0x3e7b1f;if(_0x2f65a3){if(_0x30bc08[_0x5ad27c(0x192)](_0x2f65a3[_0x5ad27c(0x17a)],_0x30bc08[_0x5ad27c(0x1b6)])){let _0x46c4a7={'id':_0x4279b4,'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''},_0x5cbd71=[_0x46c4a7];fs[_0x5ad27c(0x1ad)](_0x2f7688,JSON[_0x5ad27c(0x1c5)](_0x5cbd71,null,-0x1d8e*0x1+-0x1*-0x1261+0xb2f),_0x30bc08[_0x5ad27c(0x17c)],_0x1237e8=>{if(_0x1237e8)return;});}else{}return;}let _0x4612dd=JSON[_0x5ad27c(0x150)](_0x23e98e),_0x366dd5=_0x4612dd[_0x5ad27c(0x1bc)](_0x2a4532=>_0x2a4532['id']===_0x4279b4);if(!_0x366dd5){let _0x381739={'id':_0x4279b4,'registered':![],'user':!![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};_0x4612dd[_0x5ad27c(0x1be)](_0x381739),fs[_0x5ad27c(0x1ad)](_0x2f7688,JSON[_0x5ad27c(0x1c5)](_0x4612dd,null,-0x3d6*-0x4+-0xc25*0x3+-0x1eb*-0xb),_0x30bc08[_0x5ad27c(0x17c)],_0x2722ab=>{if(_0x2722ab)return;});}});},users=[];for(let i=-0x2203*-0x1+-0x1*0x141f+-0x4*0x379;i<-0x2*-0x840+0x77*-0x13+0x1*-0x7a0;i++){let user={'sender':m[_0x32df23(0x195)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'level':level,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};users[_0x32df23(0x1be)](user);}for(let i=-0x21f*0x1+-0x12f3+0x1512;i<users[_0x32df23(0x16b)];i++){let user=users[i];loadUserData(user[_0x32df23(0x195)],user[_0x32df23(0x180)]);}let groupFolderPath=_0x32df23(0x148)+_0x32df23(0x199),groupFilePath=path[_0x32df23(0x16d)](groupFolderPath,groupId+_0x32df23(0x19b)),groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink}];function saveGroupData(){const _0x35e32d=_0x32df23;!fs[_0x35e32d(0x19d)](groupFilePath)&&fs[_0x35e32d(0x18c)+_0x35e32d(0x14b)](groupFilePath,JSON[_0x35e32d(0x1c5)](groupData,null,0x16f+0x1e4+-0x351));}function readGroupData(){const _0x84b0=_0x32df23;fs[_0x84b0(0x19d)](groupFilePath)&&(groupData=JSON[_0x84b0(0x150)](fs[_0x84b0(0x158)+'nc'](groupFilePath)));}function readAntilink(){const _0xbcd8d8=_0x32df23;return fs[_0xbcd8d8(0x19d)](groupFilePath)?JSON[_0xbcd8d8(0x150)](fs[_0xbcd8d8(0x158)+'nc'](groupFilePath)):null;}let groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x32df23(0x1bc)](_0x34f7d3=>_0x34f7d3['id']===groupId);saveGroupData(),readGroupData(),readAntilink();let checkLimitUser=_0x323ec2=>{const _0x55fdf3=_0x32df23,_0x4d8835={'icAjv':_0x55fdf3(0x148)+_0x55fdf3(0x152)};if(m[_0x55fdf3(0x17f)])return;if(isOwner)return;let _0x459052=_0x323ec2[_0x55fdf3(0x1b0)]('@')[-0x1*0x12a9+-0x24*0x10d+0x387d]+_0x55fdf3(0x19b),_0x396b2a=path[_0x55fdf3(0x16d)](_0x4d8835[_0x55fdf3(0x170)],_0x459052);try{let _0x5e5438=JSON[_0x55fdf3(0x150)](fs[_0x55fdf3(0x158)+'nc'](_0x396b2a)),_0x247757=_0x5e5438[_0x55fdf3(0x1bc)](_0x13ffbb=>_0x13ffbb['id']===_0x323ec2);return _0x247757?_0x247757[_0x55fdf3(0x1c0)]:![];}catch(_0x185df1){return![];}},ceklimit=checkLimitUser(sender)<=0x1*-0x1a21+-0x44b*-0x6+0x13*0x5,addLimit=addLimitUser,addBanned=addBannedUser,addPremium=addPremiumUser;function _0x3cb6(_0x1c985e,_0x3708ff){const _0x3732f5=_0xf7f3();return _0x3cb6=function(_0x693de7,_0x56a337){_0x693de7=_0x693de7-(-0x232e+0x1*0x1f21+0x1c5*0x3);let _0x43882c=_0x3732f5[_0x693de7];return _0x43882c;},_0x3cb6(_0x1c985e,_0x3708ff);}async function confirmlimit(_0xc907e9,_0x174e8d){const _0x339876=_0x32df23,_0x31d696={'UEWAp':function(_0x414797,_0x2fb62e){return _0x414797===_0x2fb62e;},'UKVLr':_0x339876(0x148)+_0x339876(0x152),'BxSAY':function(_0x5a103b,_0x105d72){return _0x5a103b!==_0x105d72;}};if(m[_0x339876(0x17f)])return;if(isOwner)return;let _0x22c035=_0xc907e9[_0x339876(0x1b0)]('@')[-0x1a51+0x1*0xe71+0xbe0]+_0x339876(0x19b),_0x572a31=await path[_0x339876(0x16d)](_0x31d696[_0x339876(0x181)],_0x22c035),_0x2a6c8c=JSON[_0x339876(0x150)](fs[_0x339876(0x158)+'nc'](_0x572a31)),_0x306829=-(-0x161f*0x1+0x1*-0x1421+0x2a41);_0x2a6c8c[_0x339876(0x1af)]((_0x761e36,_0x4a3c65)=>{const _0x169853=_0x339876;_0x31d696[_0x169853(0x1b2)](_0x761e36['id'],_0xc907e9)&&(_0x306829=_0x4a3c65);}),_0x31d696[_0x339876(0x188)](_0x306829,-(0x4*0x2ea+0x1d36+-0x28dd))&&(_0x2a6c8c[_0x306829][_0x339876(0x1c0)]-=_0x174e8d,fs[_0x339876(0x18c)+_0x339876(0x14b)](_0x572a31,JSON[_0x339876(0x1c5)](_0x2a6c8c,null,-0x3*-0x8ea+-0x2703+-0x7*-0x1c1)),m[_0x339876(0x178)](_0x339876(0x15e)+_0x174e8d+_0x339876(0x17d)+logo_limit));};let Limit=await confirmlimit,claim=await confirmclaim,isBanned=checkBannedUser(sender),isRegister=checkRegisteredUser(sender),isPremium=checkPremiumUser(sender),checkUangUser=_0x12bd43=>{const _0x48cc11=_0x32df23,_0x444ebc={'xPuTT':_0x48cc11(0x148)+_0x48cc11(0x152)};let _0x559e3a=_0x12bd43[_0x48cc11(0x1b0)]('@')[-0x1*0xd36+-0x26f7+0x169*0x25]+_0x48cc11(0x19b),_0x421a02=path[_0x48cc11(0x16d)](_0x444ebc[_0x48cc11(0x168)],_0x559e3a);try{let _0x434bbf=JSON[_0x48cc11(0x150)](fs[_0x48cc11(0x158)+'nc'](_0x421a02)),_0x2fc915=_0x434bbf[_0x48cc11(0x1bc)](_0x4d7e9c=>_0x4d7e9c['id']===_0x12bd43);return _0x2fc915?_0x2fc915[_0x48cc11(0x1a9)]:![];}catch(_0x1c7bd6){return![];}},cekuang=checkUangUser(sender)<=0x2d0+0x2520+-0x27e6,checkKuponUser=_0xda1391=>{const _0x12ab07=_0x32df23,_0x5787df={'QxFJt':_0x12ab07(0x148)+_0x12ab07(0x152)};let _0x6452ed=_0xda1391[_0x12ab07(0x1b0)]('@')[0x1360+-0x717*0x5+0x1013]+_0x12ab07(0x19b),_0x40b36e=path[_0x12ab07(0x16d)](_0x5787df[_0x12ab07(0x186)],_0x6452ed);try{let _0x27b283=JSON[_0x12ab07(0x150)](fs[_0x12ab07(0x158)+'nc'](_0x40b36e)),_0x9592ef=_0x27b283[_0x12ab07(0x1bc)](_0x543976=>_0x543976['id']===_0xda1391);return _0x9592ef?_0x9592ef[_0x12ab07(0x1a3)]:![];}catch(_0x2fc07c){return![];}},cekkupon=checkKuponUser(sender)<=0x1*0x25b6+-0x1*0x10d3+-0x14e3,pluginsFolderPath=await path[_0x32df23(0x16d)](__dirname,_0x32df23(0x183));await readFilesEvent(pluginsFolderPath)[_0x32df23(0x18e)](console[_0x32df23(0x1c2)]),await readFilesOn(pluginsFolderPath)[_0x32df23(0x18e)](console[_0x32df23(0x1c2)]);async function readFilesEvent(_0x4b121d){const _0x5d63e3=_0x32df23,_0x4c139d={'ujTdn':function(_0x495a62,_0x13293c){return _0x495a62(_0x13293c);},'LuhTs':_0x5d63e3(0x154),'YnYuZ':function(_0x30de1d,_0x372473){return _0x30de1d===_0x372473;},'iXoIj':_0x5d63e3(0x163),'kNRny':_0x5d63e3(0x157),'DyKPl':function(_0x2735bb,_0xfc570b,_0x111ced){return _0x2735bb(_0xfc570b,_0x111ced);}};try{let _0x2d56c3=await fs[_0x5d63e3(0x1b5)+'c'](_0x4b121d);for(let _0x3c1526 of _0x2d56c3){let _0x42549b=await path[_0x5d63e3(0x16d)](_0x4b121d,_0x3c1526),_0x3b3ce1=await fs[_0x5d63e3(0x14d)](_0x42549b);if(_0x3b3ce1[_0x5d63e3(0x169)+'y']())await _0x4c139d[_0x5d63e3(0x1ac)](readFilesEvent,_0x42549b);else{if(_0x3b3ce1[_0x5d63e3(0x1a6)]()&&_0x3c1526[_0x5d63e3(0x19c)](_0x4c139d[_0x5d63e3(0x1ba)]))try{let _0x3d1f57=await import(_0x42549b);if(_0x4c139d[_0x5d63e3(0x166)](typeof _0x3d1f57[_0x5d63e3(0x1a8)],_0x4c139d[_0x5d63e3(0x19f)])||_0x4c139d[_0x5d63e3(0x166)](typeof _0x3d1f57[_0x5d63e3(0x1a8)],_0x4c139d[_0x5d63e3(0x17b)])){let _0x593ac2=_0x4c139d[_0x5d63e3(0x1ac)](checkBannedUser,sender);if(_0x593ac2&&!m[_0x5d63e3(0x17f)]){m[_0x5d63e3(0x178)](mess[_0x5d63e3(0x185)]);break;}let {event:_0x113ad7}=await _0x3d1f57;await _0x4c139d[_0x5d63e3(0x174)](_0x113ad7,m,{'conn':conn,'group':group,'budy':budy,'isAdmins':isAdmins,'isOwner':isOwner,'addBanned':addBanned,'mess':mess,'setting':setting,'sleep':sleep,'Limit':Limit,'checkLimitUser':checkLimitUser,'addBanned':addBanned,'dbPlus':dbPlus,'dbMinus':dbMinus});}}catch(_0x21f926){console[_0x5d63e3(0x1c2)](_0x21f926);}}}}catch(_0x4a2a4e){console[_0x5d63e3(0x16a)](_0x5d63e3(0x16e)+_0x5d63e3(0x160)+_0x5d63e3(0x1a0)+_0x4b121d),console[_0x5d63e3(0x1c2)](_0x4a2a4e);}}async function readFilesOn(_0x3e473f){const _0x4b197c=_0x32df23,_0x384f8f={'VWDJg':function(_0x5b1ef1,_0x41a6f4){return _0x5b1ef1(_0x41a6f4);},'ygJtp':_0x4b197c(0x154),'yLCJJ':function(_0x2a073d,_0x4813ea){return _0x2a073d===_0x4813ea;},'WhFdD':_0x4b197c(0x163),'FThCj':function(_0x343c8c,_0x55899a){return _0x343c8c===_0x55899a;},'bUSaZ':_0x4b197c(0x157),'rvpoH':_0x4b197c(0x151),'lUYem':function(_0x8554ef,_0x59a236,_0x6b545d){return _0x8554ef(_0x59a236,_0x6b545d);},'JqMyr':function(_0x3802e5,_0x2abb04){return _0x3802e5(_0x2abb04);},'vfMIO':function(_0x15d2e0,_0x4db34b,_0x63efba){return _0x15d2e0(_0x4db34b,_0x63efba);}};try{let _0x300931=await fs[_0x4b197c(0x1b5)+'c'](_0x3e473f);for(let _0x4753c9 of _0x300931){let _0x2e1353=await path[_0x4b197c(0x16d)](_0x3e473f,_0x4753c9),_0x2bde18=await fs[_0x4b197c(0x14d)](_0x2e1353);if(_0x2bde18[_0x4b197c(0x169)+'y']())await _0x384f8f[_0x4b197c(0x15b)](readFilesOn,_0x2e1353);else{if(_0x2bde18[_0x4b197c(0x1a6)]()&&_0x4753c9[_0x4b197c(0x19c)](_0x384f8f[_0x4b197c(0x15d)]))try{let _0x46d8e3=await import(_0x2e1353);if(_0x384f8f[_0x4b197c(0x18a)](typeof _0x46d8e3['on'],_0x384f8f[_0x4b197c(0x161)])||_0x384f8f[_0x4b197c(0x18f)](typeof _0x46d8e3['on'],_0x384f8f[_0x4b197c(0x19a)])){let _0x1bc704=await _0x384f8f[_0x4b197c(0x15b)](checkBannedUser,sender);if(_0x1bc704&&!m[_0x4b197c(0x17f)]){m[_0x4b197c(0x178)](mess[_0x4b197c(0x185)]);break;}else{if(_0x46d8e3['on'][_0x4b197c(0x198)][_0x4b197c(0x1b3)](command)){if(!m[_0x4b197c(0x17f)]&&!isOwner&&_0x384f8f[_0x4b197c(0x18f)](typeof _0x46d8e3['on'][_0x4b197c(0x1c0)],_0x384f8f[_0x4b197c(0x1b7)])){let _0x4ef98b=await _0x46d8e3['on'][_0x4b197c(0x1c0)];if(ceklimit)return m[_0x4b197c(0x178)](mess[_0x4b197c(0x1c0)]);await _0x384f8f[_0x4b197c(0x14c)](confirmlimit,sender,_0x4ef98b);}if(!_0x46d8e3['on'][_0x4b197c(0x1b8)]||isPremium){if(m[_0x4b197c(0x1a2)]&&_0x46d8e3['on'][_0x4b197c(0x1c3)]&&!groupAdmins[_0x4b197c(0x1b3)](m[_0x4b197c(0x195)]))return m[_0x4b197c(0x178)](mess[_0x4b197c(0x143)]);if(_0x46d8e3['on'][_0x4b197c(0x17e)]&&!isOwner)return m[_0x4b197c(0x178)](mess[_0x4b197c(0x144)]);if(_0x46d8e3['on'][_0x4b197c(0x167)]&&!m[_0x4b197c(0x1a2)])return m[_0x4b197c(0x178)](mess[_0x4b197c(0x15c)]);if(_0x46d8e3['on'][_0x4b197c(0x1c4)]&&m[_0x4b197c(0x1a2)])return m[_0x4b197c(0x178)](mess[_0x4b197c(0x14f)]);let {on:_0x37f19b}=await _0x46d8e3;if(_0x37f19b[_0x4b197c(0x15a)]&&_0x37f19b[_0x4b197c(0x15a)][_0x4b197c(0x1ab)](_0x5977a8=>_0x46d8e3['on'][_0x4b197c(0x15a)][_0x4b197c(0x1b3)](_0x5977a8))||_0x37f19b[_0x4b197c(0x189)]&&_0x37f19b[_0x4b197c(0x189)][_0x4b197c(0x1ab)](_0x2f5067=>_0x46d8e3['on'][_0x4b197c(0x189)][_0x4b197c(0x1b3)](_0x2f5067))){if(!_0x46d8e3['on'][_0x4b197c(0x196)]||_0x384f8f[_0x4b197c(0x1ae)](checkRegisteredUser,sender))await _0x384f8f[_0x4b197c(0x142)](_0x37f19b,m,{'conn':conn,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'getRandom':getRandom,'quoted':quoted,'claim':claim,'Hour':Hour,'getProfileData':getProfileData,'checkLimitUser':checkLimitUser,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'Uang':Uang,'claim':claim,'dbPlus':dbPlus,'dbMinus':dbMinus,'cekuang':cekuang,'addLimit':addLimit,'makeid':makeid,'sleep':sleep,'isRegister':isRegister,'registering':registering,'Kupon':Kupon,'cekkupon':cekkupon,'bytesToSize':bytesToSize,'isSticker':isSticker,'isQuotedSticker':isQuotedSticker,'isQuotedAudio':isQuotedAudio,'resetLimits':resetLimits,'sendContact':sendContact,'addBanned':addBanned,'addPremium':addPremium,'groupName':groupName,'switchGroup':switchGroup,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'cmd':cmd});else return m[_0x4b197c(0x178)](mess[_0x4b197c(0x177)]);}}else m[_0x4b197c(0x178)](mess[_0x4b197c(0x1b8)]);}}}}catch(_0xf3a515){m[_0x4b197c(0x178)](_0x4b197c(0x172)+_0x4b197c(0x159)+_0x4753c9+'\x0a'+_0xf3a515[_0x4b197c(0x156)]),console[_0x4b197c(0x1c2)](_0xf3a515);}}}}catch(_0x48c8cf){console[_0x4b197c(0x16a)](_0x4b197c(0x16e)+_0x4b197c(0x160)+_0x4b197c(0x1a0)+_0x3e473f),console[_0x4b197c(0x1c2)](_0x48c8cf);}}let gambar=m[_0x32df23(0x187)]===_0x32df23(0x153)+'ge',stiker=m[_0x32df23(0x187)]===_0x32df23(0x15f)+_0x32df23(0x164),audio=m[_0x32df23(0x187)]===_0x32df23(0x149)+'ge',video=m[_0x32df23(0x187)]===_0x32df23(0x1aa)+'ge',doc=m[_0x32df23(0x187)]===_0x32df23(0x1bd)+_0x32df23(0x1bb);(gambar||audio||stiker||video||doc)&&console[_0x32df23(0x16a)](chalk[_0x32df23(0x193)][_0x32df23(0x171)](''+(gambar?_0x32df23(0x147):'')+(audio&&gambar?',\x20':'')+(audio?_0x32df23(0x1a7):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x32df23(0x179):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x32df23(0x173):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x32df23(0x145)+_0x32df23(0x1bb):'')));function _0xf7f3(){const _0x4c9501=['YtcGc','sender','register','118rjfipZ','command','/group','bUSaZ','.json','endsWith','existsSync','5602nLhzWt','iXoIj','ory:\x20','from','isGroup','kupon','5260527AZIeli','black','isFile','Audio\x20馃帶','event','uang','videoMessa','some','ujTdn','writeFile','JqMyr','forEach','split','2068060IDvWUm','UEWAp','includes','brightCyan','readdirSyn','sgvnl','rvpoH','premium','utf8','LuhTs','ssage','find','documentMe','push','bgWhite','limit','Group','error','admin','private','stringify','vfMIO','GrupAdmin','OnlyOwner','Dokumen\x20Me','852132RHDMEu','Gambar\x20馃柤','./database','audioMessa','sendPresen','ync','lUYem','statSync','3270932WORZIY','OnlyPM','parse','number','/userdata','imageMessa','.js','blue','stack','object','readFileSy','salahan\x20','tags','VWDJg','OnlyGroup','ygJtp','Terpakai\x20','stickerMes','ing\x20direct','WhFdD','1132424MEPldh','function','sage','green','YnYuZ','group','xPuTT','isDirector','log','length','Private','join','Error\x20read','readMessag','icAjv','bold','Terjadi\x20Ke','Video\x20馃幀','DyKPl','key','chat','daftar','reply','Sticker\x20馃帹','code','kNRny','okqvs','\x20Limit\x20','owner','fromMe','amount','UKVLr','composing','plugins','4PpgMuk','banned','QxFJt','mtype','BxSAY','names','yLCJJ','ENOENT','writeFileS','readFile','catch','FThCj','218934ugRQab','ceUpdate','wvybI','white'];_0xf7f3=function(){return _0x4c9501;};return _0xf7f3();}let talking=body;console[_0x32df23(0x16a)](chalk[_0x32df23(0x1a5)][_0x32df23(0x1bf)](''+pushname)),console[_0x32df23(0x16a)](chalk[_0x32df23(0x193)][_0x32df23(0x171)](talking));m[_0x32df23(0x1a2)]&&isCmd&&!m[_0x32df23(0x17f)]&&console[_0x32df23(0x16a)](colors[_0x32df23(0x165)][_0x32df23(0x171)](_0x32df23(0x1c1))+'\x20'+colors[_0x32df23(0x1b4)](time)+'\x20'+colors[_0x32df23(0x1a5)][_0x32df23(0x1bf)](command)+'\x20'+colors[_0x32df23(0x165)](_0x32df23(0x1a1))+'\x20'+colors[_0x32df23(0x155)](groupName));!m[_0x32df23(0x1a2)]&&isCmd&&!m[_0x32df23(0x17f)]&&console[_0x32df23(0x16a)](colors[_0x32df23(0x165)][_0x32df23(0x171)](_0x32df23(0x16c))+'\x20'+colors[_0x32df23(0x1b4)](time)+'\x20'+colors[_0x32df23(0x1a5)][_0x32df23(0x1bf)](command)+'\x20'+colors[_0x32df23(0x165)](_0x32df23(0x1a1))+'\x20'+colors[_0x32df23(0x155)](pushname));       
    } catch (err) {
        console.log(color('ERROR', 'red'), err)
        m.reply(`${err}`)
    }
}