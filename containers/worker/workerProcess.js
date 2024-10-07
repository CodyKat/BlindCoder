// workers/queueConsumer.js
import redis from './redisClient.js'

const excludeKeys = [
    'Control',
    'Shift',
    'Alt',
    'Meta',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Escape',
    'CapsLock',
    'Insert',
    'Delete',
    'Home',
    'End',
    'PageUp',
    'PageDown',
    'F1', 'F2', 'F3', 'F4', 'F5',
    'F6', 'F7', 'F8', 'F9', 'F10',
    'F11', 'F12', 'HangulMode'
];

async function processQueue() {
    while (true) {
        try {
            // Redis 큐에서 데이터 가져오기 (LPOP: FIFO 방식)
            const eventData = await redis.lpop('key-events-queue');
            if (eventData) {
                const parsedData = JSON.parse(eventData);
                console.log('Processing key events:', parsedData);

                // 필터링된 키 이벤트 목록 생성
                const filteredKeyEvents = parsedData.filter(event => !excludeKeys.includes(event.key));
                console.log("Filtered key events:", filteredKeyEvents);


                // 여기서 키 이벤트 데이터를 처리하는 로직을 추가합니다.
                // 예: 컴파일러 실행, 결과 처리 등
                    

            } else {
                console.log('No events to process, waiting...');
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기 후 다시 시도
            }
        } catch (error) {
            console.error('Error processing queue:', error);
        }
    }
}

processQueue();
