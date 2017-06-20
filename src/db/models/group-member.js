'use strict';

const bookshelf = require('../bookshelf');

const TABLE_NAME = 'groups_members';
const FK_GROUP = 'group_id';

const GroupMember = bookshelf.model('GroupMember', {
  tableName: TABLE_NAME,
  hasTimestamps: true,

  group: function() {
    return this.belongsTo('Group', FK_GROUP).query({ where: { deleted_at: null } });
  }
}, {
  FK_GROUP,
  STATUS: {
    INVITED: 'invited',
    JOINED: 'joined',
    LEFT: 'left'
  },
  TABLE_NAME,
  TYPE: {
    UUID: 'uuid',
    EMAIL: 'email',
    PHONE: 'phone'
  }
});

module.exports = GroupMember;
