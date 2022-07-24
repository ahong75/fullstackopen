import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryLanguage = ({language}) => (
    <li>{language}</li>
)
const Country = ({country}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const name = country.name.official
    const lat = country.capitalInfo[0]
    const lng = country.capitalInfo[1]
    const [weatherData, setWeatherData] = useState([])

        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
            .then(response => {
                console.log('promise fulfilled')
                setWeatherData(response);
                console.log(weatherData)
            })

    console.log(country.languages)
    const languages = []
    for (const prop in country.languages) {
        languages.push(country.languages[prop])
    }
    console.log(languages)
    return (
        <div>
            <h1>{country.name.official}</h1>

            capital {country.capital}
            <br></br>
            area {country.area}

            <h2>languages</h2>

            <ul>
                {languages
                    .map(language =>
                        <CountryLanguage key={language} language={language}/>)}
            </ul>
            <img src={country.flags.png}></img>
            
            <h2>Weather in {name}</h2>

            temperature {weatherData.main.temp}
            wind {weatherData.wind.speed}
        </div>
    )
}

const Filter = ({countryShow, handleShowChange}) => (
  <form>
    <div>
      find countries<input value={countryShow} onChange={handleShowChange}/> 
    </div>
  </form>
)

const CountryListing = ({country, handleShowChange}) => (
    <li>{country.name.official}<button value={country.name.official} onClick={handleShowChange}>show</button></li>
    )

const DisplayCountries = ({countriesToShow, handleShowChange}) => {
    if (countriesToShow.length == 1) {
        return (
            <Country key={countriesToShow[0].postalCode} country={countriesToShow[0]}/>
        )
    }
    if (countriesToShow.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    return (
        <>{countriesToShow.map(country => 
            <CountryListing key={country.name.official} country={country} handleShowChange={handleShowChange}/>)}</>    
    )
}
const App = () => {
  const [countries, setCountries] = useState([])
  const [countryShow, setCountryShow] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/countries')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countryShow == 0
    ? countries
    : countries.filter(country => country.name.official.toLowerCase().includes(countryShow.toLowerCase()))

  const handleShowChange = (event) => {
    console.log(event.target.value)
    setCountryShow(event.target.value)
  }

  return (
    <div>
      <Filter countryShow={countryShow} handleShowChange={handleShowChange} />
      <DisplayCountries countriesToShow={countriesToShow} handleShowChange={handleShowChange} />
    </div>
  )
}

export default App
