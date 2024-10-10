import redis from '@/lib/redisClient'

export async function POST(request) {
    try {
        const keyEvents = await request.json(); // 클라이언트에서 보낸 키 이벤트 데이터
        console.log('Received key events:', keyEvents);

        // Redis에 배치로 키 이벤트 추가
        const userEventKey = `key-events-queue`; // 큐 이름 설정
        await redis.rpush(userEventKey, JSON.stringify(keyEvents));
        return new Response(JSON.stringify({ message: 'Key events successfully queued in Redis. please wait...' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }, // JSON 응답을 위한 헤더 추가
        });
    } catch (error) {
        console.error('Error processing key events:', error);
        return new Response(JSON.stringify({ message: 'Error processing key events.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export const config = {
    api: {
        bodyParser: true, // JSON 본문 파싱을 활성화
    },
};