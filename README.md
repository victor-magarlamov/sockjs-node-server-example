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
1. Execute **npm run start** in the root directory to start the SockJs server.
2. Go to the example directory and execute **npm start** to start the React client application.
3. Send from redis-cli a message to the "recent_challenge" channel. For example:
```javascript
publish recent_challenge "{\"userId\":1,\"text\":\"Catch me\"}"
```
