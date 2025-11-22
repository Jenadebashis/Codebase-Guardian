import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';
import api from '../utils/api';
import ScanHistory from '../components/ScanHistory';

const Dashboard = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [user, setUser] = useState(null);
  const [codeSnippet, setCodeSnippet] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get('/auth/user');
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/scans', { codeSnippet, language });
      navigate(`/scan/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during the scan.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        {user ? (
          <h2 className="text-3xl font-bold text-primary">Welcome, {user.username}!</h2>
        ) : (
          <h2 className="text-3xl font-bold text-primary">Welcome!</h2>
        )}
        <button onClick={handleLogout} className="bg-danger text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors">Logout</button>
      </div>

      <div className="bg-surface p-6 rounded-xl-2 shadow-neon-md">
        <h3 className="text-2xl font-bold text-primary mb-4">Code Submission Area</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="language" className="block text-sm font-medium text-text-dim mb-1">Language</label>
            <input 
              id="language"
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-bg border border-border rounded-lg p-2 text-text font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <textarea 
            className="w-full h-60 bg-bg border border-border rounded-lg p-4 text-text font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your code here..."
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
          />
           {error && <p className="text-danger mt-2">{error}</p>}
          <button 
            type="submit"
            className="mt-4 bg-primary text-bg font-bold py-2 px-6 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
            disabled={loading || !codeSnippet.trim()}
          >
            {loading ? 'Scanning...' : 'Submit'}
          </button>
        </form>
      </div>

      <ScanHistory />
    </div>
  );
};

export default Dashboard;
