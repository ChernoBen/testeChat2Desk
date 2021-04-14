
exports.up = function(knex) {
    return knex.schema.createTable('passwordToken',function(table){
        table.increments("id").primary()
        table.text("token")
        table.integer("user_id").unsigned().references("id").inTable("users")
        table.integer("used").defaultTo(0)
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable("passwordToken")
};
