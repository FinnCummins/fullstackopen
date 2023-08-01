import axios from 'axios'
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"
const apiKey = process.env.REACT_APP_API_KEY

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getWeather = (lon, lat) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    return request.then(response => response.data)
}

const getCityCoords = (city) => {
    const request = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
    return request.then(response => response.data[0])
}

export default {getAll, getWeather, getCityCoords}