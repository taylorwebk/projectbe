module.exports = `
  type User {
    id: ID!,
    email: String!,
    edad: Int,
    name: String,
    password: String
  }
  input UploadUser {
    name: String,
    email: String,
    edad: Int,
    password: String
  }
  input LoginCredentials {
    email: String,
    password: String
  }
  type Query {
    # Get all users
    allUsers: [User]!

    # Get user by ID
    getUser( id: ID! ) : User

    # Token Validation
    validateToken: User!
  }
  type Mutation {
    # creates an user
    createUser(user: UploadUser!): User!
    login(data: LoginCredentials!): String
  }
`
