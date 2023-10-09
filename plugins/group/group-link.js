export let on = async (m, {
    conn,
    groupName
}) => {
    let url = await conn.groupInviteCode(m.chat)
    if (!url) return
    if (url) {
        url = 'https://chat.whatsapp.com/' + url;
        m.reply(`Link Group ${groupName}\n${url}`);
    }
};

on.names = ['Group Menu'];
on.tags = ['linkgroup'];
on.command = ['linkgc', 'link', 'linkgc'];
on.group = true