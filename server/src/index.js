const { resolve } = require('path');
const ArgsParser = require('./utils/args-parser.js');
const LoadJson = require('./utils/load-json.js');
const StartServer = require('./server.js');

const env = process.env.NODE_ENV || 'production';
console.log(`*** ${env} ***`);

const args = ArgsParser(process.argv.slice(2));

const config_path = resolve(process.cwd(), (args.config || './config.json'));
console.log('config_path:', config_path);

const db_path = resolve(process.cwd(), (args.database || args.db || `./${env}.sqlite3`));
console.log('db_path:', db_path);

LoadJson(config_path).then((config) => StartServer({ ...config, db_path }));
