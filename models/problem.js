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
  test_case1: {
    input: {
      type: String
    },
    output: {
      type: String
    }
  },
  test_case2: {
    input: {
      type: String
    },
    output: {
      type: String
    }
  },
  test_case3: {
    input: {
      type: String
    },
    output: {
      type: String
    }
  },
  test_case4: {
    input: {
      type: String
    },
    output: {
      type: String
    }
  }
});

module.exports = mongoose.model("Problem", problemSchema);
