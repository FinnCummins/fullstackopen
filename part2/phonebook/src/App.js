import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const checkIfNameExists = () => persons.some(person => person.name === newName)

  const addName = (event) => {
    event.preventDefault()

    if (checkIfNameExists()) {
      setNewName('')
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObject = {
        name: newName
      }

      setPersons(persons.concat(nameObject))
    
      setNewName('')
    }
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <div key={person.name}>{person.name}</div>)}
      </div>
    </div>
  )
}

export default App