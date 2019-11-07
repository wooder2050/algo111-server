const mongoose = require("mongoose");

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
      code : String,
      solution : String
    }
  ]
});

module.exports = mongoose.model("Problem", problemSchema);
