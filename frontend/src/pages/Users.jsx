import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUsers } from '../redux/actions/userActions';

const Users = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUsers());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-surface p-6 rounded-xl-2 shadow-neon-md">
      <h2 className="text-3xl font-bold text-primary mb-6">Users</h2>
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user._id} className="bg-bg border border-border p-4 rounded-lg flex justify-between items-center shadow-neon-sm">
            <span className="text-text">{user.username}</span>
            <span className="text-text-dim text-sm">{user._id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
