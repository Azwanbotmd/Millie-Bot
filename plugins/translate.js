const handler = require('../handler');
const translate = require('@vitalets/google-translate-api')
module.exports = async (conn, msg, setting) => {
const { from, args, command, prefix, q, reply, sender, limitnya, ceklimit, daftar, mess } = handler(msg, conn, setting);  
const name = ["TOOLS"];
const tag = ["translate bahasa textnya", "tr bahasa textnya"];
const help = ["tr", "translate"]
const limit = 1

   if (help.includes(command)) {
    if (daftar) return reply(mess.daftar)

    if (ceklimit) return reply(mess.limit)
    var text = q
    var lang, text
	if (args.length >= 2) {
		lang = args[0] ? args[0] : 'id', text = args.slice(1).join(' ')
	} else if (msg.quoted && msg.quoted.text) {
		lang = args[0] ? args[0] : 'id', text = msg.quoted.text
	} else reply(`contoh: ${prefix + command} id hello i am robot`)
	let res = await translate(text, { to: lang, autoCorrect: true }).catch(_ => null)
	if (!res) reply(`Error : Bahasa"${lang}" Tidak Support`)
	reply(`*Terdeteksi Bahasa:* ${res.from.language.iso}\n*Ke Bahasa:* ${lang}\n\n*Terjemahan:* ${res.text}`.trim())
	await limitnya(sender, limit)
	reply(`${limit} Limit Terpakai`) 
   }
}
