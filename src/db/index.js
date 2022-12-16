const mysql = require('mysql2'),
db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DATABASE,
    password: process.env.DB_PASS
})
.promise()
module.exports = db