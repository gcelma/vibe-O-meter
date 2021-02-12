const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  polls: [{
    type: ObjectId,
    required: true,
    ref: 'Poll'
  }],

  resetLink: {
    type: String,
    default: ''
  }
});

const pollSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true,
    default: Date.now
  },

  owner: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },

  good: {
    type: Number
  },

  mid: {
    type: Number
  },

  bad: {
    type: Number
  }
});

const User = mongoose.model('user', userSchema); 
const Poll = mongoose.model('poll', pollSchema);

module.exports = {
  User,
  Poll
};