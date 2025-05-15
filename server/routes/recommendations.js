// server/routes/recommendations.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');
const Course = require('../models/Course');

router.get('/:userId', async (req, res) => {
  try {
    // Fetch user data
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Prepare user profile
    const latestQuiz = user.quizResults.length > 0 ? user.quizResults[user.quizResults.length - 1] : null;
    const userProfile = {
      profession: user.profession,
      preferences: user.preferences,
      quiz: latestQuiz ? { score: latestQuiz.score, course: latestQuiz.course } : null
    };

    // Fetch all courses
    const courses = await Course.find();

    // Call Python BERT microservice
    const response = await axios.post('http://localhost:5001/recommend', {
      user: userProfile,
      courses: courses.map(c => ({
        id: c._id.toString(),
        title: c.title,
        description: c.description,
        tags: c.tags,
        profession: c.profession
      }))
    });

    // Extract recommended course IDs
    const recommendedIds = response.data.recommendations;
    const recommendations = await Course.find({ _id: { $in: recommendedIds } });

    // Fallback: Rule-based suggestions if BERT fails
    if (!recommendations || recommendations.length === 0) {
      console.log('Using MongoDB fallback');
      const fallback = await Course.find({
        $or: [
          { tags: { $in: user.preferences } },
          { profession: user.profession }
        ]
      }).limit(5);
      return res.json(fallback);
    }

    res.json(recommendations);
  } catch (err) {
    console.error('Recommendation error:', err.message, err.stack);
    res.status(500).json({ message: 'Error generating recommendations', error: err.message });
  }
});

module.exports = router;