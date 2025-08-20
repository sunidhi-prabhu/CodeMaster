import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LandingPage3 from './pages/LandingPage3';
// import LoginPage from './pages/LoginPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
// import CoursesPage from './pages/CoursesPage';
import ChatPage from './features/chat/pages/ChatPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage3 />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        { <Route path="/quiz" element={<QuizPage />} /> }
        <Route path="/results" element={<ResultsPage />} />
        {/* <Route path="/courses" element={<CoursesPage />} /> */}
        <Route path="/chatbot" element={<ChatPage />} />

      </Routes>
    </Router>
  );
}

export default App;