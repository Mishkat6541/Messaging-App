import './style.css';
import React, { useState } from 'react';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <header className="app-header">
        <h1>Mishkat Messaging App</h1>
      </header>

      <div className={`auth-box ${isLogin ? 'login-mode' : 'register-mode'}`}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>

        <form
          action={isLogin ? "http://localhost:4000/login" : "http://localhost:4000/register"}
          method="POST"
        >
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name" // Corrected the name to 'name'
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email" // Corrected the name to 'email'
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password" // Correctly named 'password'
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={toggleForm} className="toggle-link">
            {isLogin ? ' Register here' : ' Login here'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
