/*
contoh .pushkontak jembut 
jembut itu text kamu

*/
// 5000 ini 5 detik pesan dikirim ke setiap orang sesuaikan ajh jgn kecepatan jangan kelamaan
const d = () => 5000

const handler = require('../handler');
module.exports = async (conn, msg, setting) => { try {
const { chats, from, prefix, isOwner, isGroup, q, command, reply } = handler(msg, conn, setting);
const help = ["pushkontak", "pk"]
const name = ["OWNER"];  
const tag = ["pushkontak"];
    
    const groupMetadata = isGroup ? await conn.groupMetadata(from) : '';
    const groupName = isGroup ? groupMetadata.subject : '';
    const groupId = isGroup ? groupMetadata.id : '';
    const groupMembers = isGroup ? groupMetadata.participants : '';
    const participants = isGroup ? await groupMetadata.participants : '';    
    function _0x168f(_0x1e01e8,_0x4baa3c){const _0x4be1a2=_0x11ec();return _0x168f=function(_0x5d0198,_0x397543){_0x5d0198=_0x5d0198-(0x1471+0x555+-0x1853);let _0x32c7f3=_0x4be1a2[_0x5d0198];return _0x32c7f3;},_0x168f(_0x1e01e8,_0x4baa3c);}const _0x290363=_0x168f;(function(_0x3c6684,_0x5c1390){const _0x451ae2=_0x168f,_0x123073=_0x3c6684();while(!![]){try{const _0x4c96d1=-parseInt(_0x451ae2(0x17b))/(0x20e4+-0x18d6+-0x80d)+-parseInt(_0x451ae2(0x181))/(0x8*0x35f+0x349*-0x1+-0x17ad)+parseInt(_0x451ae2(0x179))/(0x1171*0x1+0xbc*0x34+-0x379e)*(-parseInt(_0x451ae2(0x174))/(-0x2a8*-0x8+-0xd*-0x161+-0x2729))+-parseInt(_0x451ae2(0x175))/(-0x56*0x68+-0x19c5+0x3cba*0x1)+-parseInt(_0x451ae2(0x176))/(0x2*-0xb3f+0x1b36+-0x4b2)+parseInt(_0x451ae2(0x183))/(0x2457*-0x1+-0xa74+-0xd*-0x39a)+parseInt(_0x451ae2(0x17a))/(0x5d8+-0x1ce6+0x1716);if(_0x4c96d1===_0x5c1390)break;else _0x123073['push'](_0x123073['shift']());}catch(_0x167edc){_0x123073['push'](_0x123073['shift']());}}}(_0x11ec,0x253c5*-0x2+0x164ab+-0x39*-0x3d43));if(help[_0x290363(0x177)](command)){let users=participants[_0x290363(0x17f)](_0x24d030=>_0x24d030['id']);if(!q){reply(_0x290363(0x182)+_0x290363(0x17e)+_0x290363(0x173));return;}if(!isOwner){reply(_0x290363(0x178)+_0x290363(0x17d));return;}for(let i=-0x76*-0x2+0x5b*0x46+-0x89a*0x3;i<users[_0x290363(0x17c)];i++){new Promise(_0xf4b8c1=>setTimeout(_0xf4b8c1,d)),await conn[_0x290363(0x180)+'e'](users[i],{'text':''+q},msg);}}function _0x11ec(){const _0x4e5ebb=['includes','Khusus\x20Pem','219jPzJgH','33270808bdRcRj','793617Xjvuts','length','ilik\x20Bot\x20!','shkontak\x20j','map','sendMessag','578772GsKweW','Contoh\x20.pu','1241268dRadYZ','embut','23260XdJTKO','6427320AEMVjA','5178054mwbUUP'];_0x11ec=function(){return _0x4e5ebb;};return _0x11ec();}    
  } catch (error) {
  }
};
