
exports.up = function(knex) {
    return knex.schema.createTable('users',function(table){
        table.increments("id")
        table.text("name")
        table.string("email",100).unique()
        table.text("password")
        table.string("birth")
        table.string("documento").unique()
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
