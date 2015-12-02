var app = require('express')();
var socketio = require('socket.io');
var r = require('rethinkdb');

app.get('/*', function(req, res){
  res.sendFile(__dirname + '/index.html');
});