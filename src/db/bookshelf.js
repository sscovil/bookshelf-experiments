'use strict';

const Bookshelf = require('bookshelf');
const knex = require('./knex');

const bookshelf = Bookshelf(knex);

bookshelf.plugin(['registry']);

module.exports = bookshelf;
