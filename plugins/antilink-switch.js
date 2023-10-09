export let on = async (m, {
    conn,
    text,
    groupName,
    switchGroup
 }) => { 
    if (!text) return m.reply(`Masukkan Parameternya contoh .antilink on/off`);
    let change;
    if (text.toLowerCase() === "on") {
        change = {
            antilink: true
        };
        m.reply(`Antilink berhasil diaktifkan di grup ${groupName}`);
    } else if (text.toLowerCase() === "off") {
        change = {
            antilink: false
        };
        m.reply(`Antilink berhasil dimatikan di grup ${groupName}`);
    } else {
        return m.reply(`Masukkan Parameter yang Valid (on/off)`);
    }
    switchGroup(m.chat, change);    
};

on.names = ['Group Menu'];
on.tags = ['antilink'];
on.command = ['antilink'];
on.admin = true
on.owner = true