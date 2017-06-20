'use strict';

const _ = require('lodash');
const expect = require('chai').expect;
const Group = require('../../src/db/models/group');
const GroupMember = require('../../src/db/models/group-member');
const Promise = require('bluebird');
const uuid = require('node-uuid');

const GROUPS_PER_TEST = 2;
const MEMBERS_PER_GROUP = 2;
const MEMBERS_PER_TEST = GROUPS_PER_TEST * MEMBERS_PER_GROUP;

describe('Group', function() {
  let groups;
  let groupIds;
  let members;
  let memberIds;
  let memberValues;

  const createGroups = () => {
    groups = new Array(GROUPS_PER_TEST);

    return Promise.map(groups, (value, index) => {
      return new Group()
        .save({ name: uuid.v4() })
        .then(group => groups[index] = group);
    });
  };

  const createMembers = () => {
    let index = 0;
    members = new Array(MEMBERS_PER_TEST);
    memberValues = _.map(new Array(MEMBERS_PER_GROUP), () => uuid.v4());

    return Promise.map(groups, group => Promise.map(memberValues, value => {
      return new GroupMember()
        .save({
          group_id: group.get('id'),
          value: value,
          type: GroupMember.TYPE.UUID,
          status: GroupMember.STATUS.JOINED
        })
        .then(member => members[index++] = member);
    }));
  };

  beforeEach(function() {
    return Promise.resolve()
      .then(createGroups)
      .then(createMembers)
      .then(() => groupIds = _.invokeMap(groups, 'get', 'id'))
      .then(() => memberIds = _.invokeMap(members, 'get', 'id'))
      .catch(err => console.log(err));
  });

  afterEach(function() {
    return Promise.resolve()
      .then(() => Promise.map(members, member => member.destroy()))
      .then(() => Promise.map(groups, group => group.destroy()))
      .catch(err => console.log(err));
  });

  describe('before all test specs', function() {
    it('test groups are created and cached', function() {
      expect(groups).to.have.lengthOf(GROUPS_PER_TEST);
    });

    it('test groupIds are mapped to an array and cached', function() {
      expect(groups).to.have.lengthOf(GROUPS_PER_TEST);
    });

    it('all test group id attributes appear in groupIds', function() {
      expect(groupIds).to.eql(_.invokeMap(groups, 'get', 'id'));
    });

    it('test members are created and cached', function() {
      expect(memberIds).to.have.lengthOf(MEMBERS_PER_TEST);
    });

    it('test memberIds are mapped to an array and cached', function() {
      expect(memberIds).to.have.lengthOf(MEMBERS_PER_TEST);
    });

    it('all test member id attributes appear in memberIds', function() {
      expect(memberIds).to.eql(_.invokeMap(members, 'get', 'id'));
    });

    it('each test group has members', function() {
      let uniqueGroupIds = _.chain(members)
        .invokeMap('get', 'group_id')
        .uniq()
        .value();
      expect(groupIds).to.eql(uniqueGroupIds);
    });

    it('each test group has the correct number of members', function() {
      const eachGroupHasCorrectMemberCount = _.chain(members)
        .invokeMap('get', 'group_id')
        .countBy()
        .values()
        .every(count => count === MEMBERS_PER_GROUP)
        .value();
      expect(eachGroupHasCorrectMemberCount).to.equal(true);
    });
  });

  describe('generated SQL', function() {
    let member;
    let results;

    beforeEach(function() {
      member = _.sample(members);

      return Group
        .getAllWithMember(member)
        .then(_results => results = _results);
    });

    it('fetches all groups with a specific member', function() {
      results.forEach(result => {
        expect(result.related('members').toJSON()).to.be.an('array').with.lengthOf(MEMBERS_PER_GROUP);
        expect(result.related('members').pluck('value')).to.include(member.get('value'));
      });
    });
  });
});
