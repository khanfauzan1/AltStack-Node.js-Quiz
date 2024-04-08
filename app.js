const express = require('express');
const app = express();
const path = require('path');
const quizRoutes = require('./routes/quiz');
const dotenv =require("dotenv")
const session = require('express-session');

// Configure session middleware
dotenv.config();

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Parse request body
app.use(express.urlencoded({ extended: true }));

// Quiz routes
app.use('/quiz', quizRoutes);

// Render the index page
app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});