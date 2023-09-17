const fetch = require('node-fetch')
exports.on = async ( msg, { conn, command, mess, text, args, ceklimit, limitnya }) => {
const name = ["DOWNLOADER"]
const tag = ["gitclone"]
const help = ["gitclone", "git"]
const limit = 1

    if (help.includes(command)) {      
      if (ceklimit) return msg.reply(mess.limit)
      let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
      if (!text) return msg.reply('link githubnya mana?\n*Contoh:*\n.gitclone https://github.com/menu20/Millie-Bot')
      var linknya = text
      if (!regex1.test(linknya)) return msg.reply('link salah!')
      let [, user, repo] = args[0].match(regex1) || []
      repo = repo.replace(/.git$/, '')
      let url = `https://api.github.com/repos/${user}/${repo}/zipball`
      let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
      msg.reply(`*Mohon tunggu*,\n*sedang mengirim repository..*`)
      conn.sendMessage(msg.chat, { document: { url: url }, fileName: filename, mimetype: 'application/zip' }, { quoted: msg }).catch((err) => msg.reply('Maaf link github yang kamu berikan di private, dan tidak bisa di jadikan file'))
      limitnya(msg.sender, limit)
  }
}