/*exports.on = async ( msg, { conn, command, isOwner }) => {
const name = ["OWNER"];
const tag = ["restart"];
const help = ["restart", "reset", "reboot"]

   if (help.includes(command)) {
    if (!isOwner) return msg.reply(`Khusus Owner`);    
      await msg.reply(`Merestart bot......`)
      await process.send("reset")    
  }
}
*/

exports.on = async (msg, { conn, command, isOwner }) => {
const name = ["OWNER"];
const tag = ["restart"];
const help = ["restart", "reset", "reboot"];

  if (help.includes(command)) {
    if (!isOwner) return msg.reply(`Khusus Owner`);
    msg.reply(`Merestart bot......`);

    setTimeout(async () => {
      await process.send("reset");
    }, 2000);
  }
};
 
