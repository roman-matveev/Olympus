require('dotenv').config();

var mysql = require('mysql');
var faker = require('faker');

var db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: process.env.MYSQL_PW,
    database: 'olympus'
});

var data = [];
for (var i = 0; i < 500; i++) {
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
};

var query = 'insert into users (email, created_at) values ?';
db.query(query, [data], function(err, res) {
    if (err) throw err;
    console.log(res);
});

db.end();
