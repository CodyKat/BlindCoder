import { connectToDatabase } from "./mongoClient";

export async function getProblemsMetadataFromDB(from, to) {
    const client = await connectToDatabase();
    const db = client.db('blindcoder');
    const problems = await db.collection('problems').find({ problemId: {$gte: parseInt(from), $lte: parseInt(to)} });
    return problems ? problems : 'Problems not found.';
}

export async function getOneProblemMetadataFromDB(problemNum) {
    const client = await connectToDatabase();
    const db = client.db('blindcoder');
    const problems = await db.collection('problems').findOne({ problemId: parseInt(problemNum) });
    return problems ? problems : 'Problems not found.';
}

export async function getOneProblemDescriptionFromDB(problemId) {
  const client = await connectToDatabase();
  const db = client.db('blindcoder');
  const problem = await db.collection('problems').findOne({ problemId: parseInt(problemId) });
  return problem ? problem.description : 'Problem not found.';
}

export async function getProblemsDescriptionFromDB(from, to) {
    const client = await connectToDatabase();
    const db = client.db('blindcoder');
    const problems = await db.collection('problems').find({ problemId: {$gte: parseInt(from), $lte: parseInt(to)} });
    return problems ? problems.description : 'Problem not found.';
  }
  