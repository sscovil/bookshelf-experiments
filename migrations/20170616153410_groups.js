'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('groups', table => {
      table.increments('id');
      table.string('name');
      table.timestamps(/*useTimestamps=*/true, /*defaultToNow=*/true);
      table.timestamp('deleted_at');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('groups')
  ]);
};
