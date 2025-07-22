const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/recommendations/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const courses = await Course.find();
    const response = await axios.post('http://localhost:5001/recommend', {
      user: {
        profession: user.profession,
        preferences: user.preferences,
        quiz: user.quizResult
      },
      courses
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;