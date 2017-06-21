'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('groups_members', table => {
      table.increments('id');
      table.integer('group_id').references('groups.id');
      table.enu('type', ['uuid', 'email', 'phone']);
      table.string('value');
      table.enu('status', ['invited', 'joined', 'left']);
      table.timestamps(/*useTimestamps=*/true, /*defaultToNow=*/true);
      table.unique(['group_id', 'type', 'value']);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('groups_members')
  ]);
};
