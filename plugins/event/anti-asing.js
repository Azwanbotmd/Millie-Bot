export let event = async (m, {
    conn,
    addBanned
}) => {
    if (m.sender.startsWith('212') || m.sender.startsWith('91') || m.sender.startsWith('92') || m.sender.startsWith('90') || m.sender.startsWith('54') || m.sender.startsWith('55') || m.sender.startsWith('40') || m.sender.startsWith('94') || m.sender.startsWith('256')) {
        conn.updateBlockStatus(m.sender, 'block');
        await addBanned(m.sender, true);
    }
}