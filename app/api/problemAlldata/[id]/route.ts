import { connectToDatabase } from '@/lib/mongoClient'

export async function GET(req, { params }) {
    try {
        const id = parseInt(params.id, 10);

        if (isNaN(id)) {
            throw new Error('Invalid id');
        }

        const client = await connectToDatabase();
        const db = client.db('blindcoder');
        const problem = await db.collection('problems')
            .findOne({id: id}, {projection: { title: 1, summary: 1, description: 1}});
        if (!problem) {
            return new Response(JSON.stringify({ error: 'Problem not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        return new Response(JSON.stringify(problem), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching problme:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch problems '}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}