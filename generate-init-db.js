import fs from 'fs';
import path from 'path';

const problemsDir = './data/problems';
const testcasesRootDir = './data/testcases';
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

const createTestcaseCollection = `
db.createCollection('testcases');

db.testcases.createIndex({ problemNum: 1 });
`

initScript += createTestcaseCollection

const testcaseDir = fs.readdirSync(testcasesRootDir);

testcaseDir.forEach((dir) => {
  const testcaseDirByProblemNum = path.join(testcasesRootDir, dir);
  const testcaseFiles = fs.readdirSync(testcaseDirByProblemNum);
  const problemNum = parseInt(dir.toString());

  testcaseFiles.forEach(file => {
    if (file.startsWith('input')) {
      const inputFilePath = path.join(testcaseDirByProblemNum, file);
      const outputFilePath = path.join(testcaseDirByProblemNum, file.replace('input', 'output'));
      const testcaseNum = file.match(/\d+/);

      if (testcaseNum == null)
        console.error(`${file} is wrong.. it has to problem number ended`);

      if (fs.existsSync(outputFilePath)) {
        const input = fs.readFileSync(inputFilePath, 'utf8').trim();
        const expectedOutput = fs.readFileSync(outputFilePath, 'utf8').trim();

        initScript += `db.testcases.insertOne({
          problemNum: ${problemNum},
          testCases: {testcaseNum: ${testcaseNum}, input: "${input}", expectedOutput: "${expectedOutput}"},
          createdAt: new Date(),
          updatedAt: new Date()
        });\n\n`;
      }
      else {
        console.error(`${file} found, but can't find outputfile`);
      }
    }
  });
})

fs.writeFileSync('init-db.js', initScript);
console.log('init-db.js 파일이 성공적으로 생성되었습니다.');
