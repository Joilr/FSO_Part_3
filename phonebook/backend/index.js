require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

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

  if (!request.body.name || !request.body.number) {
    return response.status(400).json({ error: 'missing name or number' });
  }

  const person = new Person ({
    name: request.body.name,
    number: request.body.number,
  });

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

})

/* app.get('/info', (request, response) => {
  const now = new Date();
  const dateString = now.toDateString() + ' ' + now.toLocaleTimeString();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p> <p>${dateString}</p>` )
}) */

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {

  Person.findById(request.params.id).then(person => {
    response.json(person)
  })

})

/* app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
}) */

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
