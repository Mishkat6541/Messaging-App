import express from 'express';
const app = express()

const PORT = process.env.PORT || 4000;

app.get("/", (req,res) => {
    res.send("Hello");

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `);

});

app.get("/register", (req,res) => {
    res.send("Hello");

});


app.get("/login", (req,res) => {
    res.send("Hello");

});