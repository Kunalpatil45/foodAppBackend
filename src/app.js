/* const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodroutes = require('./routes/food.routes');
const cors = require("cors")
const path = require('path');
require('dotenv').config();
const app = express();
app.use(cors());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send('Welcome to the Food API');
    
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodroutes);

module.exports = app;   */

// create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');

const cors = require('cors');

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);


module.exports = app; 