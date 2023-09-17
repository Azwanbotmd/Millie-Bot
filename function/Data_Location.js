const fs = require('fs')

JSON_DATA = {
setting: JSON.parse(fs.readFileSync('./config.json')),
//antilink: JSON.parse(fs.readFileSync('./database/antilink.json')),
mess: JSON.parse(fs.readFileSync('./function/message.json')),
//welcome: JSON.parse(fs.readFileSync('./database/welcome.json')),
//db_user: JSON.parse(fs.readFileSync('./database/pengguna.json')),
//server_eror: JSON.parse(fs.readFileSync('./database/func_error.json')),
}

exports.setting_JSON = JSON_DATA.setting;
//exports.welcome_JSON = JSON_DATA.welcome;
exports.mess_JSON = JSON_DATA.mess;
//exports.antilink_JSON = JSON_DATA.antilink;
//exports.db_user_JSON = JSON_DATA.db_user;
//exports.server_eror_JSON = JSON_DATA.server_eror;
