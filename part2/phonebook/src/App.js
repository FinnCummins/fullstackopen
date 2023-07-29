import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0872393664' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const checkIfNameExists = () => persons.some(person => person.name === newName)

  const addName = (event) => {
    event.preventDefault()

    if (checkIfNameExists()) {
      setNewName('')
      setNewNumber('')
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(nameObject))
    
      setNewName('')
      setNewNumber('')
    }
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <div>name: <input 
                  value={newName}
                  onChange={handleNameChange}/></div>
          <div>number: <input 
                  value={newNumber}
                  onChange={handleNumberChange}/></div>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
      </div>
    </div>
  )
}

export default App