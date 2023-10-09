export let on = async (m, {
    conn,
    text,
    participants
}) => {
    let teks_tagall = `〘 *Tag All* 〙\n\nDi Perintahkan Oleh\n@${m.sender.split('@')[0]}\n\nKata Dia\n${text ? text : ''}\n\n`;
    for (let mem of participants) {
        teks_tagall += `• @${mem.id.split('@')[0]}\n`;
    }
    conn.sendMessage(m.chat, {
        text: teks_tagall,
        mentions: participants.map(a => a.id)
    }, {
        quoted: m
    });
}

on.names = ['Group Menu'];
on.tags = ['tagall'];
on.command = ['tagall'];
on.admin = true