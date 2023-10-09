export let on = async (m, {
    conn,
    setting,
    sendContact
}) => { 
    let ownerNumbers = setting.ownerNumber;
    let ownerLinks = [];

    for (let i = 0; i < ownerNumbers.length; i++) {
        const number = ownerNumbers[i].replace("@s.whatsapp.net", "");
        ownerLinks.push(`wa.me/${number}`);

        if (i === 0) {
            await sendContact(m.chat, ownerNumbers[i], "", m);
        }
    }

    if (ownerLinks.length > 1) {
        let text = "Nomor Owner Lainnya";
        ownerLinks.forEach((link, index) => {
            text += `\n${index + 1}. ${link}`;
        });
        m.reply(text);
    }    
};

on.names = ['Main Menu'];
on.tags = ['owner'];
on.command = ['owner', 'pemilik'];