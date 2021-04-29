const knexfile = require("../../knexfile");
const knex = require("knex")(knexfile.development)
require('dotenv/config')

knex.schema.raw(process.env.DATABASE)
module.exports = knex