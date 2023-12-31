import { useState, useEffect } from 'react'
import nameServices from './services/names'
import './index.css'


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
    <div>{props.name} {props.number} <button onClick={() => props.handleDelete(props)}>delete</button></div>
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
                <Person key={person.name} name={person.name} number={person.number} id={person.id} handleDelete={props.handleDelete}/>
              )
            }
          }
        )
      }
    </div>
  )
}

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className={props.messageType}>
      {props.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [currentPersons, setCurrentPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [filter, setFilter] = useState('')

  const checkIfNameExists = () => persons.some(person => person.name === newName)

  const addName = (event) => {
    event.preventDefault()

    if (checkIfNameExists()) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = {...person, number : newNumber}
        nameServices
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setNotificationMessage(`The user '${returnedPerson.name}' has changed their phone number to '${returnedPerson.number}'`)
            setMessageType('success')
            setCurrentPersons(persons.concat(changedPerson))
            setTimeout(() => {
              setNotificationMessage(null)
              setMessageType(null)
            }, 5000)
            setPersons(persons.map(currentPerson => currentPerson.name !== newName ? currentPerson : returnedPerson))
          })
          .catch(error => {
              setNotificationMessage(
                `Information for the user '${newName}' has already been removed from the server`
              )
              setMessageType('error')
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
              setPersons(persons.filter(currentPerson => currentPerson.id !== person.id))
            }
          )
      }
      setNewName('')
      setNewNumber('')
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      nameServices
        .create(nameObject)
        .then(returnedName => {
          setNotificationMessage(`The user '${nameObject.name}' has been added to the phonebook`)
          setMessageType('success')
          setCurrentPersons(persons.concat(returnedName))
          setTimeout(() => {
            setNotificationMessage(null)
            setMessageType(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationMessage(
            error.response.data.error
          )
          setMessageType('error')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    
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

  const handleDelete = (props) => {
    if (window.confirm(`Are you sure you want to delete ${props.name} from the phonebook?`)) {
      nameServices
        .deletePerson(props.id)
        .then(response => {
          setPersons(persons.map(person => person.id !== props.id ? person : {}))
        })
    }
  }

  useEffect(() => {
    nameServices
      .getAll()
      .then(returnedNames => {
        let newData = returnedNames
        newData.forEach(obj => {
          obj.show = true
        })
        setPersons(newData)
      })
  }, [currentPersons])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} messageType={messageType} />
      
      <Filter handleFilter={handleFilter}/>

      <h2>add a new</h2>

      <PersonForm newName={newName} newNumber={newNumber} 
        handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} addName={addName}/>

      <h2>Numbers</h2>
      
      <PersonList persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App