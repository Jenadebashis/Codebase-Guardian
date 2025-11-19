import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-5xl font-bold text-primary mb-4">Welcome to My App</h1>
      <p className="text-xl text-text-dim mb-8">The best place to manage your projects and collaborate with your team.</p>
      <div className="space-x-4">
        <Link to="/login" className="bg-primary text-bg font-bold py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors">Login</Link>
        <Link to="/register" className="bg-surface text-text font-bold py-3 px-6 rounded-lg hover:bg-border transition-colors">Register</Link>
      </div>
    </div>
  );
};

export default Home;
