import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';
import api from '../utils/api';

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
    <div>
      {user ? (
        <h2>Welcome, {user.username}!</h2>
      ) : (
        <h2>Welcome!</h2>
      )}
      <button onClick={handleLogout}>Logout</button>

      <div>
        <h3>Code Submission Area</h3>
        {/* Placeholder for code submission component */}
        <textarea placeholder="Enter your code here..."></textarea>
        <button>Submit</button>
      </div>

      <div>
        <h3>Scan History</h3>
        {/* Placeholder for scan history component */}
        <p>No scans yet.</p>
      </div>
    </div>
  );
};

export default Dashboard;
