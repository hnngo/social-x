const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  registerDate: {
    type: Date,
    required: true
  },
  post: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  friend: {
    list: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    requestFromList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    requestToList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  avatar: {
    type: String
  },
  job: {
    type: String
  },
  home: {
    type: String
  },
  birthday: {
    type: Date
  }
});

module.exports = mongoose.model('User', userSchema);
