// Update with your config settings.
require('dotenv/config')
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host : process.env.HOST,
      port:process.env.PORT,
      user : 'root',
      password : process.env.PASSWORD,
      database : process.env.DATABASE
    },
    migrations:{
      tableName:'knex_migrations',
      directory:`${__dirname}/src/database/migrations`
    }
  }
};
