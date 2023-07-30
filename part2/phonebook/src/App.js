import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>filter show with <input 
                              onChange={props.handleFilter}/></div>
  )
}

const PersonForm = (props) => {
  return (
    <form>
      <div>
        <div>name: <input 
                value={props.newName}
                onChange={props.handleNameChange}/></div>
        <div>number: <input 
                value={props.newNumber}
                onChange={props.handleNumberChange}/></div>
      </div>
      <div>
        <button type="submit" onClick={props.addName}>add</button>
      </div>
    </form>
  )
}

const Person = (props) => {
  return (
    <div>{props.name} {props.number}</div>
  )
}

const PersonList = (props) => {
  return (
    <div>
      {
        props.persons.map(
          person => {
            if (person.show) {
              return (
                <Person key={person.name} name={person.name} number={person.number}/>
              )
            }
          }
        )
      }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
        number: newNumber,
        show: true
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

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)

    persons.forEach(person => {
      let objectName = person.name.toLowerCase()
      let filterName = event.target.value.toLowerCase()
      if (objectName.includes(filterName)) {
        person.show = true
      }
      else {
        person.show = false
      }
    })
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log(response.data)
        let newData = response.data
        newData.forEach(obj => {
          obj.show = true
        })
        setPersons(newData)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter handleFilter={handleFilter}/>

      <h2>add a new</h2>

      <PersonForm newName={newName} newNumber={newNumber} 
        handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} addName={addName}/>

      <h2>Numbers</h2>
      
      <PersonList persons={persons} />
    </div>
  )
}

export default App