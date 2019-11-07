var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Problem = require("../models/problem");

/* GET users listing. */
router.get("/:level", async function(req, res, next) {
  const problem = await Problem.find({
    level: req.params.level
  });
  return res.status(200).json({
    problem: problem[0]
  });
});
// function solution(participant, completion) {
//   var answer="";
//   return answer;
// }
router.post("/", async function(req, res, next) {
  console.log(req.body);
  const problem = await Problem.find({
    level: req.body.level
  });
  // var user = await User.find({
  //   name: req.body.user_info.name
  // });
  // if (user.length === 0) {
  //   user_info = await User.create({
  //     name: req.body.user_info.name,
  //     picture: req.body.user_info.picture,
  //     level: 0,
  //     point: 0
  //   });
  //   return res.status(200).json({
  //     userInfo: user_info
  //   });
  // } else {
  //   return res.status(200).json({
  //     userInfo: user[0]
  //   });
  // }
});

module.exports = router;
