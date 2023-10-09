export let on = async (m, {
    conn,
    mentionUser
 }) => {
    if (mentionUser.length !== 0) {
        conn.groupParticipantsUpdate(m.chat, [mentionUser[0]], "remove");
        m.reply(`Berhasil Menghapus ${mentionUser} Dari Grup Ini`)
    } else {
        m.reply(`Tag Yang Mau Di Kick`)
    }
};

on.names = ['Group Menu'];
on.tags = ['kick'];
on.command = ['kick', 'tendang'];
on.admin = true