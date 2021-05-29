exports.up = function (knex) {
    return knex.schema.createTable('tables', table => {
        table.increments('id').primary();
        table.timestamps(false, true);
        table.integer('apiId').references('apis.id');
        table.string('name').notNullable();
        table.string('fieldNames').notNullable().defaultTo('');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tables');
};
