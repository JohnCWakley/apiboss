const Router = require('express').Router;
// var vm = require('vm')
const Logger = require('./utils/logger.js');
const Constants = require('./constants.js');

const TIMEOUT_TEST_TIMEOUT = 120000;

const log = new Logger('api-handler');

module.exports = function ApiHandler(db) {
    return Router()

        .post('/sign-in', (req, res) => {
            const { email, password } = req.body;
            log.debug(`/login:`, email, password);

            res.json({ email, password });
        });
}