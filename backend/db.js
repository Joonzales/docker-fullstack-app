const mysql = require('mysql2');
const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'mysql',
	user: 'root',
	password: 'test',
	database: 'myapp',
	port: 3306,
});
exports.pool = pool;