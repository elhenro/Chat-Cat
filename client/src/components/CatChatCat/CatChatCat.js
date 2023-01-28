import React, { useEffect, useState } from 'react';
import './CatChatCat.css';

function CatChatCat(
    { messages, setMessages }
) {
    const useBlinkCycle = (cat, setCat) => {
        useEffect(() => {
            function startBlinkCycle() {
                setTimeout(() => {
                    if (cat.blink) {
                        return
                    }
                    setCat({ ...cat, blink: true })
                    setTimeout(() => {
                        setCat({ ...cat, blink: false })
                        if (!cat.blink) {
                            startBlinkCycle()
                        }
                    },
                        200 + Math.floor(Math.random() * 800)
                    );
                },
                    3000 + Math.floor(Math.random() * 4000)
                );
            }
            startBlinkCycle();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        return cat;
    }
    const [cat, setCat] = useState({ blink: false });
    useBlinkCycle(cat, setCat);

    const handleNewMessage = (message) => {
        console.log('asd', message)
        if (message?.includes('happy')) {
            console.log('yay')
            setCat({ ...cat, emotion: 'happy' })
            setTimeout(() => {
                setCat({ ...cat, emotion: null })
            }, 3000);
        }
        // const sentiment = sentimentAnalysis(message);
        // console.log({ sentiment })
    }

    useEffect(() => {
        handleNewMessage(messages[messages.length - 1]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    function getImagePath(cat) {
        switch (cat.emotion) {
            case 'happy':
                return './cat-happy.png';
            case 'sad':
                return './cat-sad.png';
            case 'angry':
                return './cat-angry.png';
            default:
                {
                    switch (cat.blink) {
                        case true:
                            return './cat-blink.png';
                        case false:
                            return './cat-default.png';
                        default:
                            return './cat-default.png';
                    }
                }
        }

    }

    return (
        <div className="catChatCat">
            <div className="catChatCat__container">
                <img
                    className="catChatCat__image"
                    src={getImagePath(cat)}
                    alt="cat"
                />
            </div>
        </div>
    )
}

export default CatChatCat