const handler = require('../handler');
module.exports = async (conn, msg, setting) => {
const {mess, fs, isOwner, from, db_user, command, reply } = handler(msg, conn, setting);
const name = ["OWNER"]
const tag = ["resetdb"]
const help = ["resetdb"]

 if (help.includes(command)) {
 if (!isOwner) return reply(mess.OnlyOwner)

let para_kos = "[]"
db_user.splice(para_kos)

fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user, null, 1))

reply('Sukses restart database')

   }
}