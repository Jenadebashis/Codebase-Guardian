import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';
import api from '../utils/api';
import ScanHistory from '../components/ScanHistory';

const Dashboard = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

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
        {/* Placeholder for code submission component */}
        <textarea className="w-full h-40 bg-bg border border-border rounded-lg p-4 text-text font-mono focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your code here..."></textarea>
        <button className="mt-4 bg-primary text-bg font-bold py-2 px-6 rounded-lg hover:bg-primary-600 transition-colors">Submit</button>
      </div>

      <ScanHistory />
    </div>
  );
};

export default Dashboard;
