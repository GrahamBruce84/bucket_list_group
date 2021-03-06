var express = require('express');
var parser = require('body-parser');
var app = express();
var path = require("path");

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static('client/build'));

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/bucketlist", function(err, database){
  if(err) return console.log(err);
  db = database;
  console.log("Connected to database");
  app.listen(3000, function(){
    console.log("Listening on port 3000");
  });
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/build/index.html');
});

app.post('/listItems', function(req, res){
  db.collection('listItems').find().toArray(function(err, results){
    res.json(results);
  });
})

app.post('/delete', function(req, res){
  db.collection('listItems').remove({});
  res.redirect('/');
});