const passport = require('passport');
const bcrypt = require('bcrypt');
const acLog = require('../utils/activityLog');
const User = require('../models/User');

// Helper function to get needed information for user
const sendUserInfo = (userTag) => {
  if (userTag) {
    return {
      id: userTag._id,
      name: userTag.name,
      email: userTag.email,
      registerDate: userTag.registerDate,
      post: userTag.post
    };
  }
}

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
  // res.send(req.user);
  if (req.user) {
    res.send(sendUserInfo(req.user));
  } else {
    res.send();
  }
};


// @Method    GET
// @Path      /auth/logout
// @Desc      User log out
const getLogOut = (req, res) => {
  acLog(`User ${req.user.email} has logged out`);
  req.logOut();
  res.send();
  // res.redirect('/');
};


// @Method    POST
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

            // Sign in with new user created
            req.logIn(newUser, (err) => {
              if (err) { return next(err); }
              return res.send(sendUserInfo(newUser));
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


// @Method    POST
// @Path      /auth/signin
// @Desc      User log out
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
      return res.send(sendUserInfo(user))
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
