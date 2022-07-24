import { useState, useEffect } from 'react'
import personService from './services/persons.js'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [show, setShow] = useState('');

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

      }
  }
  return (
    <div>
      <div>debug: {newName}</div>
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
