export let on = async (m, {
    conn,
    text,
    groupName,
    switchGroup
}) => {
    if (!text) return m.reply(`Masukan Parameternya contoh .on welcome`)
    const change = {
        welcome: true
    }
    switchGroup(m.chat, change);
    m.reply(`Welcome Berhasil Di Nyalakan Di Group ${groupName}`)
};

on.names = ['Group Menu'];
on.tags = ['on welcome'];
on.command = ['on'];
on.admin = true