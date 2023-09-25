exports.on = async (msg, { conn, chats, group, sleep, isGroupAdmins }) => {
  
  if (chats.includes('https://chat.whatsapp.com')) {
    if (!msg.fromMe && group && group.antilink) {
     if (isGroupAdmins) {
       msg.reply(`Kamu Admin Kamu Di Bebaskan`);
       return
     }
      await msg.reply(`Terdeteksi Mengirim Kata Kata Aneh !`);
      await sleep(3000)
      await conn.groupParticipantsUpdate(msg.chat, [msg.sender], "remove")
    }
  }
};
