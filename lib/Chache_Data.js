import fs from 'fs'
import chalk from 'chalk'
import moment from 'moment'
import path, {
    dirname
} from 'path'
import {
    createRequire
} from 'module';
import {
    fileURLToPath
} from 'url'
const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url))
const time = moment().format('HH:mm:ss DD/MM/YYYY');

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)];
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

function nocache(module, cb = () => {}) {
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module));
        cb(module);
    });
}


const pluginsFolder = path.join(__dirname, '../plugins');
const files = fs.readdirSync(pluginsFolder);

for (const file of files) {
    if (file.endsWith('.js')) {
        const pluginPath = path.join(pluginsFolder, file);
        const plugin = await import(pluginPath);
        nocache(pluginPath, module =>
            console.log(chalk.greenBright('[ Millie MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`))
        );
        //plugin();
    }
}

import '../main.js'
nocache('../main.js', module =>
    console.log(chalk.greenBright('[ Millie MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`))
);

import '../handler.js'
nocache('../handler.js', module =>
    console.log(chalk.greenBright('[ Millie MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`))
);

import './func_Server.js'
nocache('./func_Server.js', module =>
    console.log(chalk.greenBright('[ Millie MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`))
);

export {
    nocache,
    uncache
};