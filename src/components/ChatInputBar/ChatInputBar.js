import React from 'react';
import './ChatInputBar.css';

function ChatInputBar(
    { inputData, setInputData, setMessages, messages }
) {
    const sendMessage = (e) => {
        console.log(` >>> '${inputData}'`);
        setMessages([...messages, inputData]);
        setInputData('');
        console.log({ messages })
    }

    return (
        <div className="chatInputBar">
            <input
                className="chatInputBar__input"
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                value={inputData}
                onChange={e => setInputData(e.target.value)}
                placeholder="Type a message"
                type="text"
            />
        </div>
    )
}

export default ChatInputBar