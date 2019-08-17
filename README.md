## Simple SockJs server with Node.js and Redis

This is an example of how to create a SockJs server using Node.js and Redis. 

The message is sent form the server application to the Redis channel. SockJs server listens to the Redis channel. It gets the message and send one to the client connection. Pretty easy)

Message format:
```javascript
{
  userId: number
  text: string
  type: "info" | "message"
}
```
The "type" property is a message type. When sending the first message from the client to the server in the field "type" should be "info". 

### How to see it in action
1. Execute **npm start** in the root directory to start the SockJs server.
2. Go to the example directory and execute **npm start** to start the React client application.
3. Send a message from redis-cli to the "recent_challenge" channel. For example:
```javascript
publish recent_challenge "{\"userId\":1,\"text\":\"Catch me\"}"
```
## A few words about pm2

[pm2](https://github.com/Unitech/pm2) is a great solution to run Node.js application in production. You can start your sockjs server in many processes with pm2. This allows your application to be ready for high loads.

Let's imagine that we have three scripts ('app1.js', 'app2.js', 'app3.js'), that run sockjs server on ports 5001, 5002, 5003.

Example pm2 config:

```js
  var pm2 = require('pm2');
  pm2.connect(function() {
    pm2.start({
      script: 'app1.js', // Script to be run 
      exec_mode: 'fork', // Allow your app to be clustered 
      max_memory_restart : '300M' // Optional: Restart your app if it reaches 300Mo 
    }, function(err, apps) {
      pm2.disconnect();
    });
    
    pm2.start({
      script: 'app2.js', // Script to be run 
      exec_mode: 'fork', // Allow your app to be clustered 
      max_memory_restart : '300M' // Optional: Restart your app if it reaches 300Mo 
    }, function(err, apps) {
      pm2.disconnect();
    });
    
    pm2.start({
      script: 'app3.js', // Script to be run 
      exec_mode: 'fork', // Allow your app to be clustered 
      max_memory_restart : '300M' // Optional: Restart your app if it reaches 300Mo 
    }, function(err, apps) {
      pm2.disconnect();
    });
  });
```

Example nginx proxy settings:

```
upstream sockjs_nodes {
  ip_hash;
  server 127.0.0.1:5001;
  server 127.0.0.1:5002;
  server 127.0.0.1:5003;
}

server {
  ...
  location /echo {
    proxy_pass http://sockjs_nodes/echo;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
  }
}
```
