export let on = async (m, {
    conn,
    text,
    groupName,
    switchGroup
 }) => {
    if (!text) return m.reply(`Masukan Parameternya contoh .off welcome`)
    const change = {
        welcome: false
    }
    switchGroup(m.chat, change);
    m.reply(`Welcome Berhasil Di Matikan Di Group ${groupName}`)
};

on.names = ['Group Menu'];
on.tags = ['off welcome'];
on.command = ['off'];
on.admin = true