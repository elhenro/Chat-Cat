// chat input button react component which can be clicked to send a random message
import React from 'react';

import './ChatInputButton.css';

function ChatInputButton({ messages, setMessages }) {
    const sendMessage = () => {
        const lastMessage = messages[messages.length - 1];
        const answer = getAnwer(lastMessage);
        // console.log(` <<< '${answer}'`);
        setMessages([...messages, answer]);
        // console.log({ messages })
    }

    function getAnwer(lastMessage) {
        const answers = [
            'Hello',
            'How are you?',
            'I am fine, thank you',
        ]
        return answers[Math.floor(Math.random() * answers.length)];
    }

    return (
        <div className="chatInputButton">
            <button
                className="chatInputButton__button"
                onClick={sendMessage}
            >
                Send random message
            </button>
        </div>
    )
}

export default ChatInputButton