// chat room view
import React from 'react';
import './ChatRoomView.css';

function ChatRoomView ({ messages }) {
    return (
        <div className="chatRoomView">
            {messages.map((message, index) => (
                <p key={index} className="chatRoomView__message">{message}</p>
            ))}
        </div>
    )
}

export default ChatRoomView