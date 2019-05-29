const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postDate: {
    type: Date,
    required: true
  },
  lastUpdatedDate: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Post', postSchema);
