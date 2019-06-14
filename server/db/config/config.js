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
    username: 'PLACEHOLDER',
    password: 'PLACEHOLDER',
    database: 'PLACEHOLDER',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false,
    operatorsAliases: Sequelize.Op,
  },
  staging: {
    username: 'PLACEHOLDER',
    password: 'PLACEHOLDER',
    database: 'PLACEHOLDER',
    host: 'PLACEHOLDER',
    port: 5432,
    dialect: 'postgres',
    logging: false,
    operatorsAliases: Sequelize.Op,
  },
  production: {
    username: 'PLACEHOLDER',
    password: 'PLACEHOLDER',
    database: 'PLACEHOLDER',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false,
    operatorsAliases: Sequelize.Op,
  },
}
