const mongoose = require("mongoose");

// Message Schema
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
