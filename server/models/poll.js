const mongoose = require("mongoose");
const Schema = mongoose.Schema

const PollSchema = new mongoose.Schema({
  question: String,
  options: [String],
  votes: [{
    user: Schema.Types.ObjectId,
    optionIndex: Number
  }],
  owner: Schema.Types.ObjectId,
  tags: [String],
  open: Boolean,
  addable: Boolean,
  time_created: Number,
  last_edited: Number,
  last_edited_by: String,
  _id: String,
});

// compile model from schema
module.exports = mongoose.model("poll", PollSchema);
