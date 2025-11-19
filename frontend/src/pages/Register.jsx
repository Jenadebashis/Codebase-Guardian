import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(username, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-surface p-8 rounded-xl-2 shadow-neon-lg">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-text-dim block mb-2">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-bg border border-border rounded-lg p-3 text-text focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-text-dim block mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-bg border border-border rounded-lg p-3 text-text focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <button type="submit" className="w-full bg-primary text-bg font-bold py-3 rounded-lg hover:bg-primary-600 transition-colors">Register</button>
        </form>
        {error && <p className="mt-4 text-danger text-center">{error.message}</p>}
      </div>
    </div>
  );
};

export default Register;
