const fs = require('fs');
const path = require('path');

const databaseFolder = path.join(__dirname, '../database');
const filesToCheck = ['pengguna.json', 'banned.json', 'limit.json'];

function checkDatabaseFiles() {
  if (!fs.existsSync(databaseFolder)) {
    fs.mkdirSync(databaseFolder);
  }

  filesToCheck.forEach((file) => {
    const filePath = path.join(databaseFolder, file);
    if (!fs.existsSync(filePath)) {
      const emptyArray = JSON.stringify([]);
      fs.writeFileSync(filePath, emptyArray);
    }
  });
}

checkDatabaseFiles();