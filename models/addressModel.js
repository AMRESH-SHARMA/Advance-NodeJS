const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  pin_code: Number,
  user_address: String,
});

module.exports = mongoose.model("Address", addressSchema); 