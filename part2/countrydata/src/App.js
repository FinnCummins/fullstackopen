import nameServices from './services/countries'
import {useState, useEffect} from 'react'

const Display = (props) => {
  if (props.countries.length > 10) {
    return (
      <div>
        Too many matches: current matches ({props.countries.length})
      </div>
    )
  }
  else if (props.countries.length > 1) {
    return (
      <div>
        {
          props.countries.map(country => <div key={country.name.common}>{country.name.common}</div>)
        }
      </div>
    )
  }
  else if (props.countries.length === 1) {
    const country = props.countries[0]
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <h3>languages:</h3>
        <ul>
          {
            Object.values(country.languages).map(language => <li key={language}>{language}</li>)
          }
        </ul>
        <img src={country.flags.png}></img>
      </div>
    )
  }
}

const App = () => {
  const [newCountry, setNewCountry] = useState("")
  const [countries, setCountries] = useState([])
  const [filterList, setFilterList] = useState([])

  const filter = (currentFilter) => {
    setFilterList(
      countries.filter(country => country.name.common.toLowerCase().includes(currentFilter.toLowerCase()))
    )
  }

  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setNewCountry(event.target.value)
    filter(event.target.value)
  }
  
  useEffect(() => {
    nameServices
    .getAll()
    .then(countryData => {
      setCountries(countryData)
    })
  }, [])

  return (
    <>
      <div>
        find countries <input 
                        value={newCountry}
                        onChange={handleCountryChange}
                        autocomplete="no"/>
      </div>
      <Display countries={filterList}/>
    </>
  )
}

export default App;
