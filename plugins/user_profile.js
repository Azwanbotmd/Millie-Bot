exports.on = async (msg, { 
  command, 
  checkLimitUser, 
  checkPremiumUser, 
  checkRegisteredUser, 
  getProfileData, 
  claim, 
  Hour 
  }) => {
const name = ["USER MENU"];
const tag = ["profile"];
const help = ["profile", "my"];
   
   if (help.includes(command)) {
     const isPremium = checkPremiumUser(msg.sender);
     const prem = isPremium ? 'Aktif' : 'Tidak';     
     const isRegister = checkRegisteredUser(msg.sender);
     const reg = isRegister ? 'Sudah Daftar' : 'Belum Daftar';     
     const limitUser = checkLimitUser(msg.sender);     
     const userData = await getProfileData(msg.sender);     
     if (userData) {
       msg.reply(`Profile Kamu\n\nTerdaftar: ${reg}\nPremium: ${prem}\nNama: ${userData.nama}\nUmur: ${userData.umur}\nSeri: ${userData.seri}\nLimit: ${limitUser}\nUang: ${userData.uang}\nKupon: ${userData.kupon}\nLevel: ${userData.level}\n`);
     } else {
       msg.reply('Profil tidak ditemukan');
     }
   }
};
