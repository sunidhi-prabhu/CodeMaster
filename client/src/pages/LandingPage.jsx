import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {
  const [interest, setInterest] = useState('');
  const [level, setLevel] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/check-interest`, { interest });
      if (res.data.available) {
        localStorage.setItem('interest', interest);
        localStorage.setItem('level', level);
        navigate('/quiz');
      } else {
        alert('Sorry, we only offer coding-related courses. Please enter a coding topic.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <button onClick={() => navigate('/login')} style={{ position: 'absolute', top: 10, right: 10 }}>
        Login
      </button>
      <h1>Welcome to CodeMaster!</h1>
      <p>Learn coding with a quirky twist! Tell us what you want to master.</p>
      <input
        type="text"
        placeholder="What do you want to learn? (e.g., JavaScript)"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        style={{ padding: '10px', margin: '10px' }}
      />
      <select value={level} onChange={(e) => setLevel(e.target.value)} style={{ padding: '10px' }}>
        <option value="">Select your level</option>
        <option value="beginner">Beginner</option>
        <option value="medium">Medium</option>
        <option value="advanced">Advanced</option>
      </select>
      <button onClick={handleSubmit} style={{ padding: '10px 20px' }}>
        Let’s Get Started!
      </button>
    </div>
  );
};

export default LandingPage;