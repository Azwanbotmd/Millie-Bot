export let on = async (m, { 
    conn
}) => {
 
conn.reply(m.chat, 'contoh ',m)

};

on.names = ['Tes'];
on.tags = ['y'];
on.command = ['y', 'ya'];