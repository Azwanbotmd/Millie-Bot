export let on = async (m, {
    checkLimitUser
}) => {
    const limitUser = checkLimitUser(m.sender);
    if (limitUser !== undefined) {
        m.reply(`Kamu Memiliki ${limitUser} Limit Tersisa`);
    } else {
        m.reply('Limit tidak ditemukan jika owner dan eke di bebaskan');
    }
};

on.names = ['User Menu'];
on.tags = ['limit'];
on.command = ['limit'];
