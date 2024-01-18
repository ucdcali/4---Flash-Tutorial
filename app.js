const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

// Set EJS as the view engine 
app.set('view engine', 'ejs');

// Session setup 
app.use(session({
  secret: 'mysecret', // change this to a random secret string
  resave: false,
  saveUninitialized: false
}));

// Initialize connect-flash
app.use(flash());

// Middleware to make flash messages available in all views
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

// Route for Home Page
app.get('/', (req, res) => {
  res.render('index');
});

// Controller that sets an info flash message
app.get('/set-info', (req, res) => {
  const summary = 'This is an informational message.';
  req.flash('info', summary);
  res.redirect('/');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`)
});