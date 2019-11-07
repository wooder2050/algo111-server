var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Problem = require("../models/problem");
const vm = require("vm");

router.get("/:level", async function(req, res) {
  const problem = await Problem.find({
    level: req.params.level
  });
  return res.status(200).json({
    problem: problem[0]
  });
});

router.post("/check", async function(req, res) {
  const problem = await Problem.find({
    level: req.body.level
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
    // function solution(n, m) {
    //   n.sort(); //참가자 배열 정렬
    //   m.sort(); //완주자 배열 정렬
    //   for (var i = 0; i < n.length; i++) {
    //     if (n[i] !== m[i]) {
    //       //인덱스 0부터 순차적으로 두 배열 비교
    //       return n[i];
    //       //비완주자가 참가자 배열에 나올 경우 출력
    //     }
    //   }
    // }
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
  const problem = await Problem.find({
    level: req.body.level
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
    //   function solution(n,m) {
    //     n.sort(); //참가자 배열 정렬
    //  m.sort(); //완주자 배열 정렬
    //  for(var i=0;i<n.length;i++){
    //      if(n[i] !== m[i]){
    //          //인덱스 0부터 순차적으로 두 배열 비교
    //          return n[i];
    //          //비완주자가 참가자 배열에 나올 경우 출력
    //      }
    //  }
    //    }
    return res.status(200).json({
      result: result
    });
  } else {
    return res.status(401).json({
      result: result
    });
  }
});

module.exports = router;
