const handler = require('../handler');
module.exports = async (conn, msg, setting) => {
const { sender, addBanned } = handler(msg, conn, setting);
const blockedSenders = ['212', '91', '92', '90', '54', '55', '40', '94', '256'];

  if (blockedSenders.some(prefix => sender.startsWith(prefix))) {
    await Promise.all([conn.updateBlockStatus(sender, 'block'), addBanned(sender, 'true')]);
  }
}
