const express = require('express');
const authRoute = require('./routes/authRoute');
const session = require('express-session');
const passport = require('passport');
const acLog = require('./utils/activityLog');
const keys = require('./config/keys');
const path = require('path');
const imageRoute = require('./routes/imageRoute');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const friendRoute = require('./routes/friendRoute');

// Create express app
const app = express();
const server = require('http').createServer(app);
acLog("Init Express Server");

// Connect mongodb by mongoose
require('./services/mongoose');

// Passport Google OAuth init
require('./services/passport');

// Setup socket io
require('./services/socketio')(server);

// Expres Middlewares
app.use(session({
  //PENDING: Express Session store/ mongo/ redis
  secret: keys.sessionKey,
  resave: false,
  saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Setup routes
app.use('/auth', authRoute);
app.use('/image', imageRoute);
app.use('/post', postRoute);
app.use('/user', userRoute);
app.use('/friend', friendRoute);

// Setup express static build folder
if (process.env.NODE_ENV === "production") {
  // Retrieve stuff in build
  app.use(express.static('views/build'));

  // Load the index.html if no route is found
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "build", "index.html"));
  });
}

// Server listen
const PORT = process.env.PORT || 5000;
server.listen(PORT);

//TODO: Show message when cannot connect to DB server, tell user to reload or do something
