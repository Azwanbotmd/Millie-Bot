exports.on = async (msg, { 
  command, 
  text,
  groupName,
  switchGroup 
  }) => {
const name = ["GROUP MENU"];
const tag = ["antilink"];
const help = ["antilink"];

  if (help.includes(command)) {
    if (!text) return msg.reply(`Masukkan Parameternya contoh .antilink on/off`);

    let change;
    if (text.toLowerCase() === "on") {
      change = {
        antilink: true
      };
      msg.reply(`Antilink berhasil diaktifkan di grup ${groupName}`);
    } else if (text.toLowerCase() === "off") {
      change = {
        antilink: false
      };
      msg.reply(`Antilink berhasil dimatikan di grup ${groupName}`);
    } else {
      return msg.reply(`Masukkan Parameter yang Valid (on/off)`);
    }

    await switchGroup(msg.chat, change);
  }
};