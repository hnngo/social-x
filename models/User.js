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
      ref: 'Post',
      required: true
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
