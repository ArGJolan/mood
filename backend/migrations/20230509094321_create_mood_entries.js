/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('mood_entries', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id');
    table.date('entry_date').notNullable();
    table.integer('health').unsigned();
    table.integer('work').unsigned();
    table.integer('romantic_relationship').unsigned();
    table.integer('family_relationships').unsigned();
    table.integer('friends').unsigned();
    table.integer('physical_wellness').unsigned();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('mood_entries');
};
