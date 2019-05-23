const mongoose = require('mongoose');
const keys = require('../config/keys');
const aclog = require('../utils/activityLog');

mongoose.connect(keys.mongoDbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true
}, (err) => {
  if (!err) {
    aclog("MongoDB Connected", "Mongoose")
  } else {
    console.log(err)
  }
});
