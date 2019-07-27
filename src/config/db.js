const mongoosee = require('mongoose')

require('dotenv/config')

mongoosee.set('useCreateTable', true)
mongoosee.set('useFindAndModify', true)

const stringConn = `mongodb+srv://${process.env.MONGO_USER}:${process.env.PASSWORD}@cluster0-eqwbd.mongodb.net/test?retryWrites=true&w=majority`

mongoosee.connect(stringConn, { useNewUrlParser: true })
  .then(() => console.log('Conectado a Mongo DB'))
  .catch(err => console.log(err))

module.exports = mongoosee
