const Constants = require('../src/constants.js');

exports.up = function (knex) {
    return knex.schema.createTable('accounts', table => {
        table.increments('id').primary();
        table.timestamps(false, true);
        table.string('email').unique().notNullable();
        table.string('hash').notNullable();
        table.string('salt').notNullable();
        table.integer('status').defaultTo(Constants.ACCOUNT_STATUS.ACTIVE);
        table.integer('role').defaultTo(Constants.ACCOUNT_ROLE.USER);
        table.integer('subscription').defaultTo(Constants.ACCOUNT_SUBSCRIPTION.FREE);
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('primaryPhoneNumber').notNullable();
        table.string('secondaryPhoneNumber').notNullable();
        table.string('address1').notNullable();
        table.string('address2');
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('postalCode').notNullable();
        table.string('route').unique().notNullable();
        table.uuid('resetToken');
        table.bigInteger('resetTokenExpires');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('accounts');
};
