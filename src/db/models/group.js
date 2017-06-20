'use strict';

const _ = require('lodash');
const bookshelf = require('../bookshelf');

const TABLE_NAME = 'groups';

const Group = bookshelf.model('Group', {
  tableName: TABLE_NAME,
  hasTimestamps: true,

  members: function() {
    return this.hasMany('GroupMember');
  }
}, {
  TABLE_NAME,

  getAllWithMember(member) {
    const GroupMember = Group.GroupMember();
    const attrs = _.mapKeys(member.pick('type', 'value', 'status'), (value, key) => `${GroupMember.TABLE_NAME}.${key}`);

    return Group
      .collection()
      .query(function(qb) {
        qb.leftJoin(GroupMember.TABLE_NAME, `${Group.TABLE_NAME}.id`, `${GroupMember.TABLE_NAME}.${GroupMember.FK_GROUP}`);
        qb.where(attrs);
      })
      .fetch({ withRelated: ['members'], require: true });
  },

  GroupMember: () => bookshelf.model('GroupMember')
});

module.exports = Group;
