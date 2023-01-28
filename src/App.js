import React, { useState  } from 'react';
import ChatInputBar from './components/ChatInputBar/ChatInputBar';
import ChatRoomView from './components/ChatRoomView/ChatRoomView';
import ChatInputButton from './components/ChatInputButton/ChatInputButton';
import CatChatCat from './components/CatChatCat/CatChatCat';
import './App.css';

function App() {
  const [inputData, setInputData] = useState('');
  const [messages, setMessages] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <ChatRoomView
          messages={messages}
        />
        <CatChatCat
          messages={messages}
          setMessages={setMessages}
        />
        <ChatInputBar
          inputData={inputData}
          setInputData={setInputData}
          messages={messages}
          setMessages={setMessages}
        />
        <ChatInputButton
          messages={messages}
          setMessages={setMessages}
        />
      </header>

    </div>
  );
}

export default App;
