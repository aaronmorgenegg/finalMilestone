var express = require('express');
var ejs = require('ejs');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

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


var service = {
  insertToDatabase: function(username, finalScore){
    console.log(username+finalScore);
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
    })
  }
};

app.post('/highscores', function(req, res, next){
   // req.body object has your form values
   console.log(req.body.name);
   console.log(req.body.score);
});

app.get('/', function(req, res){
  //TODO: could order and show the top 10 scores, descending

  //connects to the database, pulls out the users table, passes it to the index page and renders it

	connection.query('SELECT * FROM users', function(err, rows, fields){
			if(!err){
				console.log('Pulling from database... The result is ', rows);
				rows.sort(function(a, b){return b.score-a.score});
        res.render('index.ejs', {
              users: rows,
              service: service
        });
			}else{
				console.log('Pulling from database... No results. Defaulting to test example table.');
				var users = [
          { name: 'test1', score: 1},
          { name: 'test2', score: 2},
          { name: 'test3', score: 3}
        ];
				res.render('index.ejs', {
              users: users
        });
			}
	});

  //TODO:need to get name and score data from the website in order to insert it into the database
  //var username=localStorage.getItem("name");
  //var finalScore=localStorage.getItem("score");
  /*var username = "test";
  var finalScore = 900;

  console.log(username+finalScore);
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
  */
});

app.listen(process.env.PORT, process.env.IP);
