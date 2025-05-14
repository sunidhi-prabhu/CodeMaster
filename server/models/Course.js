const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tags: [String], // e.g., ["coding", "video", "advanced"]
  profession: [String], // e.g., ["developer", "designer"]
});

module.exports = mongoose.model('Course', courseSchema);