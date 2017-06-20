'use strict';

const Group = require('../src/db/models/group');

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable(Group.TABLE_NAME, table => {
      table.increments('id');
      table.string('name');
      table.timestamps(/*useTimestamps=*/true, /*defaultToNow=*/true);
      table.timestamp('deleted_at');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable(Group.TABLE_NAME)
  ]);
};
