export let on = async (m, {
    conn
}) => {
    conn.groupSettingUpdate(m.chat, "not_announcement");
    m.reply(`Group Telah Di Buka Semua Anggota Dapat Mengirim Pesan`)
};

on.names = ['Group Menu'];
on.tags = ['groupon'];
on.command = ['groupon', 'buka'];
on.admin = true