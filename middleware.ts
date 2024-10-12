import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import redis from '@/lib/redisClient';
// import { connectToDatabase } from "./lib/mongoClient";

export async function middleware(req) {

  let payload;
  let username = payload;

  if (req.nextUrl.pathname.startsWith('/app/problem/sample')) {
    return NextResponse.next();
  }

  // user auth check
  const userAuthToken = req.cookies.get('blind-coding-cat-user-jwt')?.value;

  if (!userAuthToken) {
    console.log('No userAuthToken found');
    if (req.nextUrl.pathname.startsWith('/app/problem')) {
      // 페이지 요청에 대해 리다이렉션 처리
      return NextResponse.redirect(new URL('/login?redirectTo=/app/problemSet', req.url));
    } else if (req.nextUrl.pathname.startsWith('/api')) {
      // API 요청에 대해 401 Unauthorized 반환
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    payload = jwtVerify(userAuthToken, secret);
    username = payload.username;
    return NextResponse.next();
  } catch (error) {
    console.log("user auth JWT verification failed:", error.message);
    if (req.nextUrl.pathname.startsWith('/app/problem')) {
      return NextResponse.redirect(new URL('/login', req.url));
    } else if (req.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
  }


  // // problem access and try check
  // // 이미 유저로그인 인증은 되어있는 상태
  // if (req.nextUrl.pathname.startsWith('/app/problem')) {
  //   const problemAccessToken = req.cookies.get('blind-coder-cat-problem-jwt')?.value;

  //   // 문제 토큰은 있긴함
  //   if (problemAccessToken) {
  //     try {
  //       const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  //       const { payload } = jwtVerify(problemAccessToken, secret);
  //       return NextResponse.next();
  //     } catch (error) {
  //       console.log('problem JWT verification failed', error.message);
  //     }
  //   }

  //   // 토큰은 있지만 1.조작되었거나 2.시간이 지났거나 3.풀던 문제가 아닌 문제 페이지로 접근함
  //   // 1,2.의 경우에는 해당 토큰을 



  // }

  // const problemId = req.nextUrl.pathname.split('/').pop();

  // const sessionKey = `user:${username}:current_problem`;
  // const currentSession = await redis.get(sessionKey);

  // if (currentSession) {
  //   const { problem_id, expires_at } = JSON.parse(currentSession);

  //   // session에 이미 풀고 있던 문제가 있었음
  //   if (problemId !== problem_id) {
  //     return NextResponse.redirect(`/problem/${problem_id}`);
  //   }
  // } else { // 풀고 있던 문제가 없었음
  //   const mongoClient = await connectToDatabase();
  //   const db = mongoClient.db('blindcoder');
  //   const expires_time_string : string = await db.collection('problems')
  //     .findOne({id: problemId}, {projection: { playtime: 1 }});
  //   const [hours, minutes, seconds] = expires_time_string.split(':').map(Number);
  //   const expiresIn = hours * 3600 + minutes * 60 + seconds;
  //   const newSessionData = JSON.stringify({
  //     problem_id: problemId,
  //     expires_at: Date.now() + expiresIn * 1000,
  //   });

  //   await redis.set(sessionKey, newSessionData, 'EX', expiresIn);
  // }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/app/problem/:path*',
    '/api/problemAlldata/:path*',
  ],
};
