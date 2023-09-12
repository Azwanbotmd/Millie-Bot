const handler = require('../handler');
module.exports = async (conn, msg, setting) => {
const { from, fetch, q, args, command, reply, sender, limitnya, ceklimit, daftar, mess } = handler(msg, conn, setting);
const name = ["DOWNLOADER"]
const tag = ["gitclone"]
const help = ["gitclone", "git"]
const limit = 1

 if (help.includes(command)) {
 if (daftar) return reply(mess.daftar)
 if (ceklimit) return reply(mess.limit)
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
if (!q) return reply('link githubnya mana?\n*Contoh:*\n.gitclone https://github.com/menu20/Millie-Bot')
var linknya = q
if (!regex1.test(linknya)) return reply('link salah!')
let [, user, repo] = args[0].match(regex1) || []
repo = repo.replace(/.git$/, '')
let url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
reply(`*Mohon tunggu*,\n*sedang mengirim repository..*`)
await conn.sendMessage(from, { document: { url: url }, fileName: filename, mimetype: 'application/zip' }, { quoted: msg }).catch((err) => reply('Maaf link github yang kamu berikan di private, dan tidak bisa di jadikan file'))
await limitnya(sender, limit)
await reply(`${limit} Limit Terpakai`)
}
}