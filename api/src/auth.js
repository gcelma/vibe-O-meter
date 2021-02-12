require('dotenv').config();
const {AuthenticationError} = require('apollo-server');
const jwt = require('jsonwebtoken');
const { User, Poll } = require('../db/models');
const secret = process.env.JWT_SECRET;

const createToken = ({ id }, expiry) => jwt.sign({ id }, secret, expiry && { expiresIn: expiry });

const checkToken = (token) => jwt.verify(token, secret);

const getUserFromToken = async (token) => {
    const user = jwt.verify(token, secret)
    return await User.findById(user.id).lean()
};

const authenticated = next => (root, args, context, info) => {
  if (!context._id) {
    throw new AuthenticationError('must authenticate')
  }

  return next(root, args, context, info)
};

module.exports = {
  getUserFromToken,
  authenticated,
  createToken,
  checkToken
};