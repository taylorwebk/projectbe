module.exports = `
  type User {
    id: ID!,
    name: String,
    password: String
  }
  input UploadUser {
    name: String,
    password: String
  }
  type Query {
    # Get all users
    allUsers: [User]!

    # Get user by ID
    getUser( id: ID! ) : User
  }
  type Mutation {
    # creates an user
    createUser(user: UploadUser!): User!
  }
`
