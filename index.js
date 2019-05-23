const express = require('express');
const authRoute = require('./routes/authRoute');
const session = require('express-session');
const passport = require('passport');
const acLog = require('./utils/activityLog');
const keys = require('./config/keys');

// Create express app
const app = express();
acLog("Init Express Server", "SER");

// Connect mongodb by mongoose
require('./services/mongoose');

// Passport Google OAuth init
require('./services/passport');

// Expres Middlewares
app.use(express.urlencoded({
  extended: false
}));
app.use(session({
  secret: keys.sessionKey,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

// Setup routes
app.get('/', (req, res) => {
  res.send({ route: "index" });
})

app.use('/auth', authRoute);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT);
