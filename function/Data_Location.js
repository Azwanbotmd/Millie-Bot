const fs = require('fs')
JSON_DATA = {
setting: JSON.parse(fs.readFileSync('./config.json')),
mess: JSON.parse(fs.readFileSync('./function/message.json')),
}

exports.setting_JSON = JSON_DATA.setting;
exports.mess_JSON = JSON_DATA.mess;
