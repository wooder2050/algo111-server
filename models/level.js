const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const levelSchema = new mongoose.Schema({
  title: {
    type: String
  },
  level: {
    type: Number
  },
  description: {
    type: String
  },
  problem: {
    type: Number
  }
});

module.exports = mongoose.model("Level", levelSchema);
