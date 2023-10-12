import { axiosFetch } from '../../lib/Data_Location.js'
let tebakgambar = {}
let rewards = {
    limit: 10,
    uang: 20
}

let mistaken = Math.floor(Math.random() * 3);
let message = ['💩 Salah', '🐽 Kurang Tepat', '🍌 Belum Benar'][mistaken];

export let event = async (m, {
    conn,
    budy,
    dbPlus
}) => {
    if (tebakgambar.hasOwnProperty(m.sender.split('@')[0]) && budy && !m.isBaileys) {
        let jawaban = tebakgambar[m.sender.split('@')[0]] && !m.fromMe
        if (budy.toLowerCase() === jawaban) {
            m.reply(`Benar 🌈\nkamu mendapatkan:\n+Limit ${rewards.limit}\n+Uang ${rewards.uang} `);
            dbPlus(m.sender, rewards)
            delete tebakgambar[m.sender.split('@')[0]];
        } else {
            m.reply(message);
        }
    }
}

export let on = async (m, {
    conn,
    command,
    prefix,
    sleep
}) => {
    let sent = m.sender;
    if (tebakgambar.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Soal Yang Belum Diselesaikan!")
    let results = await axiosFetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')
    let result = results[Math.floor(Math.random() * results.length)];
    conn.sendMessage(m.chat, {
        image: {
            url: result.img
        },
        caption: `Silahkan Jawab Soal Di Atas Ini\n\nDeskripsi : ${result.deskripsi}\nWaktu : 120 Detik\nHadiah 🎁 ${rewards.limit} limit dan ${rewards.uang} uang`
    }, {
        quoted: m
    }).then(() => {
        tebakgambar[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
    })
    await sleep(120000)
    if (tebakgambar.hasOwnProperty(m.sender.split('@')[0])) {
        console.log("Jawaban: " + result.jawaban)
        m.reply(`Waktu Habis\nJawaban: ${tebakgambar[m.sender.split('@')[0]]}`)
        delete tebakgambar[m.sender.split('@')[0]]
    }
}

on.names = ['Games'];
on.tags = ['tebalgambar'];
on.command = ['tebakgambar'];
