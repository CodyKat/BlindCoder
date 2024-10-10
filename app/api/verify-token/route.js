import jwt from 'jsonwebtoken';

export default function POST(req) {
    if (req.method !== 'POST') {
        return new Response.status(405).end(); // 허용되지 않은 메소드
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return Response.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        Response.status(200).json({ user: decoded });
    } catch (error) {
        Response.status(401).json({ message: 'Invalid token' });
    }
}
