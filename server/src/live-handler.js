const Router = require('express').Router;
// var vm = require('vm')
const Logger = require('./utils/logger.js');
const Constants = require('./constants.js');

const TIMEOUT_TEST_TIMEOUT = 120000;

const log = new Logger('api-handler');

module.exports = function LiveHandler(db) {
    return Router()

        .get('/timeoutTest', (req, res) => setTimeout(() => {
            res.setHeader('Content-Type', 'application/json');
            res.send({ "timeoutTestSuccess": true });
        }, TIMEOUT_TEST_TIMEOUT))

        .post('/timeoutTest', (req, res) => setTimeout(() => {
            res.setHeader('Content-Type', 'application/json');
            res.send({ "timeoutTestSuccess": true });
        }, TIMEOUT_TEST_TIMEOUT))

        .get('/:_route/:_api/:_method', async (req, res) => {
            const { _route, _api, _method } = req.params;

            if (_route && _api && _method) {
                const account = await db('accounts').where('route', _route).first().catch((err) => { throw err; });
                log.debug(`/${_route}/${_api}/${_method}: account:`, account);

                if (account) {
                    const api = await db('apis').where('accountId', account.id).first().catch((err) => { throw err; });
                    log.debug(`/${_route}/${_api}/${_method}: api:`, api);

                    if (api) {
                        const method = await db('methods').where('apiId', api.id).first().catch((err) => { throw err; });
                        log.debug(`/${_route}/${_api}/${_method}: method:`, method);

                        if (method) {
                            try {
                                switch (method.responseType) {
                                    case Constants.METHOD_RESPONSE_TYPE.JSON:
                                        res.setHeader('Content-Type', 'application/json');

                                        try {
                                            const response = JSON.parse(method.response.trim());
                                            res.json(response);
                                        } catch (e) {
                                            res.json({ error: 'malformed JSON in response data' });
                                        }

                                        break;
                                    // case Constants.METHOD_RESPONSE_TYPE.SCRIPT:
                                    //     app.services.Storage.models.ApiTable.findAll({
                                    //         where: {
                                    //             ApiId: api.id
                                    //         },
                                    //         include: [app.services.Storage.models.Record]
                                    //     }).then(tables => {
                                    //         var db = {}

                                    //         tables.forEach(table => {
                                    //             db[table.name] = []

                                    //             table.Records.forEach(record => {
                                    //                 db[table.name].push(JSON.parse(record.data))
                                    //             })
                                    //         })

                                    //         res.setHeader('Content-Type', 'application/json')

                                    //         const logic = new vm.Script(method.response.trim())

                                    //         response = {
                                    //             req: req.query,
                                    //             db: db
                                    //         }

                                    //         log.debug("response:", response)

                                    //         try {
                                    //             logic.runInNewContext(response)

                                    //             response.req = undefined
                                    //             response.db = undefined

                                    //             if (response.success === undefined) {
                                    //                 response.success = true
                                    //             }
                                    //         } catch (error) {
                                    //             log.debug(error)
                                    //             response = JSON.stringify({
                                    //                 success: false,
                                    //                 error: error.message
                                    //             })
                                    //         }

                                    //         res.send(response)
                                    //     })
                                    //     break
                                    default:
                                        res.setHeader('Content-Type', 'application/text');
                                        res.send(method.response.trim());
                                        break;
                                }
                            } catch (error) {
                                log.debug(error);
                                res.json({ error: error.message });
                            }
                        } else {
                            res.json({ error: 'unknown method' });
                        }
                    } else {
                        res.json({ error: 'unknown api' });
                    }
                } else {
                    res.json({ error: 'unknown route' });
                }
            } else {
                res.json({ error: 'incomplete url path' });
            }
        })

        .post('/:_route/:_api/:_method', async (req, res) => {
            const { _route, _api, _method } = req.params;
            
            const postData = req.body;
            log.debug(`/${_route}/${_api}/${_method}: postData:`, postData);

            if (_route && _api && _method) {
                const account = await db('accounts').where('route', _route).first().catch((err) => { throw err; });
                log.debug(`/${_route}/${_api}/${_method}: account:`, account);

                if (account) {
                    const api = await db('apis').where('accountId', account.id).first().catch((err) => { throw err; });
                    log.debug(`/${_route}/${_api}/${_method}: api:`, api);

                    if (api) {
                        const method = await db('methods').where('apiId', api.id).first().catch((err) => { throw err; });
                        log.debug(`/${_route}/${_api}/${_method}: method:`, method);

                        if (method) {
                            try {
                                var response

                                switch (method.responseType) {
                                    case Constants.METHOD_RESPONSE_TYPE.JSON:
                                        res.setHeader('Content-Type', 'application/json')
                                        try {
                                            response = JSON.parse(method.response.trim())
                                            res.send(response)
                                        } catch (e) {
                                            response = {
                                                success: false,
                                                message: "Malformed JSON"
                                            }
                                        }
                                        break
                                    // case Constants.METHOD_RESPONSE_TYPE.SCRIPT:
                                    //     app.services.Storage.models.ApiTable.findAll({
                                    //         where: {
                                    //             ApiId: api.id
                                    //         },
                                    //         include: [app.services.Storage.models.Record]
                                    //     }).then(tables => {
                                    //         var db = {}

                                    //         tables.forEach(table => {
                                    //             db[table.name] = []

                                    //             table.Records.forEach(record => {
                                    //                 db[table.name].push(JSON.parse(record.data))
                                    //             })
                                    //         })

                                    //         res.setHeader('Content-Type', 'application/json')

                                    //         const logic = new vm.Script(method.response.trim())

                                    //         response = {
                                    //             req: req.body,
                                    //             db: db
                                    //         }

                                    //         log.debug("response:", response)

                                    //         try {
                                    //             logic.runInNewContext(response)

                                    //             response.req = undefined
                                    //             response.db = undefined

                                    //             if (response.success === undefined) {
                                    //                 response.success = true
                                    //             }
                                    //         } catch (error) {
                                    //             log.debug(error)
                                    //             response = JSON.stringify({
                                    //                 success: false,
                                    //                 error: error.message
                                    //             })
                                    //         }

                                    //         res.send(response)
                                    //     })
                                    //     break
                                    default:
                                        res.setHeader('Content-Type', 'application/text');
                                        res.send(method.response.trim());
                                        break;
                                }
                            } catch (error) {
                                log.debug(error);
                                res.json({ error: error.message });
                            }
                        } else {
                            res.json({ error: 'unknown method' });
                        }
                    } else {
                        res.json({ error: 'unknown api' });
                    }
                } else {
                    res.json({ error: 'unknown route' });
                }
            } else {
                res.json({ error: 'incomplete url path' });
            }
        });
}