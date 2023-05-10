module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: process.env.PG_PASSWORD,
      database: 'postgres',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};
