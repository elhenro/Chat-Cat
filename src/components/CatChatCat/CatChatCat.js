import React, { useEffect, useState } from 'react';
import './CatChatCat.css';

function CatChatCat() {
    const useBlinkCycle = (cat, setCat) => {
        useEffect(() => {
            function startBlinkCycle() {
                setTimeout(() => {
                    if (cat.blink) {
                        return
                    }
                    setCat({ ...cat, blink: true })
                    console.log('eye closed')
                    setTimeout(() => {
                        setCat({ ...cat, blink: false })
                        console.log('eye open')
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
        }, []);
        return cat;
    }
    const [cat, setCat] = useState({ blink: false });
    useBlinkCycle(cat, setCat);

    return (
        <div className="catChatCat">
            <div className="catChatCat__container">
                <img
                    className="catChatCat__image"
                    src={cat.blink ? './cat-blink.png' : './cat-default.png'}
                    alt="cat"
                />
            </div>
        </div>
    )
}

export default CatChatCat