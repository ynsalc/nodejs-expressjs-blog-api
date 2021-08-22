const timestamp = Date.now();
exports.up = function (knex) {
  return knex.schema
    .createTable("category", (table) => {
      table.increments();
      table.string("category_name").notNullable();
    })
    .createTable("user", (table) => {
      table.increments();
      table.string("username").notNullable();
      table.string("password").notNullable();
    })
    .createTable("post", (table) => {
      table.increments();
      table.string("title").notNullable();
      table.string("content").notNullable();
      table.date("created_at").defaultTo(knex.fn.now());
      table.integer("category_id").unsigned();
      table.integer("user_id").unsigned();
      table.string("image").notNullable();
      table
        .foreign("category_id")
        .references("category.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("user_id")
        .references("user.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("category")
    .dropTableIfExists("user")
    .dropTableIfExists("post");
};
