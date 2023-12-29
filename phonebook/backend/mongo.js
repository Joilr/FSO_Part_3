const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://joilr7001:${password}@cluster0.cjiylg9.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('person', personSchema)

const person = new Person({
    name: 'Per Hansen',
    number: '3434-001-123',
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})