import './style.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 



const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  
  const toggleForm = () => {
    setIsLogin(!isLogin); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const url = isLogin ? 'https://messaging-app-pdi8.onrender.com/login' : 'https://messaging-app-pdi8.onrender.com/register';
    const body = isLogin
      ? { email, password }
      : { name, email, password };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.success) {
      setMessage(data.message || 'Welcome!');
      if (!isLogin) {
        navigate('/');
      } else {
        navigate('/dashboard');
      }
    } else {
      setMessage(data.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <header className="app-header">
        <h1>Mishkat Messaging App</h1>
      </header>

      <div className={`auth-box ${isLogin ? 'login-mode' : 'register-mode'}`}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

// hello person looking at my code :D
export default LoginRegister;
