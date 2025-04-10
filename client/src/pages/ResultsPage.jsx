import { useNavigate } from 'react-router-dom';

const ResultsPage = () => {
  const navigate = useNavigate();
  const score = localStorage.getItem('score');
  const level = localStorage.getItem('level');

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Your Results</h2>
      <p>You scored {score}/5 at {level} level!</p>
      <p>With CodeMaster, you can go from {level} to mastering coding!</p>
      <button onClick={() => navigate('/courses')}>Explore Courses</button>
    </div>
  );
};

export default ResultsPage;