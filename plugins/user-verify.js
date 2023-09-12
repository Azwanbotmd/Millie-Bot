const handler = require('../handler');
module.exports = async (conn, msg, setting) => {
const { from, addlimit, prefix, q, db_user, fs, mentions, sleep, makeid, addlimitUser, cekUser, sender, command,reply } = handler(msg, conn, setting);
const name = ["MAIN MENU"];  
const tag = ["daftar"];
const help = ["verify", "daftar", "v"]

if (help.includes(command)) {
if (cekUser("id", sender) !== null) return reply('Kamu Sudah Daftar!!')
var res_us = `${makeid(10)}`
let user_name = q.split(".")[0];
let umur = q.split(".")[1];
let object_user = {"id": sender, "name": user_name, "umur": umur, "seri": res_us, "premium": false }
db_user.push(object_user)
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user, null, 2))
await sleep(1000)
await addlimit(sender)
await addlimitUser(sender, 15)
var verify_teks =`
Number : +${sender.split('@')[0]}
Name : ${user_name}
SN : ${res_us}
*silahkan ketik .menu*
`
mentions(`
Berhasil √@${sender.split("@")[0]}
${verify_teks}
`, [sender])
await sleep(3000)
reply (`Kamu mendapatkan 15 Limit Setelah Mendaftar`)
}
}