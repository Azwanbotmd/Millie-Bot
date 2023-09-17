const translate = require('@vitalets/google-translate-api')
exports.on = async ( msg, { command, args, prefix, text, ceklimit, limitnya, mess }) => {
const name = ["TOOLS"];
const tag = ["translate", "tr"];
const help = ["tr", "translate"]
const limit = 1

 if (help.includes(command)) {   
    if (ceklimit) return msg.reply(mess.limit) 
    var lang, text
	if (args.length >= 2) {
		lang = args[0] ? args[0] : 'id', text = args.slice(1).join(' ')
	} else if (msg.quoted && msg.quoted.text) {
		lang = args[0] ? args[0] : 'id', text = msg.quoted.text
	} else msg.reply(`contoh: ${prefix + command} id hello i am robot`)
	let res = await translate(text, { to: lang, autoCorrect: true }).catch(_ => null)
	if (!res) msg.reply(`Error : Bahasa"${lang}" Tidak Support`)
	msg.reply(`*Terdeteksi Bahasa:* ${res.from.language.iso}\n*Ke Bahasa:* ${lang}\n\n*Terjemahan:* ${res.text}`.trim())
	await limitnya(msg.sender, limit)
	
   }
}