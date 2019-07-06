
import React, {Component} from 'react';

export default class HomePage extends Component {

  state = {
    connectStatus: 'start',
    messages: [],
  }

  componentDidMount () {
    // eslint-disable-next-line no-undef
    const sock = new SockJS('http://localhost:5001/echo');

    sock.onopen = () => {
      this.setState({connectStatus: 'connected'})
      const message = {type: 'info', userId: 1};
      sock.send(JSON.stringify(message));
    };

    sock.onmessage = ({data}) => {
      console.log('message', data);
      this.setState({messages: [...this.state.messages, JSON.parse(data).text]});
    };

    sock.onclose = () => {
      this.setState({connectStatus: 'closed'})
    };
  }

  render () {
    const {connectStatus, messages} = this.state;

    return (
      <div>
        {connectStatus}
        <ul>
          {messages.map((item, index) =>
            <li key={index}>
              {item}
            </li>
          )}
        </ul>
      </div>
    ) 
  }
}
