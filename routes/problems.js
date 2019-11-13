var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Problem = require("../models/problem");
const Code = require("../models/code");
const vm = require("vm");

router.get("/", async function(req, res) {
  var levelInfo = [];
  for (var i = 0; i < 10; i++) {
    levelInfo[i] = [];
    for (var j = 0; j < 5; j++) {
      levelInfo[i].push(0);
    }
  }
  var problem = await Problem.find({}).sort({ problemNumber: "asc" });

  var user = await User.find({});
  for (var i = 0; i < user.length; i++) {
    levelInfo[user[i].level - 1][user[i].stage - 1]++;
  }
  var popularProblemNumber = 0;
  var popularProblem = [1, 1];
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 5; j++) {
      if (popularProblemNumber < levelInfo[i][j]) {
        popularProblemNumber = levelInfo[i][j];
        popularProblem = [i + 1, j + 1];
      }
    }
  }
  var newpopularProblem = await Problem.find({
    level: popularProblem[0],
    stage: popularProblem[1]
  });
  return res.status(200).json({
    problem: problem,
    popularProblem: newpopularProblem,
    popularProblemNumber: popularProblemNumber
  });
});

router.get("/:level/:stage", async function(req, res) {
  const problem = await Problem.find({
    level: req.params.level,
    stage: req.params.stage
  });
  return res.status(200).json({
    problem: problem[0]
  });
});

router.post("/check", async function(req, res) {
  const problem = await Problem.find({
    level: req.body.level,
    stage: req.body.stage
  });
  var checkAnswer = 0;
  var result = [];
  for (var i = 0; i < 2; i++) {
    var answer = `${req.body.code}\n ${problem[0].tests[i].code}`;
    try {
      const script = new vm.Script(answer);
      const context = vm.createContext({});
      var yourResult = script.runInContext(context, { timeout: 1000 });
      if (!yourResult) yourResult = "UNDEFINED";
      var test = {
        expect: problem[0].tests[i].solution,
        your_answer: yourResult,
        result: ""
      };
      if (problem[0].tests[i].solution === String(yourResult)) {
        checkAnswer++;
        test.result = "success";
      } else {
        test.result = "failure";
      }
    } catch (e) {
      var yourResult = e.message;
      var test = {
        expect: problem[0].tests[i].solution,
        your_answer: yourResult,
        result: "failure"
      };
    }
    result.push(test);
  }
  if (checkAnswer === 2) {
    return res.status(200).json({
      result: result
    });
  } else {
    return res.status(401).json({
      result: result
    });
  }
});

router.post("/score", async function(req, res) {
  const user = await User.find({
    name: req.body.userName
  });
  const problem = await Problem.find({
    level: req.body.level,
    stage: req.body.stage
  });
  var checkAnswer = 0;
  var result = [];
  for (var i = 0; i < problem[0].tests.length; i++) {
    var answer = `${req.body.code}\n ${problem[0].tests[i].code}`;
    try {
      const script = new vm.Script(answer);
      const context = vm.createContext({});
      var yourResult = script.runInContext(context, { timeout: 1000 });
      if (!yourResult) yourResult = "UNDEFINED";
      var test = {
        expect: problem[0].tests[i].solution,
        your_answer: yourResult,
        result: ""
      };
      if (problem[0].tests[i].solution === String(yourResult)) {
        checkAnswer++;
        test.result = "success";
      } else {
        test.result = "failure";
      }
    } catch (e) {
      var yourResult = e.message;
      var test = {
        expect: problem[0].tests[i].solution,
        your_answer: yourResult,
        result: "failure"
      };
    }
    result.push(test);
  }
  if (checkAnswer === problem[0].tests.length) {
    var newArray = problem[0].successPeople;
    newArray.push(user[0]._id);
    await Problem.update(
      {
        level: req.body.level,
        stage: req.body.stage
      },
      {
        successPeople: newArray
      }
    );
    var newStage = Number(req.body.stage) + 1;
    const nextProblem = await Problem.find({
      level: req.body.level,
      stage: newStage + ""
    });
    const myCode = await Code.create({
      level: req.body.level,
      stage: req.body.stage,
      userName: user[0].name,
      user_id: user[0]._id,
      code: req.body.code,
      title: problem[0].title
    });
    if (nextProblem.length === 0) {
      var newLevel = Number(req.body.level) + 1;
      await User.update(
        {
          name: req.body.userName
        },
        {
          level: newLevel + "",
          stage: "1",
          point: user[0].point + 1
        }
      );
    } else {
      await User.update(
        {
          name: req.body.userName
        },
        {
          stage: newStage + "",
          point: user[0].point + 1
        }
      );
    }
    return res.status(200).json({
      result: result,
      finalCode: req.body.code,
      time: req.body.time,
      btnText: "다음 풀기"
    });
  } else {
    return res.status(401).json({
      result: result,
      finalCode: req.body.code,
      time: req.body.time,
      btnText: "다시 풀기"
    });
  }
});

module.exports = router;
