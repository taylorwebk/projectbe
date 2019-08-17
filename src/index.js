const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const {
  fileLoader, mergeTypes, mergeResolvers
} = require('merge-graphql-schemas')
const path = require('path')

require('./config/db')

const { getUserByToken } = require('./utils')

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/schemas')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './graphql/resolvers')))

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req: { headers: { authorization } } }) => {
    const user = getUserByToken(authorization)
    return { user }
  }
})

server.applyMiddleware({ app })

app.listen(process.env.PORT, () => {
  console.log(`APP IS RUNNING IN PORT ${process.env.PORT}`)
})