require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME + "_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306
  },
  production: {
    use_env_variable: 'JAWSDB_URL',
    dialect: 'mysql'
  }
};
