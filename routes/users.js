var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Problem = require("../models/problem");
const Level = require("../models/level");
const Code = require("../models/code");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/chance", async function(req, res, next) {
  if (req.body.chance > 0) {
    await User.update(
      {
        name: req.body.name
      },
      {
        problemChance: req.body.chance - 1
      }
    );
  } else if (req.body.chance === 0) {
    await User.update(
      {
        name: req.body.name
      },
      {
        todayAuthority: false,
        problemChance: req.body.chance
      }
    );
  }
  var user = await User.find({
    name: req.body.name
  });
  return res.status(200).json({
    userInfo: user[0]
  });
});

router.post("/date", async function(req, res) {
  var today = new Date();
  var todayDate = today.getDate();
  var todayMonth = today.getMonth();
  await User.update(
    {
      name: req.body.name
    },
    {
      todayAuthority: false,
      lastMouth: todayMonth,
      lastDate: todayDate
    }
  );
  var user = await User.find({
    name: req.body.name
  });
  return res.status(200).json({
    userInfo: user[0]
  });
});

router.post("/", async function(req, res) {
  var user_info;
  var user = await User.find({
    name: req.body.user_info.name
  });
  var codeAll = await Code.find({});
  var levelAll = await Level.find({}).sort({ level: "asc" });
  var userAll = await User.find({})
    .sort({ point: "desc" })
    .limit(10);
  var today = new Date();
  var todayDate = today.getDate();
  var todayMonth = today.getMonth();
  if (user.length === 0) {
    user_info = await User.create({
      name: req.body.user_info.name,
      picture: req.body.user_info.picture,
      level: "1",
      stage: "1",
      point: 0,
      todayAuthority: true,
      lastMonth: todayMonth,
      lastDate: todayDate,
      problemChance: 5
    });
    return res.status(200).json({
      userInfo: user_info,
      userAll: userAll,
      levelAll: levelAll,
      codeAll: codeAll
    });
  } else {
    if (user[0].lastDate === todayDate && user[0].lastMonth === todayMonth) {
      return res.status(200).json({
        userInfo: user[0],
        userAll: userAll,
        levelAll: levelAll,
        codeAll: codeAll
      });
    } else {
      await User.update(
        {
          name: req.body.user_info.name
        },
        {
          todayAuthority: true,
          lastMonth: todayMonth,
          lastDate: todayDate,
          problemChance: 5
        }
      );
      var newUser = await User.find({
        name: req.body.user_info.name
      });
      return res.status(200).json({
        userInfo: newUser[0],
        userAll: userAll,
        levelAll: levelAll,
        codeAll: codeAll
      });
    }
  }
});

module.exports = router;
