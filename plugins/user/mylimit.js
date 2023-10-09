export let on = async (m, {
    checkLimitUser
}) => {
    const limitUser = checkLimitUser(m.sender);
    if (limitUser !== undefined) {
        m.reply(`Kamu Memiliki ${limitUser} Limit Tersisa`);
    } else {
        m.reply('Limit tidak ditemukan');
    }
};

on.names = ['User Menu'];
on.tags = ['limit'];
on.command = ['limit'];