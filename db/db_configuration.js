const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    host:"localhost",
    port: 5432
})  

module.exports = pool