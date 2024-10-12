import redis from '@/lib/redisClient'
import { jwtVerify } from "jose";

export async function POST(request) {
    try {
        const cookies = await request.headers.get('cookie');
        const token = cookies?.split('; ').find(row => row.startsWith('blind-coding-cat-user-jwt'))?.split('=')[1];
        let username = ''
        console.log(token)
        if (!token) {
            return new Response(JSON.stringify({ message: 'Authentication token is missing.' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET); // 시크릿 키는 환경 변수에서 가져옴
            const { payload } = await jwtVerify(token, secret);
            username = payload.username;
        } catch (error) {
            return new Response(JSON.stringify({ message: 'Invalid authentication token.' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        } 



        const keyEvents = await request.json(); // 클라이언트에서 보낸 키 이벤트 데이터
        console.log('Received key events:', keyEvents);

        // Redis Stream에 키 이벤트 추가
        const streamName = 'tasks-stream'; // 스트림 이름 설정
        await redis.xadd(streamName, '*', 'language', keyEvents.language, 'username', username, 'keyEvents', JSON.stringify(keyEvents.keyEvents));

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

// export const config = {
//     api: {
//         bodyParser: true, // JSON 본문 파싱을 활성화
//     },
// };
