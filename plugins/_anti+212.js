exports.on = async (msg, { conn, addBanned }) => { 
const sender = msg.sender;

   if (sender.startsWith('212') || sender.startsWith('91') || sender.startsWith('92') || sender.startsWith('90') || sender.startsWith('54') || sender.startsWith('55') || sender.startsWith('40') || sender.startsWith('94') || sender.startsWith('256')) {
     conn.updateBlockStatus(sender, 'block');
     addBanned(sender, true);
   }
 } 
/*
jika di console muncul ini abaikan saja
karna bot mencoba ngeblokir orang yang ada dalam daftar nomor yang di atas itu
tapi susah terblokir sebelum nya makanya muncul konsol ini
Error: bad-request
    at assertNodeErrorFree (/root/vps1tahun/botwa/mili/node_modules/@adiwajshing/baileys/lib/WABinary/generic-utils.js:56:15)
    at query (/root/vps1tahun/botwa/mili/node_modules/@adiwajshing/baileys/lib/Socket/socket.js:136:48)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async Object.updateBlockStatus (/root/vps1tahun/botwa/mili/node_modules/@adiwajshing/baileys/lib/Socket/chats.js:168:9) {
  data: 400,
  isBoom: true,
  isServer: true,
  output: {
    statusCode: 500,
    payload: {
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An internal server error occurred'
    },
    headers: {}
  }
} unhandledRejection
*/