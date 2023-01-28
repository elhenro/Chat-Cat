// chat room view
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ChatRoomView.css';

function ChatRoomView({ messages }) {
    return (
        <div className="chatRoomView">
            <TransitionGroup>
                {messages.map((message, index) => (
                    <CSSTransition
                        key={index}
                        timeout={500}
                        classNames={{
                            enter: 'enter',
                            enterActive: 'enterActive',
                            exit: 'exit',
                            exitActive: 'exitActive',
                        }}
                    >
                        <p className="chatRoomView__message">
                            {message}
                        </p>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}

export default ChatRoomView