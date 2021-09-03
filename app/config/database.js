const mysql = require('mysql2/promise');


const connection = mysql.createConnection({
    host: "localhost",
    user: "antarra",
    password: "P@ssw0rd",
    database: "expess_mysql"
}).catch(()=>{
    console.log('database not connect');
})

module.exports = connection;