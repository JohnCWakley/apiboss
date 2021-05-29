exports.up = function (knex) {
    return knex.schema.createTable('records', table => {
        table.increments('id').primary();
        table.timestamps(false, true);
        table.integer('tableId').references('tables.id');
        table.text('data').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('records');
};
