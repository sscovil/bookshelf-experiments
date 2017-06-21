'use strict';

const bookshelf = require('../bookshelf');

const Group = bookshelf.model('Group', {
  tableName: 'groups',
  hasTimestamps: true,

  members: function() {
    return this.hasMany('GroupMember', 'group_id');
  }
}, {
  getAllWithMember(member) {
    const groupIds = bookshelf.model('GroupMember')
      .query()
      .select('group_id')
      .where('type', member.get('type'))
      .where('value', member.get('value'))
      .where('type', member.get('status'));

    return Group
      .where('id', 'IN', groupIds)
      .fetchAll({ withRelated: ['members'] });
  }
});

module.exports = Group;
