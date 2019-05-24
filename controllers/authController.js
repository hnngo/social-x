const passport = require('passport');
const bcrypt = require('bcrypt');
const acLog = require('../utils/activityLog');
const User = require('../models/User');

// @Method    GET
// @Path      /auth/google
// @Desc      Google OAuth with passport
const getGoogleOAuth = passport.authenticate(
  'google',
  {
    scope: ['profile', 'email']
  }
);


// @Method    GET
// @Path      /auth/google/callback
// @Desc      Google OAuth callback url
const getGoogleOAuthCallback = passport.authenticate('google');


// @Method    GET
// @Path      /auth/current_user
// @Desc      Get current user login
const getCurrentUser = (req, res) => {
  res.send(req.user);
};


// @Method    GET
// @Path      /auth/logout
// @Desc      User log out
const getLogOut = (req, res) => {
  acLog(`User ${req.user.email} has logged out`);
  req.logOut();
  res.redirect('/');
};

// @Method    GET
// @Path      /auth/singup
// @Desc      User log out
const postSignUpWithEmailAndPassword = async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;

  // Check if POST method receive enough field
  if (!name || !email || !password) {
    acLog("Unsuccesful post sign up with invalid field(s)");
    return res.status(400).send({ msg: "Invalid input field(s)" });
  }

  try {
    // Check if email is created
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Existing user, return error
      acLog(`Anonymous tried to created existing user ${existingUser.email}`);

      return res.status(400).send({ msg: "User is already existed" });
    }

    // Hash password with bcrypt
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hashPwd) => {
        // Create new User
        new User({
          name,
          email,
          password: hashPwd,
          registerDate: new Date()
        }).save()
          .then(newUser => {
            acLog(`New user created ${newUser.email}`);

            //PENDING: Send back posts or comments later
            //PENDING: Decide to get sign in or just let them enter again
            res.send({
              name: newUser.name,
              email: newUser.email,
              registerDate: newUser.registerDate
            });
          })
          .catch(err => acLog(err));
      });
    });
  } catch (err) {
    acLog(err);
    return res.status(400).send({ msg: err });
  }
};

const postSignInWithEmailAndPassword = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // Check if err then send back to client
    if (err) {
      return res.json({ message: error });
    }

    if (!user) {
      return res.json({ message: info.message });
    }

    // Perform sign in session
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.send({
        name: user.name,
        email: user.email,
        registerDate: user.registerDate
      })
    });
  })(req, res, next);
};

module.exports = {
  getGoogleOAuth,
  getGoogleOAuthCallback,
  getCurrentUser,
  getLogOut,
  postSignUpWithEmailAndPassword,
  postSignInWithEmailAndPassword
};
