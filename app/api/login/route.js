import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { connectToDatabase } from '@/lib/mongoClient';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const client = await connectToDatabase();
    const db = client.db('blindcoder');
    const user = await db.collection('users')
        .findOne({username: username, password: password});

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ username: user.username})
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(secret);

    const response =NextResponse.json({ message: 'Login successful', token });
    response.cookies.set('blind-coding-cat-user-jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600,
        path: '/',
    });
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}