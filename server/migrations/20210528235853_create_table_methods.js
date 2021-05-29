const Constants = require('../src/constants.js');

exports.up = function (knex) {
    return knex.schema.createTable('methods', table => {
        table.increments('id').primary();
        table.timestamps(false, true);
        table.integer('apiId').references('apis.id');
        table.string('name').notNullable();
        table.integer('responseType').defaultTo(Constants.METHOD_RESPONSE_TYPE.RAW_TEXT);
        table.text('response');
        table.text('postData');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('methods');
};
