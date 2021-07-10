import React from 'react';
import './App.css';
import { ChatMessage, ChatState } from './types';
import { ChatContext } from './ChatContext';
import Mainpage from './pages/MainPage';
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";


class App extends React.Component {


  static contextType = ChatContext;
  state: ChatState = {
    messages: [
      {
        message: 'Welcome! Type a message and press Send Message to continue the chat.',
        author: 'Bot'
      }
    ],
    input: ''
  }

  componentDidMount () {

    //initiate socket connection
    this.context.init();

    const observable = this.context.onMessage();

    observable.subscribe((m: ChatMessage) => {
      let messages = this.state.messages;

      messages.push(m);
      this.setState({ messages: messages });
    });
  }

  componentWillUnmount () {
    this.context.disconnect();
  }

  render () {

    const updateInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
      this.setState({ input: e.target.value });
    }

    const handleMessage = (): void => {

      const author: string = 'Ross';

      if (this.state.input !== '') {
        this.context.send({
          message: this.state.input,
          author: author
        });
        this.setState({ input: '' });
      }
    };

    let msgIndex = 0;
    return (
      <Router>
      <div className="App">
        <Mainpage/>
      </div>
    </Router>
  );
  }
}


export default App;
