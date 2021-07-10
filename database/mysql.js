
const mysql = require('mysql');

// const con = mysql.createConnection({
//   "host": "s465z7sj4pwhp7fn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//   "username": "q9orw0jjz246ktam",
//   "password": "l2g6o3z26kab4mrj",
//   "database": "z1f3evworhiachgw",
//   "port": "3306"
// });

const pool = mysql.createPool("mysql://q9orw0jjz246ktam:l2g6o3z26kab4mrj@s465z7sj4pwhp7fn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/z1f3evworhiachgw");


pool.getConnection((err, connection) => {
    if (err) {
        if (err.code == "ETIMEDOUT") console.log("Timeout Error");
    };
    console.log("Database connected.");
})


module.exports = pool;