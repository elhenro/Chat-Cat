import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CatChatCat.css';

function CatChatCat(
    { messages, setMessages }
) {
    const useBlinkCycle = (cat, setCat) => {
        useEffect(() => {
            function startBlinkCycle() {
                setTimeout(() => {
                    // console.log('blink', { cat });
                    if (cat.blink) {
                        return
                    }
                    // if (cat.emotion === 'default' || cat.emotion === null) {
                    setCat( prevCat => ({ ...prevCat, blink: true }))
                    setTimeout(() => {
                        // if (cat.emotion === 'default' || cat.emotion === null) {
                            setCat( prevCat => ({ ...prevCat, blink: false }))
                        // }
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

    const handleNewMessage = async (message) => {
        if (!message) {
            return
        }
        const sentiment = await getSentiment(message); 
        let detectedEmotion = null;
        if (sentiment > 0.5) {
            detectedEmotion = 'happy';
        } else if (sentiment < 0) {
            detectedEmotion = 'angry';
        } //else if (sentiment < -1) {
            //detectedEmotion = 'sad';
        //}
        if (detectedEmotion) {
            createEmotion({
                previousEmotion: cat.emotion,
                emotionType: detectedEmotion,
                // duration: 1000 + Math.floor(Math.random() * 9000),
                duration: 5000,
            });
        }
        console.log(`[${detectedEmotion}] - {${sentiment}} >>> ${message}`);
    }

    const getSentiment = async (message) => {
        // const serverUrl = 'http://localhost:3001';
        const serverUrl = 'http://192.168.178.151:3001';
        const { data: sentimentData } = await axios.post(`${serverUrl}/sentiment`, message);
        const sentiment = sentimentData?.sentiment;
        return sentiment;
    }

    function createEmotion({
        emotionType,
        duration,
        previousEmotion,
    }) {
        console.log('set emotion', emotionType, 'for', duration, 'ms')
        // setCat({ ...cat, emotion: emotionType })
        setCat(prevCat => ({ ...prevCat, emotion: emotionType }))
        setTimeout(() => {
            // setCat({ ...cat, emotion: null })
            setCat(prevCat => ({ ...prevCat, emotion: null }))
        }, duration);
    }

    useEffect(() => {
        handleNewMessage(messages[messages.length - 1]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    function getImagePath(cat) {
        switch (cat.emotion) {
            case 'happy':
                return './cat-happy.png';
            case 'angry':
                return './cat-angry.png';
            // case 'sad':
            //     return './cat-sad.png';
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