const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profession: { type: String, required: true },
  preferences: [String],
  email: { type: String }, // Optional
  quizResults: [{ score: Number, course: String, timestamp: Date }],
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('User', userSchema);