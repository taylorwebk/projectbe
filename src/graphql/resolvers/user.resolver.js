const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ApolloError } = require('apollo-server-express')

require('dotenv/config')

const User = require('../../models/User')
const { errorTypes } = require('../../utils')

module.exports = {
  Query: {
    allUsers: (_, __, { user }) => {
      if (!user) {
        throw new ApolloError(errorTypes.notAuthError, 400, { type: 'warning' })
      }
      return User.find()
    },
    getUser: (_, { id }) => User.findById(id)
  },
  Mutation: {
    createUser: async (_, { user }) => {
      if (!user.name ||!user.email || !user.edad || !user.password) {
        throw new ApolloError(errorTypes.notValidArguments, 400, { type: 'error' })
      }
      const hashedPass = await bcrypt.hash(user.password, 10)
      const newUser = Object.assign(
        {},
        user,
        { password: hashedPass }
      )
      const userAux = await User.findOne({ email: user.email })
      if (userAux) {
        throw new ApolloError(errorTypes.notValidEmailError, 400, { type: 'warning' })
      }
      return User.create(newUser)
    },
    login: async (_, { data }) => {
      const user = await User.findOne({ email: data.email })
      if (!user) {
        throw new ApolloError(errorTypes.loginError, 400, { type: 'warning' })
      }
      const isValidPass = await bcrypt.compare(data.password, user.password)
      if (!isValidPass) {
        throw new ApolloError(errorTypes.loginError, 400, { type: 'warning' })
      }
      return jwt.sign({ email: user.email }, process.env.JWT_SECRET)
    }
  }
}
