import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
// import LoginPage from './pages/LoginPage';
// import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
// import CoursesPage from './pages/CoursesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* { <Route path="/quiz" element={<QuizPage />} /> } */}
        <Route path="/results" element={<ResultsPage />} />
        {/* <Route path="/courses" element={<CoursesPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;