const mongoose = require("mongoose");
const Schema = mongoose.Schema
const Poll = require("./poll");

const UserSchema = new Schema({
  displayName: String,
  userTag: String,
  googleID: String,
  myPolls: [Schema.Types.ObjectId],
  sharedPolls: [Schema.Types.ObjectId],
  picture: Number,
  friends: [Schema.Types.ObjectId]
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
