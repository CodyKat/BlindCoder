// app/api/submit-key-events/route.js

export async function POST(request) {
    const keyEvents = await request.json(); // 클라이언트에서 보낸 키 이벤트 데이터
    console.log('Received key events:', keyEvents);
    return new Response(JSON.stringify({ message: 'Key events received successfully.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }, // JSON 응답을 위한 헤더 추가
    });
}

export const config = {
    api: {
        bodyParser: true, // JSON 본문 파싱을 활성화
    },
};
