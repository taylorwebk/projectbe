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

module.exports = {
  getUserByToken
}
