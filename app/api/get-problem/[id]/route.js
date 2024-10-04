// app/api/get-problem/[id]/route.js
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
    const { id } = params; // URL 파라미터에서 id 가져오기
    const filePath = path.join(process.cwd(), 'data', "problem" + id + ".txt"); // 문제 데이터 파일 경로
    var fileLines;

    try {
        const problemContent = fs.readFileSync(filePath, 'utf8'); // 파일 내용 읽기
        fileLines = problemContent.split('\n');
        return new Response(JSON.stringify({
            title: fileLines[0],
            description: fileLines.slice(1).join('\n')
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error reading file:', error);
        return new Response(JSON.stringify({ message: 'File not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
