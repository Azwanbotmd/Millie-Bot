export let on = async (m, {
    conn
}) => {
    conn.groupSettingUpdate(m.chat, "announcement");
    m.reply(`Group Telah Di Tutup Semua Anggota Tidak Dapat Mengirim Pesan Admin Kontol`)
};

on.names = ['Group Menu'];
on.tags = ['groupoff'];
on.command = ['groupoff', 'tutup'];
on.admin = true