export async function POST(request) {
    const { username, password, email, organization } = await request.json();

    // 요청에서 받은 데이터 처리
    console.log('Received data:', { username, password, email, organization });

    // 예시로 성공 응답 반환
    return new Response(JSON.stringify({ message: 'sign up success'}), {
      status: 200,
      headers: { 'Content-Type': 'application/json'},
    });
}
