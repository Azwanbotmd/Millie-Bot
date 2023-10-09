export let on = async (m, {
    conn,
    groupName,
    participants,
    groupAdmins
 }) => {
    let info = `*INFO GROUP*\n• *ID:* ${m.chat}\n• *Nama Grup:* ${groupName}\n• *Total Member:* ${participants.length}\n• *Total Admin:* ${groupAdmins.length}`
    m.reply(info);
};

on.names = ['Group Menu'];
on.tags = ['infogroup', 'infogc'];
on.command = ['infogc', 'infogroup'];
on.group = true