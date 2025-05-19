import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = parseInt(localStorage.getItem('quizScore'), 10);
   const recommendations = {
    low: {
      concepts: [
        { title: "React Components & Props", link: "https://reactjs.org/docs/components-and-props.html" },
        { title: "State Management Fundamentals", link: "https://reactjs.org/docs/state-and-lifecycle.html" },
        { title: "Basic Hooks (useState, useEffect)", link: "https://reactjs.org/docs/hooks-intro.html" }
      ],
      projects: [
        {
          title: "Todo List with Local Storage",
          description: "Implement CRUD operations with persistence",
          tips: "Focus on proper state organization and component structure"
        },
        {
          title: "Simple Calculator",
          description: "Build math operations with error handling",
          tips: "Practice lifting state up between components"
        },
        {
          title: "Weather Dashboard",
          description: "Integrate with a public weather API",
          tips: "Learn async operations and loading states"
        }
      ],
      motivation: "Every expert was once a beginner. Your journey starts here, and with practice, you'll reach new heights!"
    },
    medium: {
      concepts: [
        { title: "Context API & Prop Drilling Solutions", link: "https://reactjs.org/docs/context.html" },
        { title: "Performance Optimization", link: "https://reactjs.org/docs/optimizing-performance.html" },
        { title: "Advanced Hooks Patterns", link: "https://reactjs.org/docs/hooks-custom.html" }
      ],
      projects: [
        {
          title: "E-commerce Product Listing",
          description: "Implement search, filter, and cart functionality",
          tips: "Focus on complex state management and composition"
        },
        {
          title: "Real-time Chat Application",
          description: "Use WebSockets for instant messaging",
          tips: "Practice event handling and data flow optimization"
        },
        {
          title: "Personal Finance Tracker",
          description: "Create visual charts for expense tracking",
          tips: "Learn data visualization integration"
        }
      ],
      motivation: "Solid progress! You're building a strong foundation. Keep pushing your limits with more complex projects."
    },
    high: {
      concepts: [
        { title: "Advanced State Management (Redux/Recoil)", link: "https://redux.js.org/introduction/getting-started" },
        { title: "Performance Profiling & Optimization", link: "https://reactjs.org/docs/profiler.html" },
        { title: "SSR with Next.js", link: "https://nextjs.org/learn/basics/create-nextjs-app" }
      ],
      projects: [
        {
          title: "Full-stack Social Media Platform",
          description: "Implement authentication and real-time features",
          tips: "Focus on security best practices and API design"
        },
        {
          title: "Stock Trading Dashboard",
          description: "Integrate real-time market data streams",
          tips: "Optimize for high-frequency updates and rendering"
        },
        {
          title: "Collaborative Code Editor",
          description: "Implement real-time collaboration features",
          tips: "Explore operational transformation patterns"
        }
      ],
      motivation: "Outstanding! You're ready for advanced challenges. Keep innovating and pushing the boundaries of what's possible."
    }
  };

  const getRecommendationLevel = () => {
    if (score <= 3) return 'low';
    if (score <= 7) return 'medium';
    return 'high';
  };

  const { concepts, projects, motivation } = recommendations[getRecommendationLevel()];

  // Wave component with updated colors
  const Wave = ({ flip = false, color = '#00d2ff' }) => (
    <svg
      viewBox="0 0 1440 320"
      className={`w-full ${flip ? 'transform rotate-180' : ''}`}
    >
      <path
        fill={color}
        d="M0,128L48,138.7C96,149,192,171,288,170.7C384,171,480,149,576,133.3C672,117,768,107,864,117.3C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      >
        <animate
          attributeName="d"
          values="M0,128L48,138.7C96,149,192,171,288,170.7C384,171,480,149,576,133.3C672,117,768,107,864,117.3C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
          M0,128L48,122.7C96,117,192,107,288,101.3C384,96,480,96,576,117.3C672,139,768,181,864,170.7C960,160,1056,96,1152,90.7C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
          M0,128L48,138.7C96,149,192,171,288,170.7C384,171,480,149,576,133.3C672,117,768,107,864,117.3C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          dur="12s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Top Wave  */}
      <Wave color="#8b5cf6" />

      <div className="container mx-auto px-4 py-20 pb-65 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-2xl opacity-30 rounded-full" />
            <h1 className="text-6xl font-bold mb-4 relative">{score}/10</h1>
          </div>
          <p className="text-xl text-gray-400 mb-4">
            {score <= 3
              ? 'Foundation Building Stage'
              : score <= 7
              ? 'Progressive Development Phase'
              : 'Advanced Proficiency Level'}
          </p>
          <p className="text-lg text-gray-300">{motivation}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Concepts Section */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-16">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Recommended Learning Path
            </h2>
            <div className="grid gap-6">
              {concepts.map((concept, i) => (
                <a
                  key={i}
                  href={concept.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{concept.title}</span>
                    <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      ↗
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Real-World Projects
            </h2>
            <div className="grid gap-8">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800"
                >
                  <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="p-4 bg-black/30 rounded-lg">
                    <span className="text-cyan-500">Pro Tip →</span> {project.tips}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Back to Home Button */}
        <div className="mt-12 mb-24 flex justify-start">
          <button
            onClick={() => navigate('/')}
            className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full group"
          >
            <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
            <span className="relative">Back to Home</span>
          </button>
        </div>
      </div>

      {/* Bottom Wave with vibrant purple */}
      <div className="absolute bottom-0 w-full">
        <Wave flip={true} color="#8b5cf6" />
      </div>
    </div>
  );
};

export default ResultsPage;