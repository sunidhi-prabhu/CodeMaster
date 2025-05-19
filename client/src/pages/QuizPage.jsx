import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const questionsBank = [
  {
    id: 1,
    question: "What is the correct way to render a list in React?",
    options: [
      "Using map function with keys",
      "Using a for loop inside JSX",
      "Using while loop directly",
      "Using reduce to render elements"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "What is the virtual DOM in React?",
    options: [
      "A lightweight copy of the actual DOM",
      "A direct manipulation of HTML",
      "A CSS optimization technique",
      "A JavaScript array of elements"
    ],
    correctAnswer: 0
  },
  {
    id: 3,
    question: "What does 'let' provide over 'var' in JavaScript?",
    options: [
      "Block scope instead of function scope",
      "Function scope instead of block scope",
      "Global scope only",
      "No hoisting unlike var"
    ],
    correctAnswer: 0
  },
  {
    id: 4,
    question: "What is a closure in JavaScript?",
    options: [
      "A function with access to its outer scope",
      "A method to terminate a function",
      "A loop that closes variables",
      "An error handling mechanism"
    ],
    correctAnswer: 0
  },
  {
    id: 5,
    question: "What is the purpose of useEffect in React?",
    options: [
      "To handle side effects in components",
      "To manage component state",
      "To render JSX directly",
      "To handle event listeners only"
    ],
    correctAnswer: 0
  },
  {
    id: 6,
    question: "How do you declare a constant in JavaScript?",
    options: [
      "Using const keyword",
      "Using let keyword",
      "Using var keyword",
      "Using static keyword"
    ],
    correctAnswer: 0
  },
  {
    id: 7,
    question: "What is JSX in React?",
    options: [
      "A syntax extension for JavaScript",
      "A new version of HTML",
      "A CSS preprocessor",
      "A JavaScript library"
    ],
    correctAnswer: 0
  },
  {
    id: 8,
    question: "What does event.preventDefault() do?",
    options: [
      "Stops the default action of an event",
      "Triggers the default action",
      "Prevents event bubbling",
      "Stops all event listeners"
    ],
    correctAnswer: 0
  },
  {
    id: 9,
    question: "What is a React component?",
    options: [
      "A reusable piece of UI",
      "A CSS styling block",
      "A database query",
      "A server-side function"
    ],
    correctAnswer: 0
  },
  {
    id: 10,
    question: "What is the spread operator in JavaScript?",
    options: [
      "Expands elements of an array or object",
      "Combines multiple arrays into one",
      "Reduces an array to a single value",
      "Clones a function"
    ],
    correctAnswer: 0
  }
  // In a real implementation, expand this to 100 unique, professional questions
];


const QuizPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentSet, setCurrentSet] = useState(0);

  // Select 10 random questions on mount
  useEffect(() => {
    const shuffled = [...questionsBank].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled.slice(0, 10));
  }, []);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return  marshmallow0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (qId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    let score = 0;
    currentQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    localStorage.setItem('quizScore', score);
    navigate('/results'); // Ensure you have a results page
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSets = currentQuestions.length; // 10 questions, 1 per page
  const currentQuestion = currentQuestions[currentSet];

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-8 relative overflow-hidden">
      {/* Twinkling Stars Animation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-50 animate-twinkle"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
            Developer Assessment
          </h1>
        </div>

        {/* Timer */}
        <div className="flex justify-end mb-6">
          <div className="text-xl font-mono bg-gray-800 px-4 py-2 rounded">
            ⏳ {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question Card */}
        {currentQuestion && (
          <div className="flex justify-center">
            <div className="bg-gray-900 rounded-xl p-6 shadow-xl w-full max-w-3xl">
              <div className="mb-4 text-gray-400">Question {currentSet + 1}/10</div>
              <h3 className="text-xl mb-6 text-white">{currentQuestion.question}</h3>
              <div className="space-y-4">
                {currentQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswerSelect(currentQuestion.id, i)}
                    className={`w-full p-4 text-left rounded-lg transition-all ${
                      selectedAnswers[currentQuestion.id] === i
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentSet((prev) => Math.max(0, prev - 1))}
            disabled={currentSet === 0}
            className="px-6 py-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white"
          >
            Previous
          </button>
          <button
            onClick={() =>
              currentSet < totalSets - 1 ? setCurrentSet((prev) => prev + 1) : handleSubmit()
            }
            className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 text-white"
          >
            {currentSet < totalSets - 1 ? 'Next Question' : 'Submit Test'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;