import { connectToDatabase } from '@/lib/mongoClient'

export async function GET(request) {
    const client = await connectToDatabase();
    const db = client.db('blindcoder');
    const problems = await db.collection('problems')
        .find({}, {projection: { description: 0 }} )
        .toArray();
    return problems ? problems : 'Problems not found.';
}