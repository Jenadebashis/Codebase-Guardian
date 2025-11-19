import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';

const Header = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const authLinks = (
    <ul className="flex items-center space-x-4">
      <li>
        <Link to="/dashboard" className="text-text hover:text-primary transition-colors">Dashboard</Link>
      </li>
      <li>
        <Link to="/users" className="text-text hover:text-primary transition-colors">Users</Link>
      </li>
      <li>
        <a href="#!" onClick={handleLogout} className="text-text hover:text-primary transition-colors">Logout</a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="flex items-center space-x-4">
      <li>
        <Link to="/login" className="text-text hover:text-primary transition-colors">Login</Link>
      </li>
      <li>
        <Link to="/register" className="bg-primary text-bg font-bold py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors">Register</Link>
      </li>
    </ul>
  );

  return (
    <header className="bg-surface border-b border-border shadow-neon-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-bold text-primary">My App</Link>
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    </header>
  );
};

export default Header;
