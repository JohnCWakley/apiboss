exports.seed = function (knex) {
    return knex('apis').del()
        .then(function () {
            return knex('apis').insert([
                {
                    accountId: 1,
                    name: 'test'
                }
            ]);
        });
};
