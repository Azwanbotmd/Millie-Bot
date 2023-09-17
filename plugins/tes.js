exports.on = async ( msg, { command, mess, isPremium }) => {
const name = ["TES"];
const tag = ["hai"];
const help = ["h", "hai", "oh"];

  if (help.includes(command)) {
   if (!isPremium) return msg.reply(mess.premium)
    const result = "bacot";
    msg.reply(result);
   }
};
