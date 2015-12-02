var app = require('express')();
var socketio = require('socket.io');
var r = require('rethinkdb');

app.get('/*', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var io = socketio.listen(app.listen(3000));

io.sockets.on('connection', function(socket) {
  // When a client first connects, send all existing messsages to the client
  r.connect({db: 'rethinkdb_chat'})
  .then((conn)   => r.table('messages').orderBy('timestamp').run(conn).finally(() => conn.close()))
  .then((cursor) => cursor.toArray())
  .then((result) => socket.emit('load messages', result));
});
