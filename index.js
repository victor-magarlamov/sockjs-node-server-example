const http = require('http');
const redis = require('redis');
const sockjs = require('sockjs');
const Message = require('./message');

const server = http.createServer();
const redisClient = redis.createClient();
const echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });

const connections = {};

echo.on('connection', function(conn) {
  conn.on('data', function(mes) {
    const message = new Message(mes);

    if (message.isInfoType()) {
      conn.userId = message.userId;
      connections[conn.userId] = conn;
    }
  });
  
  conn.on('close', function() {
    delete connections[conn.userId];
  });
});

redisClient.on('message', function(channel, mes) {
  try {
    const message = new Message(mes);
    const conn = connections[message.userId];
    
    if (conn) {
      conn.write(mes);
    }
  } catch (er) {
    console.log(er);
  }
});

redisClient.subscribe('recent_challenge');
echo.installHandlers(server, {prefix: '/echo'});
server.listen(5001);
