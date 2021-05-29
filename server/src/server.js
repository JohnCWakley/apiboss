const Knex = require('knex');
const Logger = require('./utils/logger.js');

module.exports = async function StartServer(config) {
    const log = new Logger('server');
    log.info('initializing...');
    log.debug(config);

    const db = Knex({
        client: 'sqlite3',
        connection: {
            filename: config.db_path
        },
        useNullAsDefault: true
    });
}
