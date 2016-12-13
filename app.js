var express = require('express');
var ejs = require('ejs');
var path = require('path');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");

app.use(express.static(__dirname + "/../public"));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.listen(3000, function(){
  console.log("The server is running on localhost:3000")
})
