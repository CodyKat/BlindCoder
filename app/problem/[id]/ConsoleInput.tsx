'use client'
import { useRef, useEffect } from "react";

const ConsoleInput = (language : any) => {
    const consoleWorker = useRef<Worker>();

    useEffect(() => {
        consoleWorker.current = new Worker("../consoleWebWorker.ts");
        return () => {
            consoleWorker.current?.terminate();
        }
    }, [])

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
                // setKeyEvents([]); // 전송 후 배열 초기화
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log('No key events to send.');
        }
    };

    return (
        <div className='console'
        style={{ border: '1px solid #ddd', padding: '10px', maxWidth: '400px', margin: '20px auto' }}
        >
            <button className='button' onClick={() => console.log("nnn")}>Clear Input</button>
            <div className='console-input'
                tabIndex={0}
                onKeyDown={(event) => consoleWorker.current?.postMessage(["keydown", event.key])}>
                <h4>Type HERE!!!</h4>
                {/* <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(keyEvents, null, 2)}</pre> */}
            </div>
            <button className='button' onClick={() => consoleWorker.current?.postMessage(["submit", null])}>Submit</button>
        </div>
    );
};

export default ConsoleInput;