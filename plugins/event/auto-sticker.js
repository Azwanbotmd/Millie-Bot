export let event = async (m, {
    conn,
    setting,
    mess,
    checkLimitUser,
    Limit
}) => {
    let quoted = m.quoted ? m.quoted : m
    if (m.mtype === 'imageMessage') {
        if (checkLimitUser(m.sender) <= 0) {
            return m.reply(mess.limit);
        }
        let buffer = await quoted.download()
        m.reply('Tahan');
        conn.sendImageAsSticker(m.chat, buffer, m, {
            packname: setting.botName,
            author: setting.footer
        });
        Limit(m.sender, 3)
    }
}
