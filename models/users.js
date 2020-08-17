const mongoose = require("mongoose");

// Create Schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    organization_id: {
      type: String,
      required: true
    },
    password: {
      type: String,
    },
    last_login: {
      type: Date,
      default: Date.now
    },
    joined: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

module.exports = User = mongoose.model("users", UserSchema);