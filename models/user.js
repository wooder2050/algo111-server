const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  picture: {
    type: String
  },
  level: {
    type: Number
  },
  point: {
    type: Number
  }
});

module.exports = mongoose.model("User", userSchema);
