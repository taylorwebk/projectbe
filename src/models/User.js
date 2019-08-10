const mongosee = require('mongoose')

const { Schema } = mongosee

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: String,
  edad: Number,
  password: String
})

const userModel = mongosee.model('User', userSchema)

module.exports = userModel
