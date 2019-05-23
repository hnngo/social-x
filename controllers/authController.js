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

            // Send back to client only needed information
            //PENDING: Send back posts or comments later
            //PENDING: Decide to get sign in or just let them enter again
            res.send({
              name: newUser.name,
              email: newUser.email
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

const postSignInWithEmailAndPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    acLog("Unsuccesful post sign in with invalid field(s)");
    return res.status(400).send({ msg: "Invalid input field(s)" });
  }

  // Check if there is exiting a user
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      acLog("Anonymous try to login to unregistered user");
      return res.status(400).send({ msg: "User is not found" });
    }

    // Check if user input right password
    bcrypt.compare(password, existingUser.password, (err, isMatch) => {
      if (!isMatch) {
        acLog(`${existingUser.email} login with wrong password, access denied`);

        return res.status(400).send({ msg: "Password is not match" });
      }

      acLog(`${existingUser.email} login successfully`);
      res.send({
        name: existingUser.name,
        email: existingUser.email
      });
    })
  } catch (err) {
    acLog(err);
  }
}

module.exports = {
  getGoogleOAuth,
  getGoogleOAuthCallback,
  getCurrentUser,
  getLogOut,
  postSignUpWithEmailAndPassword,
  postSignInWithEmailAndPassword
};
