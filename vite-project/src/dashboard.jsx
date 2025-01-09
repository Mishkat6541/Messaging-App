import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null); // WebSocket state
  const navigate = useNavigate();

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket('ws://localhost:5000');
    
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      // Append received message to the list
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    setSocket(ws); // Save the WebSocket instance in state

    return () => {
      ws.close(); // Clean up WebSocket connection on component unmount
    };
  }, []);

  const handleSendMessage = () => {
    if (socket && message) {
      socket.send(message); // Send message to the server
      setMessage(''); // Clear input field
    }
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Welcome to your Dashboard</h1>
      </header>

      <section className="dashboard-info">
        <h2>Your Information</h2>
        <p>Here you can manage your account details.</p>
      </section>

      <section className="dashboard-actions">
        <h3>Quick Actions</h3>
        <ul>
          <li>
            <button onClick={() => navigate('/')}>Log Out</button>
          </li>
        </ul>
      </section>

      <section className="dashboard-messages">
        <h3>Messages</h3>
        <div className="messages-list">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              {msg}
            </div>
          ))}
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </section>

      <footer className="dashboard-footer">
        <p>&copy; 2024 By Mishkat Mazumder</p>
      </footer>
    </div>
  );
};

export default Dashboard;
