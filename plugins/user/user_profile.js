export let on = async (m, {
    claim,
    Hour,
    getProfileData,
    checkLimitUser,
    checkPremiumUser,
    checkRegisteredUser
}) => { 
    let isPremium = checkPremiumUser(m.sender);
    let prem = isPremium ? 'Aktif' : 'Tidak';
    let isRegister = checkRegisteredUser(m.sender);
    let reg = isRegister ? 'Sudah Daftar' : 'Belum Daftar';
    let limitUser = checkLimitUser(m.sender);
    let userData = await getProfileData(m.sender);
    if (!m.fromMe && userData) {
        m.reply(`Profile Kamu\n\nTerdaftar: ${reg}\nPremium: ${prem}\nNama: ${userData.nama}\nUmur: ${userData.umur}\nSeri: ${userData.seri}\nLimit: ${limitUser}\nUang: ${userData.uang}\nKupon: ${userData.kupon}\n`);
    } else {
        if (!m.fromMe) {
            m.reply('Profil tidak ditemukan');
        }
    }    
};

on.names = ['User Menu'];
on.tags = ['profile'];
on.command = ['profile', 'my', 'me'];