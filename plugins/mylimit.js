exports.on = async ( msg, { command, checkLimitUser }) => {
const name = ["USER MENU"];
const tag = ["limit"];
const help = ["limit"];

  if (help.includes(command)) {
    const limitUser = checkLimitUser(msg.sender);
    if (limitUser !== undefined) {
      msg.reply(`Kamu Memiliki ${limitUser} Limit Tersisa`);
    } else {
      msg.reply('Limit tidak ditemukan');
    }
  }
};
