import redis from '@/lib/redisClient';
import { jwtVerify } from 'jose';

export async function GET(request) {
    try {
        // 쿠키에서 JWT 토큰 추출
        const cookie = request.headers.get('cookie');
        const token = cookie?.split('; ').find(row => row.startsWith('blind-coding-cat-user-jwt=')).split('=')[1];

        if (!token) {
            return new Response(JSON.stringify({ message: 'Authentication token is missing.' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // JWT 검증 및 사용자 ID 추출
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        let username;
        try {
            const { payload } = await jwtVerify(token, secret);
            username = payload.username; // JWT에서 user_id 추출
        } catch (error) {
            return new Response(JSON.stringify({ message: 'Invalid or expired authentication token.' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Redis에서 사용자의 세션 정보 가져오기
        const sessionKey = `user:${username}:current_problem`;
        const currentSession = await redis.get(sessionKey);

        if (currentSession) {
            const { problem_id, expires_at } = JSON.parse(currentSession);
            const remainingTime = Math.max(0, expires_at - Date.now());

            return new Response(JSON.stringify({ problemId: problem_id, remainingTime }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: 'No active session found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error('Error fetching remaining time:', error);
        return new Response(JSON.stringify({ message: 'Error fetching remaining time.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
