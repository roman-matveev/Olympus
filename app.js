require('dotenv').config();

var express    = require('express');
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var app        = express();

var db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: process.env.MYSQL_PW,
    database: 'olympus'
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    db.query('select count(*) as count from users', function(err, users) {
        if (err) throw err;
        var count = users[0].count;
        res.render('index', {count: count});
    });
});

app.post('/subscribe', function(req, res) {
    var subscriber = {email: req.body.email};
    db.query('insert into users set ?', subscriber, function(err, sub) {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(process.env.PORT, function() {
    console.log("Connecting to server...");
});
