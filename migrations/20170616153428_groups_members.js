'use strict';

const _ = require('lodash');
const GroupMember = require('../src/db/models/group-member');

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable(GroupMember.TABLE_NAME, table => {
      table.increments('id');
      table.integer('group_id').references('groups.id');
      table.enu('type', _.values(GroupMember.TYPE));
      table.string('value');
      table.enu('status', _.values(GroupMember.STATUS));
      table.timestamps(/*useTimestamps=*/true, /*defaultToNow=*/true);
      table.unique(['group_id', 'type', 'value']);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable(GroupMember.TABLE_NAME)
  ]);
};
