export let on = async (m, {
    conn,
    text,
    participants
 }) => {
    let mem = [];
    participants.map(i => mem.push(i.id))
    conn.sendMessage(m.chat, {
        text: text ? text : '',
        mentions: mem
    }, {
        quoted: m
    });
};

on.names = ['Group Menu'];
on.tags = ['hidetag'];
on.command = ['ht', 'hidetag'];
on.admin = true
on.owner = true