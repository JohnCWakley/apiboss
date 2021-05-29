const express = require('express');
const { createServer } = require('http');
const { resolve } = require('path');
const nodemailer = require('nodemailer');
const Knex = require('knex');
const Logger = require('./utils/logger.js');
const LiveHandler = require('./live-handler.js');

module.exports = async function StartServer(config) {
    const log = new Logger('server');
    log.info('initializing...');
    log.debug(config);

    // initialize nodemailer:
    if (config.email.auth.user == null || config.email.auth.pass == null) {
        log.debug('initializing test account with smtp.ethereal.email');

        const { user, pass } = await nodemailer.createTestAccount();

        config.email.auth = { user, pass };
        config.email.host = "smtp.ethereal.email";
        config.email.port = 587;
        config.email.secure = false;
    }

    const transport = nodemailer.createTransport(config.email);

    // initialize database:
    const db = Knex({
        client: 'sqlite3',
        connection: {
            filename: config.db_path
        },
        useNullAsDefault: true
    });

    // initialize web-server:
    const app = express();

    if (app.get('env') == 'production') {
        app.set('set proxy', 1);
    }

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use((req, res, next) => {
        log.debug(req.method, req.path);

        // res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        // res.setHeader('Expires', '-1');
        // res.setHeader('Pragma', 'no-cache');

        next();
    });

    config.static_paths.forEach((static_path) => {
        log.debug('static_path:', static_path.route, '->', resolve(process.cwd(), static_path.path));
        app.use(static_path.route, express.static(resolve(process.cwd(), static_path.path)));
    });

    app.use('/live', LiveHandler(db));

    const server = createServer(app);
    server.on('listening', () => log.info(`listening on ${config.host}:${config.port}`));
    server.listen(config.port, config.host);
}