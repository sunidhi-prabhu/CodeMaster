const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.use('/api/auth', authRoutes);

app.post('/api/check-interest', (req, res) => {
  const { interest } = req.body;
  const codingTopics = ['javascript', 'python', 'java', 'c++'];
  const available = codingTopics.includes(interest.toLowerCase());
  res.json({ available });
});

app.post('/api/quiz', (req, res) => { // no login is used to attempt the quiz
  const { answers, level } = req.body;
  const correctAnswers = {
    beginner: [1, 1, 1, 1, 1], //sample, needs to be modified
    medium: [1, 1, 1, 1, 1],
    advanced: [1, 1, 1, 1, 1],
  };
  let score = 0;
  Object.values(answers).forEach((ans, i) => {
    if (ans === correctAnswers[level][i]) score++;
  });
  res.json({ score });
});

app.post('/api/payment', auth, async (req, res) => { // Keep auth for payment
  const { amount } = req.body;
  const options = {
    amount: amount * 100,
    currency: 'INR',
  };
  const order = await razorpay.orders.create(options);
  res.json(order);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));