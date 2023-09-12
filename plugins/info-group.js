const handler = require('../handler');
module.exports = async (conn, msg, setting) => { try {
const { from, sender, isAntiLink, q, isGroup, isOwner, getGroupAdmins, command, reply} = handler(msg, conn, setting);
const name = ["GROUP MENU"];
const tag = ["infogroup", "tagall", "hidetag"]
    
    const { welcome_JSON } = require('../function/Data_Location.js');
    welcomeJson = welcome_JSON;
    const isWelcome = isGroup ? welcomeJson.includes(from) : true;
    const groupMetadata = isGroup ? await conn.groupMetadata(from) : '';
    const groupName = isGroup ? groupMetadata.subject : '';
    const groupId = isGroup ? groupMetadata.id : '';
    const participants = isGroup ? await groupMetadata.participants : '';
    const groupMembers = isGroup ? groupMetadata.participants : '';
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : '';
    if (command === 'infogc' || command === 'infogroup') {
    let info = `*INFO GROUP*\n• *ID:* ${from}\n• *Nama Grup:* ${groupName}\n• *Total Member:* ${groupMembers.length}\n• *Total Admin:* ${groupAdmins.length}\n• *Antilink:* ${isAntiLink ? 'sedang aktif' : 'tidak aktif'} • *Welcome:* ${isWelcome ? 'sedang aktif' : 'tidak aktif'}`;
    reply(info)
    }
    if (command === 'tagall') {     
    let teks_tagall = `〘 *Tag All* 〙\n\nDi Perintahkan Oleh\n@${sender.split('@')[0]}\n\nKata Dia\n${q ? q : ''}\n\n`;
    for (let mem of participants) {
    teks_tagall += `• @${mem.id.split('@')[0]}\n`;
    }
    conn.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: msg});        
    }
    if (command === 'hidetag') {
    if (!isOwner) reply(`Khusus Owner`)
    let mem = [];
groupMembers.map( i => mem.push(i.id) )

    conn.sendMessage(from, { text: q ? q : '', mentions: mem },{quoted:msg})
    }

  } catch (error) {
    console.error(error);
  }
}

