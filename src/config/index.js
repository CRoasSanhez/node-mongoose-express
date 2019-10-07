require('dotenv').config();

const config = {
  env: process.env.ENV,
  db: {
    mysql:{
        host:       process.env.DB_MYSQL_HOST,
        port:       process.env.DB_MYSQL_PORT,
        user:       process.env.DB_MYSQL_USER,
        password:   process.env.DB_MYSQL_PASS,
        database:   process.env.DB_MYSQL_NAME
    },
    mongo:{
        host:       process.env.DB_MONGO_HOST,
        port:       process.env.DB_MONGO_PORT,
        user:       process.env.DB_MONGO_USER,
        password:   process.env.DB_MONGO_PASS,
        database:   process.env.DB_MONGO_NAME
    },
  },
}
module.exports = {
  config
}