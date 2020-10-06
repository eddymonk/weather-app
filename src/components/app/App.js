import React, {useState} from 'react';
import './App.css';
import Form from '../Form/Form';
import Weather from '../Weather/Weather';
import ForecastWeather from '../ForecastWeather/ForecastWeather';

function App() {
  const [weather,setWeather] = useState([])
  const [forecastWeather, setForecastWeather] = useState([]); // new one 

  const APIKEY = 'd0d5c38bcf3d13d80ce73297fdec62b5'

  async function fetchData(e) {
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
      e.preventDefault()
    const apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${APIKEY}`)
      .then( res => res.json())
      .then(data => data)
      if(city && country) {
      setWeather({
        data: apiData,
        city: apiData.city,
        country: apiData.sys.country,
        description: apiData.weather[0].description,
        temperature: Math.round(apiData.main.temp - 273.15),
        humidity: apiData.main.humidity,
        error:""
      }
      )} else {
        setWeather({
          data: '',
          city: '',
          country: '',
          description: '',
          temperature: '',
          humidity: '',
          error:"Please Type A City And Country"
      }
      )}
      
      const forecastApiData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${APIKEY}`)
      .then( res => res.json())
      .then (data => data)
      if (city && country ) {
        setForecastWeather({
          data: forecastApiData,
          city: forecastApiData.city, 
          country: forecastApiData.country,
          description: forecastApiData.list[0].weather[0].description,
          temperature: Math.round(forecastApiData.list[0].main.temp - 273.15 ),
          humidity: forecastApiData.list[0].main.humidity,
          error:""
        }
        )} else {
          setForecastWeather({
            data: '',
            city: '',
            country: '',
            description: '',
            temperature: '',
            humidity: '',
            error:"Please Type A City And Country"
          })
        }
  }




  return (
    <div className="app">
      <h2>WEATHER-APP</h2>
      <Form getWeather={fetchData} />
      <Weather
      city={weather.city}
      country={weather.country}
      description={weather.description}
      temperature={weather.temperature}
      humidity={weather.humidity}
      error={weather.error}
      />
      <ForecastWeather 
        city={forecastWeather.city}
        country={forecastWeather.country}
        description={forecastWeather.description}
        temperature={forecastWeather.temperature}
        humidity={forecastWeather.humidity}
        error={forecastWeather.error}
      />
      {console.log(weather.data)}
      
    </div>
  );
}

export default App;
