const mongoose = require("mongoose");
const Schema = mongoose.Schema

const PollSchema = new mongoose.Schema({
  question: String,
  description: String,
  options: [{
    text: String,
    adder: Schema.Types.ObjectId
  }],
  votes: {
    type: Map,
    of: Array
  },
  owner: Schema.Types.ObjectId,
  tags: [String],
  viewers: [Schema.Types.ObjectId],
  editors: [Schema.Types.ObjectId],
  open: Boolean,
  addable: Boolean,
  time_created: Number,
  last_edited: Number,
  last_edited_by: String,
  deleted: Boolean,
  _id: String,
});

// compile model from schema
module.exports = mongoose.model("poll", PollSchema);
