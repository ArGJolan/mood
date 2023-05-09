exports.up = function(knex) {
  return knex.schema.table('mood_entries', (table) => {
    table.text('entry_comment');
    table.text('health_comment');
    table.text('work_comment');
    table.text('romantic_relationship_comment');
    table.text('family_relationships_comment');
    table.text('friends_comment');
    table.text('physical_wellness_comment');
  });
};

exports.down = function(knex) {
  return knex.schema.table('mood_entries', (table) => {
    table.dropColumn('entry_comment');
    table.dropColumn('health_comment');
    table.dropColumn('work_comment');
    table.dropColumn('romantic_relationship_comment');
    table.dropColumn('family_relationships_comment');
    table.dropColumn('friends_comment');
    table.dropColumn('physical_wellness_comment');
  });
};
