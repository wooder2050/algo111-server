const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const codeSchema = new mongoose.Schema({
  userName: {
    type: String
  },
  user_id: {
    type: ObjectId
  },
  level: {
    type: Number
  },
  stage: {
    type: Number
  },
  code: {
    type: String
  },
  title: {
    type: String
  }
});

module.exports = mongoose.model("Code", codeSchema);
