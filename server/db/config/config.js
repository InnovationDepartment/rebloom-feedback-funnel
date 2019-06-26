require('dotenv').config()
const Sequelize = require('sequelize')

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: null,
    database: 'rb_review_funnel',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false,
    operatorsAliases: Sequelize.Op,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'rb_review_funnel',
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres',
    logging: false,
    operatorsAliases: Sequelize.Op,
  },
  staging: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'rb_review_funnel',
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres',
    logging: false,
    operatorsAliases: Sequelize.Op,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'rb_review_funnel',
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres',
    logging: false,
    operatorsAliases: Sequelize.Op,
  },
}
