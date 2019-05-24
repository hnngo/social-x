const acLog = require('./activityLog');

const isLogin = (req, res, next) => {
  if (!req.user) {
    acLog("Anonymous tried to log out")
    return res.status(401).send({ msg: "You are not log in" });
  }

  next();
}

const isNotLogin = (req, res, next) => {
  if (req.user) {
    acLog("Anonymous tried to log out")
    return res.status(401).send({ msg: "You are not log in" });
  }

  next();
}


module.exports = {
  isLogin,
  isNotLogin
};