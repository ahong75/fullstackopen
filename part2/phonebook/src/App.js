import { useState, useEffect } from 'react'
import axios from 'axios'
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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
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
      id: newName,
      number: newNumber
    }
    const exists = persons.find(({name, id, number}) => 
      name === person.name && id === person.id && number === person.number
    )

    if (exists != null) {
      alert(`${person.name} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber(0)
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
      />
      <h2>Numbers</h2>
      {namesToShow.map(person => <Person key={person.id} person={person} />)}
    </div>
  )
}

export default App
