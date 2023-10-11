import fs from 'fs';
const userdataPath = 'database/userdata';
const groupPath = 'database/group';

if (!fs.existsSync('database')) {
    fs.mkdirSync('database');
}

if (!fs.existsSync('tmp')) {
    fs.mkdirSync('tmp');
}

if (!fs.existsSync(userdataPath)) {
    fs.mkdirSync(userdataPath);
}

if (!fs.existsSync(groupPath)) {
    fs.mkdirSync(groupPath);
}