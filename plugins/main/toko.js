/*
pakai fitur ini kalo kalian punya dagangan kalian kreasikan sendiri dagangan sampe 10 aj
ini gw tulis tampilkan ampe 5 doank nambahin sendiri kalo punya banyak dagangan
*/
import fs from "fs";
export let on = async (m, { 
    conn    
}) => {
    let toko = await JSON.parse(fs.readFileSync('./database/toko/toko.json'));

    let dagangan1 = toko[0].toko1;
    let dagangan2 = toko[0].toko2;
    let dagangan3 = toko[0].toko3;
    let dagangan4 = toko[0].toko4;
    let dagangan5 = toko[0].toko5;
    let dagangan8 = toko[0].toko8;
//jika ingin ada medianya seperti gambar pake conn.sendMessage(m.chat, { image : { url : 'urlfotokalian' }, caption : `My Shop\n${dagangan1}` }, { quoted : m })
    m.reply(`
*My Shop ??*
1.DIAMOND ML
${dagangan1}

2.DIAMOND FF
${dagangan2}

3.RUJAK
${dagangan3}

4.SAYUR
${dagangan4}

5.Lainnya
${dagangan5}

8.Toko8
${dagangan8}
`)

};

on.names = ['Main Menu'];
on.tags = ['toko', 'dagangan'];
on.command = ['toko', 'dagangan'];