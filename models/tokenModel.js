const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  accessToken: {
    type: String,
  },
  expireAt: {
    type: Date,
    /* Defaults 7 days from now */
    default: new Date(new Date().valueOf() + 604800000),
    /* Remove doc 60 seconds after specified date */
    expires: 60
  }
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);

module.exports = mongoose.model("Token", tokenSchema); 