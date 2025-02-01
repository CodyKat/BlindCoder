'use client'

import { useEffect } from 'react';

const webWorker = new Worker("worker.js"); // Web Worker 생성

export default KeyEventCapture = (language : any) => {

    const handleKeyDown = (event : any) => {
        const inputKey = event.key;
        webWorker.postMessage(inputKey);
    };

    const handleSend = async () => {
        if (keyEvents.length > 0) {
            try {
                const payload = {
                    language: language,
                    keyEvents: keyEvents,
                };
                const response = await fetch('/api/submit-key-events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload), // 기록된 키 이벤트를 JSON 형식으로 변환하여 전송
                    credentials: 'include',
                });

                const data = await response.json();
                console.log('Success:', data);
                setKeyEvents([]); // 전송 후 배열 초기화
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log('No key events to send.');
        }
    };

    const handleClear = () => {
        setKeyEvents((prevEvents) => [
            ...prevEvents,
            { key: "CLEAR", timestamp: Date.now() },
        ])
    }

    return (
        <div className='console-input'
            onKeyDown={handleKeyDown}
            tabIndex={0} // 포커스를 받을 수 있도록 설정
            style={{ border: '1px solid #ddd', padding: '10px', maxWidth: '400px', margin: '20px auto' }}
        >
            <button className='button' onClick={handleClear}>Clear Input</button>
            <div className='console'>
                <h4>Type HERE!!!</h4>
                {/* <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(keyEvents, null, 2)}</pre> */}
            </div>
            <button className='button' onClick={handleSend}>Submit</button>
        </div>
    );
};