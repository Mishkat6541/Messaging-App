import express from 'express';
const app = express()
import cors from 'cors';

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'localhost:5173', // Allow requests from this origin (your frontend)
    methods: ['GET', 'POST'], // Allow only GET and POST methods
    credentials: true, // Allow credentials like cookies (optional)
  }));


app.get("/", (req,res) => {
    res.send("Hello");

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `);

});

app.post("/register", (req,res) => {
    console.log(req.body);
    res.send("Hello registered");

});


app.post("/login", (req,res) => {
    console.log(req.body);
    res.send("Hello logined ");

});