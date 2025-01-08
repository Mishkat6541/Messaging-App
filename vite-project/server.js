import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import session from 'express-session';
import { pool } from './dbConfig.js';
import http from 'http';   // For creating an HTTP server
import WebSocket from 'ws'; // For handling WebSocket connections

const app = express();
const server = http.createServer(app);  // Create HTTP server
const wss = new WebSocket.Server({ server });  // Create WebSocket server

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: false, 
  })
);

app.use(
  cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    credentials: true, 
  })
);

// WebSocket server to handle incoming connections
wss.on('connection', (ws, req) => {
  console.log('New WebSocket connection');
  
  // Middleware for checking if the user is authenticated
  const userId = req.session.userId;
  
  if (!userId) {
    ws.send(JSON.stringify({ error: 'User not authenticated' }));
    ws.close(); // Close the connection if the user is not authenticated
    return;
  }
  
  // Broadcast message to all clients except the sender
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    
    // Broadcast to all other connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// User registration route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email],
    (err, results) => {
      if (err) {
        console.log("1")
        console.log(err);
        return res.json({ success: false, message: 'Database error' });
      }

      if (results.rows.length === 0) {
        pool.query(
          'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, password',
          [name, email, hashedPassword],
          (err, results) => {
            if (err) {
              console.log("2")
              console.log(err);
              return res.json({ success: false, message: 'Database error' });
            }

            return res.json({
              success: true,
              message: 'User registered successfully!',
            });
          }
        );
      } else {
        return res.json({ success: false, message: 'Email already exists' });
      }
    }
  );
});

// User login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email],
    async (err, results) => {
      if (err) {
        return res.json({ success: false, message: 'Database error' });
      }

      if (results.rows.length === 0) {
        return res.json({ success: false, message: 'User not found' });
      }

      const user = results.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        req.session.userId = user.id;  // Store user ID in session
        return res.json({ success: true, message: 'Login successful' });
      } else {
        return res.json({ success: false, message: 'Invalid credentials' });
      }
    }
  );
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
