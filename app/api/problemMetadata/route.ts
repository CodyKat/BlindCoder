import { connectToDatabase } from '@/lib/mongoClient'

export async function GET(req) {
    try {
        const client = await connectToDatabase();
        const db = client.db('blindcoder');
        const problems = await db.collection('problems')
            .find({}, {projection: { description: 0 }} )
            .toArray();
        return new Response(JSON.stringify(problems), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching problems:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch problems' }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
        });
    }
}