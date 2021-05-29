exports.up = function (knex) {
    return knex.schema.createTable('apis', table => {
        table.increments('id').primary();
        table.timestamps(false, true);
        table.integer('accountId').references('accounts.id');
        table.string('name').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('apis');
};
