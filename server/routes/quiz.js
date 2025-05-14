const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/submit', async (req, res) => {
  const { userId, score, course } = req.body; // e.g., { userId: "123", score: 85, course: "Python" }
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.quizResults.push({ score, course, timestamp: new Date() });
    await user.save();
    res.status(200).json({ message: 'Quiz result saved' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;