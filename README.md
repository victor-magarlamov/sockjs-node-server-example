## Simple SockJs server with Node and Redis

Message format:
```javascript
{
  userId: number
  text: string
  type: "info" | "message"
}
```
The "type" property is a message type. When sending the first message from the client to the server in the field "type" should be "info". 
