const mongoose = require("mongoose");
const Schema = mongoose.Schema
const Poll = require("./poll");

const UserSchema = new Schema({
  displayName: String,
  userTag: String,
  email: String,
  googleID: String,
  myPolls: [{
    _id: String,
  }],
  sharedPolls: [{
    _id: String,
  }],
  picture: Number,
  picture_link: String,
  friends: [Schema.Types.ObjectId]
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
