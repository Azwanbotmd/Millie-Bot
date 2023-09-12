const handler = require('../handler');
module.exports = async (conn, msg, setting) => {  try {
const { fs, mess, from, prefix, isOwner, q, command, reply } = handler(msg, conn, setting);
const name = ["OWNER"]
const tag = ["broadcast"]
const help = ["broadcast", "bc"]

if (help.includes(command)) {
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Masukan parameter text\n*Contoh:*\n${prefix+command} hallo`)
let db_orang = JSON.parse(fs.readFileSync('./database/pengguna.json'));
let data_teks = `${q}`
for (let i of db_orang){ 
var button_broadcast = {text: data_teks, footer: '漏broadcast', buttons: [{ buttonId: '!menu', buttonText: {displayText: '鈰槹 饾棤饾棙饾棥饾棬'}, type: 1}],headerType: 1}
conn.sendMessage(i.id, button_broadcast)
}
reply(`*Sukses mengirim broadcast text ke ${db_orang.length} user*`)
}
  } catch (error) {
    const { from } = handler(msg, conn, setting);   
    console.error(error);
    if (error) conn.sendMessage(from,{text:`${error}`},{quoted:msg})
  }
};
