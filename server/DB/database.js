const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce-angular"
})
conn.connect((error) => {
    if (error) console.log(error);
    else console.log('Data base connected')

});

module.exports = conn;