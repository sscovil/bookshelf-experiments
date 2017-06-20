'use strict';

const _ = require('lodash');
const config = require('./src/db/config');

module.exports = _.defaultsDeep({
  /* Add any Knex migration-specific configs here (e.g. migration, seeds) -- see http://knexjs.org/#Migrations */
}, config);
