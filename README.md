# bookshelf-experiments
Experiments with Bookshelf.js

## Getting Started

From the command line, install project dependencies using `npm` or `yarn`:

```bash
$ npm install
```

_or_

```bash
$ yarn
```

## Configuration

The following environment variables can be used to establish a database connection:

* `PGHOST` (default value: `127.0.0.1`)
* `PGPORT` (default value: `5432`)
* `PGDATABASE`
* `PGUSER`
* `PGPASSWORD`

## Database Migrations

First, be sure to install `knex` globally using `npm` or `yarn`:

```bash
$ npm install -g knex
```

_or_

```bash
$ yarn global add knex
```

With PostgreSQL running, set up the database schema using:

```bash
$ PGDATABASE=my_db_name knex migrate:latest
```

To rollback migrations, use:

```bash
$ PGDATABASE=my_db_name knex migrate:rollback
```

## Testing

Run tests using `mocha` or the `npm` script:

```bash
$ PGDATABASE=my_db_name mocha --recursive
```

_or_

```bash
$ PGDATABASE=my_db_name npm test
```

_or_

```bash
$ PGDATABASE=my_db_name yarn test
```
