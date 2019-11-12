const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  picture: {
    type: String
  },
  level: {
    type: String
  },
  stage: {
    type: String
  },
  point: {
    type: Number
  },
  todayAuthority: {
    type: Boolean
  },
  lastDate: {
    type: Number
  },
  lastMonth: {
    type: Number
  }
});

module.exports = mongoose.model("User", userSchema);
