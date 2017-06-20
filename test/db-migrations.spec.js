'use strict';

const knex = require('../src/db/knex');

before(function() {
  return knex.migrate.latest().catch(err => console.log(err));
});
