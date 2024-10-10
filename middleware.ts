import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export function middleware(req) {
  const token = req.cookies.get('blind-coding-cat-user-jwt')?.value;

  if (!token) {
    console.log('No token found');
    if (req.nextUrl.pathname.startsWith('/app/problem')) {
      // 페이지 요청에 대해 리다이렉션 처리
      return NextResponse.redirect(new URL('/login', req.url));
    } else if (req.nextUrl.pathname.startsWith('/api')) {
      // API 요청에 대해 401 Unauthorized 반환
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.log("JWT verification failed:", error.message);
    if (req.nextUrl.pathname.startsWith('/app/problem')) {
      return NextResponse.redirect(new URL('/login', req.url));
    } else if (req.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
  }
}

export const config = {
  matcher: [
    '/app/problem/:path*',
    '/api/problemAlldata/:path*',
  ],
};
