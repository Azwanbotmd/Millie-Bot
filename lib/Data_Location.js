import fs from 'fs'
const JSON_DATA = {
    setting: JSON.parse(fs.readFileSync('./config.json')),
    mess: JSON.parse(fs.readFileSync('./lib/message.json')),
}

export let setting_JSON = JSON_DATA.setting;
export let mess_JSON = JSON_DATA.mess;