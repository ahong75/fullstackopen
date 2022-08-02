import { useState, useEffect } from 'react'
import personService from './services/persons.js'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [show, setShow] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const namesToShow = show.length == 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(show.toLowerCase()));

  const handleShowChange = (event) => {
    console.log(event.target.value)
    setShow(event.target.value);
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    const exists = persons.find(({name, number}) => 
      name === person.name
    )
    console.log(exists)
    if (exists != undefined) {
      replaceNumber(exists, person.number)
    }
    else {
      personService
        .addPerson(person)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber(0)
          setNotification([0, `${newPerson.name} was successfully added to the server`])
          setTimeout(() => {
            setNotification([])
          }, 5000)
        })
        .catch(error => {
            setNotification([1, `${error.response.data.error}`])
        })
    }
  }
  
  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      const deleteId = person.id
      console.log(deleteId)
      personService
        .deletePerson(deleteId)
        .then(() => {
          console.log(`${person.name} deleted successfully`)
          setPersons(persons.filter(person => person.id != deleteId))
          setNotification([0, `${person.name} was successfully deleted from the server`])
          setTimeout(() => {
            setNotification([])
          }, 5000)
        })
    }
  }
  
  const replaceNumber = (person, number) => {
    if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
        person.number = number
        personService
          .replacePerson(person.id, person)
          .then(newPerson => {
            setPersons(persons.map(oldPerson => oldPerson.id === newPerson.id ? newPerson : oldPerson));
            console.log(`${person.name} number changed successfully`)
          })
          .catch(error => {
            setNotification([1, `Info of ${person.name} has already been removed from the server`])
          })
      }
  }
  return (
    <div>
      {/* <div>debug: {newName}</div> */}
      <Notification id={notification} notification={notification} />
      <h2>Phonebook</h2>
      <Filter show={show} handleShowChange={handleShowChange}/>
      <h2>add a new</h2>
      <PersonForm
        newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        replaceNumber={replaceNumber}
      />
      <h2>Numbers</h2>
      {namesToShow.map(person => <Person key={person.id} person={person} deletePerson={deletePerson}/>)}
    </div>
  )
}

export default App
