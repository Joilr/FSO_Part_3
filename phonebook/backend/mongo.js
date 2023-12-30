/* const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('password is missing')
  process.exit(1)
}

else if (process.argv.length<5 && process.argv.length !== 3) {
  console.log('error: expected more arguments')
  process.exit(1)
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('person', personSchema)

const password = process.argv[2]
const url =
  `mongodb+srv://joilr7001:${password}@cluster0.cjiylg9.mongodb.net/personApp?retryWrites=true&w=majority`


mongoose.set('strictQuery',false)

mongoose.connect(url)
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1);
});



if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person);
    });
    mongoose.connection.close();
    process.exit(0); // Exit successfully after the operation is complete
  });
}

else {

const personName = process.argv[3]
const personNumber = process.argv[4]

const person = new Person({
    name: personName,
    number: personNumber,
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})

}
 */


//COPY INDEX

/* require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person') */

/* let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan((tokens, req, res) => {

  const requestBody = JSON.stringify(req.body);

  return [
    tokens.method(req, res),    
    tokens.url(req, res),        
    tokens.status(req, res),       
    tokens.res(req, res, 'content-length'), 
    tokens['response-time'](req, res), 'ms', 
    `${requestBody}`
  ].join(' ');
}));

app.post('/api/persons', (request, response) => {
  const randomId = () => Math.floor(Math.random() * (3000000 - 100000)) + 100000;

  if (!request.body.name || !request.body.number) {
    return response.status(400).json({ error: 'missing name or number' });
  }

  const existingPerson = persons.find(p => p.name === request.body.name);
  if (existingPerson) {
    return response.status(400).json({ error: 'name must be unique' });
  }

  const person = {
    name: request.body.name,
    phone: request.body.number,
    id: randomId()
  };

  try {
    persons = persons.concat(person);
    response.json(person);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'internal server error' });
  }
})

app.get('/info', (request, response) => {
  const now = new Date();
  const dateString = now.toDateString() + ' ' + now.toLocaleTimeString();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p> <p>${dateString}</p>` )
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {

  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) */
