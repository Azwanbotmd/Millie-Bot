import fetch from 'node-fetch';

export let event = async (m, {
    conn,
    budy,
    Limit,
    checkLimitUser,
    mess
}) => {
    let domain = budy.match(/(https?:\/\/(?:www\.)?instagram\.[a-z\.]{2,6}\/[\w\-\.]+(\/[^\s]*)?)/g);
    if (domain && domain.length > 0) {
        if (checkLimitUser(m.sender) <= 0) {
            return m.reply(mess.limit);
        }
        m.reply(`Tunggu...`);
        try {
            let res = await fetch(`https://vihangayt.me/download/instagram?url=${domain[0]}`);
            let igeh = await res.json();
            m.reply(mess.wait);
            if (igeh.data && igeh.data.data.length > 0) {
                for (let item of igeh.data.data) {
                    conn.sendFile(m.chat, item.url, {
                        quoted: m
                    });
                }

                Limit(m.sender, 5);
            } else {
                m.reply(`Media tidak ditemukan`);
            }
        } catch (error) {
            console.log(error);
            m.reply(`Terjadi kesalahan saat mengambil data Instagram\n${error}`);
        }
    }
}