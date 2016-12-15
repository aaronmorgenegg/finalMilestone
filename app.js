var express = require('express');
var ejs = require('ejs');
var path = require('path');
var mysql = require('mysql');

var dbHost = process.env.IP || 'localhost',
  dbUser = process.env.C9_USER || 'root';

var connection = mysql.createConnection({
  host : dbHost,
  user : dbUser,
  password : '',
  database : 'highscores'
});

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");

app.use(express.static(__dirname + "/../public"));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  //need to get current list of names and scores from the database, pass that into the website in order to show the high scores
  var usernames = [
        { name: 'test1' },
        { name: 'test2' },
        { name: 'test3' }
    ];
  var finalScores = [
        { score: 1 },
        { score: 2 },
        { score: 3 }
    ];
  res.render('index.ejs', {
        usernames: usernames,
        finalScores: finalScores
    });
  //need to get name and score data from the website in order to insert it into the database
  var setFlds = {
    name: username,
    score: finalScore
  };

  var sql = 'insert into `users` set ?';

  connection.query(sql, [setFlds], function(err,result){
    //error handling
    if (err) {
      console.error('Error inserting' + err.stack);
    }
    else {
      console.log("Success");
    }
  });
});

app.listen(process.env.PORT, process.env.IP);
