import fs from 'fs';
import path from 'path';

const problemsDir = './data/problems';
const metadataDir = './data/metadata';

const initDBScriptHeader = `db = db.getSiblingDB('blindcoder')`;

const initDBUser = `
db.createCollection('users');

db.users.createIndex({ username: 1 });

db.users.insertOne({
  username: "jaemjeon",
  email: "jaemjeon@student.42seoul.kr",
  joinedDate: new Date(),
  solvedProblems: [{
    id: 1,
    try: 1,
    startTime: new Date(),
    success: false
  }]
});
`;

const createProblemsCollection = `
db.createCollection('problems');

db.problems.createIndex({ title: 1 });
`

var initScript = "";

initScript += initDBScriptHeader;
initScript += initDBUser;
initScript += createProblemsCollection;

// 메타데이터 파일 로드
const categories = JSON.parse(fs.readFileSync(path.join(metadataDir, 'categories.json'), 'utf8'));
const difficulties = JSON.parse(fs.readFileSync(path.join(metadataDir, 'difficulties.json'), 'utf8'));
const tags = JSON.parse(fs.readFileSync(path.join(metadataDir, 'tags.json'), 'utf8'));

// 문제 데이터 로드 및 유효성 검사
const problemFiles = fs.readdirSync(problemsDir);

problemFiles.forEach((file) => {
  const filePath = path.join(problemsDir, file);
  const problemData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 유효성 검사: 카테고리, 난이도, 태그
  if (!categories.includes(problemData.category)) {
    console.error(`Invalid category: ${problemData.category} in file ${file}`);
    return;
  }

  if (!difficulties.includes(problemData.difficulty)) {
    console.error(`Invalid difficulty: ${problemData.difficulty} in file ${file}`);
    return;
  }

  problemData.tags.forEach(tag => {
    if (!tags.includes(tag)) {
      console.error(`Invalid tag: ${tag} in file ${file}`);
    }
  });

  initScript += `db.problems.insertOne(${JSON.stringify(problemData)});\n`;
});

fs.writeFileSync('init-db.js', initScript);
console.log('init-db.js 파일이 성공적으로 생성되었습니다.');
