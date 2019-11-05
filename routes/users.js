var express = require("express");
var router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.get("/", function(req, res, next) {
  console.log(res.body);
  res.send("respond with a resource");
});


router.post("/", async function(req, res, next) {
  var user_info;
  var user = await User.find({
    name: req.body.user_info.name
  });
  if (user.length === 0) {
    user_info = await User.create({
      name: req.body.user_info.name,
      picture: req.body.user_info.picture,
      level: 0,
      point: 0
    });
    return res.status(200).json({
      userInfo: user_info
    });
  } else {
    return res.status(200).json({
      userInfo: user[0]
    });
  }
});

module.exports = router;
