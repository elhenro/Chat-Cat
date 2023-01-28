// chat room view
import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ChatRoomView.css';

function handleNewMessage(message) {
    // console.log('handleNewMessage', message);
    // message typing animation
    const chatRoomView = document.querySelector('.chatRoomView');
    const lastMessage = chatRoomView.lastChild;
    const lastMessageCursor = lastMessage.querySelector('.typing-animation__cursor');
    lastMessage.classList.add('typing-animation');
    setTimeout(() => {
        lastMessage?.classList.remove('typing-animation');
        lastMessageCursor?.classList.remove('typing-animation__cursor');
    }, 10 * (message?.length || 1));
    // scroll to bottom of the page
    window.scrollTo(0, document.body.scrollHeight);
}

function ChatRoomView({ messages }) {
    // eslint-disable-next-line
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        handleNewMessage(messages[messages.length - 1]);
    }, [messages]);
    return (
        <div className="chatRoomView">
            <TransitionGroup>
                {messages.map((message, index) => (
                    <CSSTransition
                        key={index}
                        timeout={500}
                        classNames={{
                            enter: 'typing',
                            enterActive: 'typingActive',
                            exit: 'exit',
                            exitActive: 'exitActive',
                        }}
                    >
                        {message.fromUser === true ? (
                            <div className="chatRoomView__message">
                                <p className="typing-animation truncate-text">
                                    {message.text}
                                </p>
                                <div className={`typing-animation ${typing ? 'typing' : ''}`}>
                                    <span className="typing-animation__cursor"></span>
                                </div>
                            </div>
                        ) : (
                            <div className="chatRoomView__message answer">
                                <p className="typing-animation truncate-text">
                                    {message.text}
                                </p>
                            </div>
                        )}
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}

export default ChatRoomView