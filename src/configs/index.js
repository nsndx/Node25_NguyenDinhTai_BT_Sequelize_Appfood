require('dotenv').config()
const config = {
   DB_NAME: process.env.DB_NAME,
   DB_USER: process.env.DB_USER,
   DB_PASS: process.env.DB_PASS,
   DB_HOST: process.env.DB_HOST,
   DB_DIALECT: process.env.DB_DIALECT,
   DB_PORT: process.env.DB_PORT
}

module.exports = config