export let on = async (m) => {
    m.reply(`Merestart bot......`);
    setTimeout(async () => {
        await process.send("reset");
    }, 2000);   
};

on.names = ['Owner'];
on.tags = ['restart'];
on.command = ['restart', 'reset', 'reboot'];
on.owner = true