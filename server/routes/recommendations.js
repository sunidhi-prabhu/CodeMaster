const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const User = require('../models/User');
const Course = require('../models/Course');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Prepare data for OpenAI
    const latestQuiz = user.quizResults.length > 0 ? user.quizResults[user.quizResults.length - 1] : null;
    const prompt = `
      You are an expert in e-learning course recommendations. Based on the following user data, suggest 3-5 relevant coding courses:
      - Profession: ${user.profession}
      - Preferences: ${user.preferences.join(', ')}
      - Latest Quiz: ${latestQuiz ? `Score: ${latestQuiz.score}%, Course: ${latestQuiz.course}` : 'No quiz taken'}
      Provide a brief explanation for each recommendation. Return the response in JSON format with fields: title, description, and reason.
    `;

    // Call OpenAI API
    console.log('Sending OpenAI prompt:', prompt); // Debug
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });
    console.log('OpenAI response:', completion.choices[0].message.content); // Debug

    let recommendations = JSON.parse(completion.choices[0].message.content);

    // Fallback: If OpenAI fails, use rule-based suggestions
    if (!recommendations || recommendations.length === 0) {
      console.log('Using MongoDB fallback'); // Debug
      recommendations = await Course.find({
        $or: [
          { tags: { $in: user.preferences } },
          { profession: user.profession }
        ]
      }).limit(5);
    }

    res.json(recommendations);
  } catch (err) {
    console.error('Recommendation error:', err.message, err.stack); // Detailed error
    res.status(500).json({ message: 'Error generating recommendations', error: err.message });
  }
});

module.exports = router;