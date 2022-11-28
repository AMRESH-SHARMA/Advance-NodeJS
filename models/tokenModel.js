const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  accessToken: {
    type: String,
  }
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);

module.exports = mongoose.model("Token", tokenSchema); 