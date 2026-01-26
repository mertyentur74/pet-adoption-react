const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  adopted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Pet", petSchema);
