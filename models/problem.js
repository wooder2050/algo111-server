const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const problemSchema = new mongoose.Schema({
  title: {
    type: String
  },
  initialValue: {
    type: String
  },
  level: {
    type: String
  },
  stage: {
    type: String
  },
  description: {
    type: String
  },
  Limitations: {
    type: Array
  },
  input_example1: {
    type: String
  },
  output_example1: {
    type: String
  },
  input_example2: {
    type: String
  },
  output_example2: {
    type: String
  },
  tests: [
    {
      code: String,
      solution: String
    }
  ],
  notice: {
    type: String
  },
  successPeople: [{ type: ObjectId, ref: "User" }],
  kinds: {
    type: String
  },
  tryingPeople: [{ type: ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Problem", problemSchema);
