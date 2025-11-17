import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serverStatus, setServerStatus] = useState('');

  // Test backend connection
  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        setServerStatus('✅ Backend connected successfully!');
      } catch (err) {
        setServerStatus('❌ Backend connection failed. Make sure the server is running on port 5001.');
      }
    };

    checkServerHealth();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/users');
      if (response.data && response.data.data) {
        setUsers(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch users. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    const name = prompt('Enter user name:');
    const email = prompt('Enter user email:');
    
    if (name && email) {
      try {
        const response = await axios.post('/api/users', { name, email });
        if (response.data && response.data.data) {
          setUsers([...users, response.data.data]);
        }
      } catch (err) {
        setError('Failed to add user. Make sure the backend server is running.');
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌟 Dream App</h1>
        <p>Welcome to your full-stack React & Node.js application!</p>
        
        <div className="status-section">
          <h3>Server Status</h3>
          <p className={serverStatus.includes('✅') ? 'success' : 'error'}>
            {serverStatus}
          </p>
        </div>

        <div className="users-section">
          <h3>Users Management</h3>
          <div className="button-group">
            <button onClick={fetchUsers} disabled={loading}>
              {loading ? 'Loading...' : 'Fetch Users'}
            </button>
            <button onClick={addUser}>Add User</button>
          </div>

          {error && <p className="error">{error}</p>}

          {users.length > 0 && (
            <div className="users-list">
              <h4>Users ({users.length}):</h4>
              <ul>
                {users.map((user) => (
                  <li key={user.id}>
                    <strong>{user.name}</strong> - {user.email}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="info-section">
          <h3>🚀 Next Steps</h3>
          <ul className="next-steps">
            <li>✅ Basic React frontend setup</li>
            <li>✅ Node.js backend with Express</li>
            <li>✅ API endpoints for users</li>
            <li>✅ CORS configuration</li>
            <li>🔧 Add database integration</li>
            <li>🔧 Add authentication</li>
            <li>🔧 Add more features</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;