const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv/config')

const User = require('../../models/User')

module.exports = {
  Query: {
    allUsers: (_, __, { user }) => {
      
      return User.find()
    },
    getUser: (_, { id }) => User.findById(id)
  },
  Mutation: {
    createUser: async (_, { user }) => {
      const hashedPass = await bcrypt.hash(user.password, 10)
      const newUser = Object.assign(
        {},
        user,
        { password: hashedPass }
      )
      return User.create(newUser)
    },
    login: async (_, { data }) => {
      const user = await User.findOne({ email: data.email })
      const isValidPass = await bcrypt.compare(data.password, user.password)
      if (isValidPass) {
        return jwt.sign({ email: user.email }, process.env.JWT_SECRET)
      }
      return "password no valido"
    }
  }
}
