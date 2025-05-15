// server/models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }], // e.g., ["Python", "video"]
  profession: [{ type: String }], // e.g., ["developer", "data scientist"]
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);