db = db.getSiblingDB('blindcoder')
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

db.createCollection('problems');

db.problems.createIndex({ title: 1 });
db.problems.insertOne({"id":1,"title":"fresh start","description":"the first problem","category":"Programming","difficulty":"easy","tags":["General"]});
db.problems.insertOne({"id":2,"title":"hello","description":"the second problem","category":"Programming","difficulty":"very easy","tags":["General"]});
db.problems.insertOne({"id":3,"title":"let's start","description":"the third problem","category":"Programming","difficulty":"easy","tags":["General"]});

db.createCollection('testcases');

db.testcases.createIndex({ problemNum: 1 });
db.testcases.insertOne({
          problemNum: 1,
          testCases: {testcaseNum: 1, input: "", expectedOutput: ""},
          createdAt: new Date(),
          updatedAt: new Date()
        });

db.testcases.insertOne({
          problemNum: 2,
          testCases: {testcaseNum: 1, input: "", expectedOutput: ""},
          createdAt: new Date(),
          updatedAt: new Date()
        });

db.testcases.insertOne({
          problemNum: 3,
          testCases: {testcaseNum: 1, input: "", expectedOutput: ""},
          createdAt: new Date(),
          updatedAt: new Date()
        });

db.testcases.insertOne({
          problemNum: 3,
          testCases: {testcaseNum: 2, input: "", expectedOutput: ""},
          createdAt: new Date(),
          updatedAt: new Date()
        });

