import React from 'react';
import './ChatInputBar.css';

function ChatInputBar(
    { input, setInputData, setMessages, messages }
) {
    const sendMessage = (e) => {
        if (!input.length) {
            return
        }
        console.log(` >>> '${input}'`);
        setMessages([...messages, input]);
        setInputData('');
    }

    return (
        <div className="chatInputBar">
            <input
                autoFocus
                className="chatInputBar__input"
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                value={input}
                onChange={e => setInputData(e.target.value)}
                placeholder="Type a message"
                type="text"
            />
        </div>
    )
}

export default ChatInputBar