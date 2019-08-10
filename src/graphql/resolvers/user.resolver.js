const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')

module.exports = {
  Query: {
    allUsers: () => User.find(),
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
        return jwt.sign({ email: user.email }, 'secret')
      }
      return "password no valido"
    }
  }
}
