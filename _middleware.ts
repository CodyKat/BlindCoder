import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const { cookies } = req;

  // 쿠키에서 토큰 추출
  const token = cookies.authToken;

  console.log("middleware");
  // 토큰이 없는 경우 로그인 페이지로 리다이렉트
  if (req.nextUrl.pathname == "/login")
    return NextResponse.next();

  if (!token) {
    const loginUrl = new URL('/login', req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // 토큰 검증 (토큰이 유효하지 않거나 만료되면 오류 발생)
    const decodedToken = jwt.verify(token, 'yourSecretKey');
    
    // 요청에 사용자 정보를 포함해서 넘기기
    req.user = decodedToken;
    return NextResponse.next();
  } catch (error) {
    // 토큰 검증 실패 시 로그인 페이지로 리다이렉트
    return NextResponse.redirect('/login');
  }
}