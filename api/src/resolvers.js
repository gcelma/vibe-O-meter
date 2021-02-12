const { User, Poll } = require('../db/models');
const { authenticated, createToken, checkToken } = require('./auth');
const { mailer } = require('./utils/mailer');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  Query: {
    getUsers: authenticated(async () => await User.find({}).exec()),
    getPolls: authenticated(async () => await Poll.find({}).exec()),
    getUserPolls: authenticated(async (_, __, { _id }) => {
        let response = await User.findById(_id).lean();
        let polls = response.polls.map(async poll => await Poll.findById(poll));
        return polls;
    }),
  },
  Mutation: {
    createUser: async(_, { input: { username, email, password, passwordConfirmation } }) => {
      // check if password is correct
      if (password !== passwordConfirmation) throw new Error('passwords do not match');
      // check if user already exist
      const user = await User.findOne({ email });
      if (user) throw new Error(`user with email ${email} already exists`);
      const hash = await bcrypt.hash(password, 10);
      try {
          let response = await User.create({ username, email, password: hash });
          return response;
      } catch(e) {
          return e.message;
      }
    },
    authenticateUser: async (_, { input: { email, password } }) => {
      // check if user exist
      const user = await User.findOne({ email });
      if (!user) throw new Error(`user with email ${email} not found`);
      // check if password is correct
      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error('wrong credentials');
      const token = createToken(user);
      return { token, user };
    },
    createPoll: authenticated(async(_, { input }, { _id }) => {
      try {
          return await Poll.create({...input, owner: _id}).then(poll => {
              User.findById(_id)
                  .then(user => {
                      user.polls.push(poll._id);
                      return user.save();
                  });
              return poll;
          });
      } catch(e) {
          return e.message;
      }
    }),
    deletePoll: authenticated((_, { input }, { _id }) => {
      return Promise.all([
          User.findById(_id)
              .then(user => {
                  let msg = user.polls.filter(m => m.toString() !== input)
                  user.polls = msg
                  user.save()
                  return user
              }),
          Poll.findByIdAndDelete(input)
              .then(poll => poll)
      ]).then(values => values[1])
    }),
    createResetLink: async (_, { input: { email } }) => {
      // check if user exist
      const user = await User.findOne({ email });
      if (user) {
          // create recovery token
          const token = createToken(user, '20m');
          // save token in database
          const updateToken = await user.updateOne({ resetLink: token });
          if(!updateToken) {
            return {sent: false}
          }
          // send email with url&token
          mailer(email, token);
          return { sent: true }
      } else {
          return {sent: false}
      }
    },
    resetPassword: async (_, { input: { newPassword, token } }) => {
      // check token validity
      const check = await checkToken(token);
      if(check) {
        // check if user exist
        const user = await User.findOne({ resetLink: token });
        if(user) {
          const hash = await bcrypt.hash(newPassword, 10);
          user.password = hash;
          user.resetLink = null;
          user.save();
          return { passwordReseted: true };
        } else {
            return { passwordReseted: false }
        }
      } else {
          return { passwordReseted: false }
      }
    }
  }
}
  