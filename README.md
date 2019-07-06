## Simple SockJs server with Node and Redis

This is an example of how to create a sockjs server using nodejs and a redis. 

The message is sent form the server application to the Redis channel. SockJs server listens to the Redis channel. It gets the message and send one to the client connection. Easy)

Message format:
```javascript
{
  userId: number
  text: string
  type: "info" | "message"
}
```
The "type" property is a message type. When sending the first message from the client to the server in the field "type" should be "info". 
