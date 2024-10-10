db = db.getSiblingDB('blindcoder')
db.createCollection('users');

db.users.createIndex({ username: 1 });

db.users.insertOne({
  username: "jaemjeon",
  password: "pwd",
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
db.problems.insertOne({"id":1,"title":"fresh start","summary":"small problem","description":"the first problem","category":"Programming","difficulty":"easy","playtime":"00:30:00","submit":3,"correct":1,"totalPlaytime":"00:10:00","tags":["General"]});
db.problems.insertOne({"id":2,"title":"hello","summary":"small problem","description":"second problem","category":"Programming","difficulty":"very easy","playtime":"00:30:00","submit":3,"correct":2,"totalPlaytime":"00:20:00","tags":["General"]});
db.problems.insertOne({"id":3,"title":"let's start","summary":"small problem","description":"third problem","category":"Programming","difficulty":"easy","playtime":"00:30:00","submit":3,"correct":3,"totalPlaytime":"00:30:00","tags":["General"]});

db.createCollection('testcases');

db.testcases.createIndex({ problemNum: 1 });
db.testcases.insertOne({
          problemNum: 1,
          testCases: {testcaseNum: 1, input: "dfdf", expectedOutput: ""},
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

