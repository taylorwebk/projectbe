const User = require('../../models/User')

module.exports = {
  Query: {
    allUsers: () => User.find(),
    getUser: (_, { id }) => User.findById(id)
  },
  Mutation: {
    createUser: (_, { user }) => User.create(user)
  }
}
