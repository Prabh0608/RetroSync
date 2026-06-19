const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  roomID: { type: String, required: true, index: true },
  column: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: String, default: "anonymous" },
  votes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Note", NoteSchema);
