export let on = async (m, {
    conn
 }) => {

    let script = 'Im Currently Using This\n\https://github.com/menu20/Millie-Bot'
    conn.sendMessage(m.chat, {
        text: script
    }, {
        quoted: m
    });
};

on.names = ['Main Menu'];
on.tags = ['script'];
on.command = ['script', 'sc', 'repo', 'repositori'];