const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

function toLower(str) {
  return str.toLowerCase();
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a name"],
  },
  pass: {
    type: String,
    select: false,
    required: true,
  },
  email: {
    type: String,
    set: toLower,
    required: true,
    unique: [true, "Email already exists"]
  },

});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema); 