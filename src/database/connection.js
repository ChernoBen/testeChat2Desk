require('dotenv/config')
var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.HOST,
        port: process.env.PORT,
        user: 'root',
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
});

module.exports = knex