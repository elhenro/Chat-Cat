import './App.css';
import ChatInputBar from './components/ChatInputBar/ChatInputBar';
import ChatRoomView from './components/ChatRoomView/ChatRoomView';
import React, { useState } from 'react';

function App() {
  const [inputData, setInputData] = useState('');
  const [messages, setMessages] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <ChatRoomView messages={messages} />
        <ChatInputBar
          inputData={inputData}
          setInputData={setInputData}
          messages={messages}
          setMessages={setMessages}
        />
      </header>

    </div>
  );
}

export default App;
