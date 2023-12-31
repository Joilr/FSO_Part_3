import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'
import './index.css'

const App = () => {

  //State handlers
  const [persons, setPersons] = useState([]); 
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState('');
  const [msgColor, setMsgColor] = useState(''); 

  //Fetch data from the database
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []);

  //Delete functionality
  const deletePerson = ( id ) => {

    personService
    .removal(id)
    .then(() => {
      const personName = persons.find(p => p.id === id)?.name;
      setPersons(persons.filter(person => person.id !== id));
      setMsgColor('red')
      setMessage(`${personName} has been removed from the phonebook `)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    })

  };

  //Person Form functionality
  const addPerson = (event) => {

    event.preventDefault();

    //Person already exist in list
    if (persons.some((person) => person.name === newPerson.name && person.number === newPerson.number)) {
      setMsgColor('green')
      setMessage(`${newPerson.name} is already added to phonebook with this number `)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }

    //Changing phonenumber
    else if (persons.some((person) => person.name === newPerson.name && person.number !== newPerson.number)) {
      const confirmUpdate = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`);

      if (confirmUpdate) {

         const existingPerson = persons.find(person => person.name === newPerson.name);
         console.log(existingPerson.id)

        const personObject = {
          name: existingPerson.name,
          number: newPerson.number,
          id: existingPerson.id
        }

        personService
        .update(personObject)
        .then(returnedPerson => {
          console.log("returnedperson:" + returnedPerson.number)
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson));
          setMsgColor('green')
          setMessage(`${returnedPerson.name} has been updated with new number ${returnedPerson.number} `)
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
        .catch(error => {
          // Error handling logic
          console.error('Error:', error.response.data);
          // Display an error message to the user, etc.
          setMsgColor('red')
          setMessage(error.response.data.error)
          setTimeout(() => {
            setMessage('')
          }, 5000)
        });
      }
    }

    //Adding new person
    else {
    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
      id: newPerson.name
    }

    //Save data to the server
    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewPerson({ name: '', number: '' }); 
      setMsgColor('green')
      setMessage(`Added ${returnedPerson.name} `)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    })
    .catch(error => {
      // Error handling logic
      console.error('Error:', error.response.data);
      // Display an error message to the user, etc.
      setMsgColor('red')
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    });
    }
  };

  //Person form input handler
  const handleInputChange = (event) => {

    const { name, value } = event.target;

    setNewPerson(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  //Filter functionality
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredPersons = newFilter
  ? persons.filter(
    (person) =>
      person.name.toLowerCase().includes(newFilter.toLowerCase()) ||
      person.number.includes(newFilter)
  )
  : persons;

  //Show message
  const Notification = ({ message }) => {
    if (message === '') {
      return null
    }

    if (msgColor === 'green') {
      return (
        <div className='showMsg-green'>
          {message}
        </div>
      )
    }

    else if (msgColor === 'red') {
      return (
        <div className='showMsg-red'>
          {message}
        </div>
      )
    }
  };

  //The visual output
  return (
    <div>
      
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter value={newFilter} onChange={handleFilterChange} />
      
      <h3>add a new</h3>

      <PersonForm 
      newPerson={newPerson} 
      handleInputChange={handleInputChange} 
      addPerson={addPerson} 
      />

      <h3>Numbers</h3>

      <Persons 
      filteredPersons={filteredPersons}
      deletePerson={deletePerson}
      />

    </div>
  )
};

export default App;