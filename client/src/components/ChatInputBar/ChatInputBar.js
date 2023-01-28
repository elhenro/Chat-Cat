// import React, { useState, useEffect } from 'react';
import React from 'react';
import './ChatInputBar.css';

function ChatInputBar(
    { input, setInputData, setMessages, messages }
) {
    // init state for number of times arrow up was pressed
    // const [numberOfTimesPressed, setNumberOfTimesPressed] = useState(0);

    const sendMessage = (e) => {
        if (!input.length) {
            return
        }
        // console.log(` >>> '${input}'`);
        setMessages([...messages, { text: input, fromUser: true }]);
        setInputData('');
    }


    //// buggy
    // in start, init event listeners once
    // useEffect(() => {
    //     // add event listener for arrow up and arrow down
    //     document.addEventListener('keydown', (e) => {
    //         // receive key press only once
    //         if (e.repeat) {
    //             return;
    //         }
    //         if (e.key === 'ArrowUp') {
    //             setNumberOfTimesPressed(numberOfTimesPressed + 1);
    //             console.log({ numberOfTimesPressed });
    //             // const lastMessage = messages[messages.length - (numberOfTimesPressed > 1 || 1)];
    //             // setInputData(lastMessage);
    //         }
    //         if (e.key === 'ArrowDown') {
    //             setNumberOfTimesPressed(numberOfTimesPressed - 1);
    //             console.log({ numberOfTimesPressed });
    //             // const prevMessage = messages[messages.length - (numberOfTimesPressed || 1)];
    //             // setInputData(prevMessage);
    //         }
    //     })
    // })

    // useEffect(() => {
    //     setNumberOfTimesPressed(0);
    // }, [messages])

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