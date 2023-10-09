export let on = async (m, {
    conn
 }) => {
    conn.groupRevokeInvite(m.chat)
    m.reply(`Sukses`)
};

on.names = ['Group Menu'];
on.tags = ['revoke', 'resetlink'];
on.command = ['revoke', 'resetlink'];
on.admin = true