export let on = async (m, {
    conn,
    mentionUser
}) => {
    if (mentionUser.length !== 0) {
        conn.groupParticipantsUpdate(m.chat, [mentionUser[0]], "demote");
        m.reply(`Sekarang ${mentionUser} Tidak Lagi Jadi Admin`)
    } else {
        m.reply(`Tag Admin Yang Mau Di demote`)
    }
};

on.names = ['Group Menu'];
on.tags = ['demote']
on.command = ['demote']
on.admin = true