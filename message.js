const USER_ID = 'userId';
const TYPE = 'type'

class Message {
  
  constructor (message) {
    this.content = JSON.parse(message);
  }

  get userId () {
    return this.content[USER_ID];
  }

  isInfoType () {
    return this.content[TYPE] === 'info';
  }
}

module.exports = Message;
