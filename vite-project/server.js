import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import session from 'express-session';
import { pool } from './dbConfig.js'; 

import { WebSocketServer } from 'ws';  

const app = express();
const PORT = process.env.PORT || 4000;

const wss = new WebSocketServer({ port: 5000 }); 

const clients = [];

wss.on('connection', (socket) => {
  console.log('New client connected');
  
  clients.push(socket);

  socket.on('message', (message) => {
    console.log('Received message:', message);
    const text = message.toString('utf8');
    console.log('Received message:', text);
    clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(text); 
      }
    });
  });

  socket.on('close', () => {
    console.log('Client disconnected');
    const index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1); 
    }
  });
});

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
    origin: 'https://messaging-app-1-isok.onrender.com', 
    methods: ['GET', 'POST'],
    credentials: true, 
  })
);

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email],
    (err, results) => {
      if (err) {
        return res.json({ success: false, message: 'Database error' });
      }

      if (results.rows.length === 0) {
        pool.query(
          'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, password',
          [name, email, hashedPassword],
          (err, results) => {
            if (err) {
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
        req.session.userId = user.id; 
        return res.json({ success: true, message: 'Login successful' });
      } else {
        return res.json({ success: false, message: 'Invalid credentials' });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
