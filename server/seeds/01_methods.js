const Constants = require('../src/constants.js');

exports.seed = function (knex) {
    return knex('methods').del()
        .then(function () {
            return knex('methods').insert([
                {
                    apiId: 1,
                    name: 'test',
                    responseType: Constants.METHOD_RESPONSE_TYPE.JSON,
                    response: JSON.stringify({ testResponse: 'data' })
                }
            ]);
        });
};
