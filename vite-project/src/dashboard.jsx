import React from 'react';
import "./dashboard.css";
import { useNavigate } from 'react-router-dom'; 

const Dashboard = () => {
  const navigate = useNavigate();


  return (
    <div className="dashboard">
      <header>
        <h1>Welcome to your Dashboard</h1>
      </header>

      <section className="dashboard-info">
        <h2>Your Information</h2>
        <p>Here you can manage your account details, view your statistics, and more!</p>
      </section>

      <section className="dashboard-actions">
        <h3>Quick Actions</h3>
        <ul>
          <li>
            <button onClick={() => alert("Redirecting to profile")}>Go to Profile</button>
          </li>
          <li>
            <button onClick={() => alert("Redirecting to settings")}>Account Settings</button>
          </li>
          <li>
            <button onClick={() => navigate('/') }>Log Out</button>
          </li>
        </ul>
      </section>

      <footer className="dashboard-footer">
        <p>&copy; 2024 By Mishkat Mazumder </p>
      </footer>
    </div>
  );
};

export default Dashboard;
