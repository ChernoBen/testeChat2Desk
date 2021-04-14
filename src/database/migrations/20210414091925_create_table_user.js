
exports.up = function(knex) {
    return knex.schema.createTable('users',function(table){
        table.increments("id")
        table.text("name")
        table.text("email").unique()
        table.text("password")
        table.text("birth")
        table.text("documento").unique()
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
