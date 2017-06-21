'use strict';

const bookshelf = require('../bookshelf');

const GroupMember = bookshelf.model('GroupMember', {
  tableName: 'groups_members',
  hasTimestamps: true,

  group: function() {
    return this.belongsTo('Group', 'group_id');
  }
}, {
  STATUS: {
    INVITED: 'invited',
    JOINED: 'joined',
    LEFT: 'left'
  },
  TYPE: {
    UUID: 'uuid',
    EMAIL: 'email',
    PHONE: 'phone'
  }
});

module.exports = GroupMember;
