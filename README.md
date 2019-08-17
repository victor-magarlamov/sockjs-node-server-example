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
## Additional
### Nginx and PM2

```
upstream sockjs_nodes {
  ip_hash;
  server 127.0.0.1:5001;
  server 127.0.0.1:5002;
  server 127.0.0.1:5003;
  server 127.0.0.1:5004;
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
