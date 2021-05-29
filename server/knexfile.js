module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './development.sqlite3'
        },
        useNullAsDefault: true
    },
    staging: {
        client: 'sqlite3',
        connection: {
            filename: './staging.sqlite3'
        },
        useNullAsDefault: true
    },
    production: {
        client: 'sqlite3',
        connection: {
            filename: './production.sqlite3'
        },
        useNullAsDefault: true
    }
};