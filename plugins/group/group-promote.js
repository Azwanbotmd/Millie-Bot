export let on = async (m, {
    conn,
    mentionUser
}) => {
    if (mentionUser.length !== 0) {
        conn.groupParticipantsUpdate(m.chat, [mentionUser[0]], "promote");
        m.reply(`Sekarang ${mentionUser} Jadi Admin`)
    } else {
        m.reply(`Tag Yang Mau Di Promote`)
    }
};

on.names = ['Group Menu'];
on.tags = ['promote', 'jadiadmin'];
on.command = ['jadiadmin', 'promote'];
on.admin = true