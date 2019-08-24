const jwt = require('jsonwebtoken')

require('dotenv/config')

const User = require('../models/User')

const getUserByToken = (token) => {
  if (token) {
    const { email } = jwt.verify(token, process.env.JWT_SECRET)
    const user = User.findOne({ email })
    if (user) {
      return user
    }
    return null
  }
  return null
}

const errorTypes = {
  loginError: 'LOGIN ERROR',
  notAuthError: 'NO AUTH ERROR',
  notValidEmailError: 'NOT VALID EMAIL ERROR',
  notValidArguments: 'NOT VALID ARGS'
}

module.exports = {
  getUserByToken,
  errorTypes
}
