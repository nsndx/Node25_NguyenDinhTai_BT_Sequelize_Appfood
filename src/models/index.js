const { Sequelize } = require('sequelize')
const config = require('../configs')
const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
   host: config.DB_HOST,
   dialect: config.DB_DIALECT,
   port: config.DB_PORT
})

module.exports = sequelize
