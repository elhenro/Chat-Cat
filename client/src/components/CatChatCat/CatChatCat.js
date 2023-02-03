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
        if (!message || !message.fromUser) {
            return
        }
        const sentiment = await getSentiment(message.text);
        let detectedEmotion = null;
        if ( sentiment && sentiment > 0.1) {
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
                duration: 1000 + Math.floor(Math.random() * 9000),
                // duration: 5000,
            });
        }
        console.log(`[${detectedEmotion}] - {${sentiment}} >>> ${message.text}`);

        // get answer to user input message from dialogGPT api
        // const answer = await getAnswer(message.text);
        // console.log({ answer });
        // setMessages( prevMessages =>  [...prevMessages, [ ...prevMessages, { text: answer, fromUser: false } ]]);
        // setMessages([...messages, { text: answer, fromUser: false }]);
        // setMessages([...messages, { text: answer, fromUser: false }]);

        console.log({ messages })
    }

    async function getAnswer(message) {
        const serverUrl = 'http://127.0.0.1:5000/chat';
        const { data: answerData } = await axios.post(serverUrl, { input: message });
        return answerData?.response;
    }

    const getSentiment = async (messageText) => {
        try {
          const serverUrl = process.env.CAT_ONLINE_API_URL || 'https://api.cat-online.net';
            const { data: sentimentData } = await axios.post(`${serverUrl}/sentiment`, messageText);
            const sentiment = sentimentData?.sentiment;
            return sentiment;
        } catch (error) {
            console.error(error);
            return null
        }
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
