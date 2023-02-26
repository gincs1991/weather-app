import { useState, useEffect } from "react";
import axios from 'axios';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const options = [
  { value: 'Bucharest', label: 'Bucharest' },
  { value: 'Bacau', label: 'Bacau' },
  { value: 'Sighisoara', label: 'Sighisoara' },
  { value: 'Sydney', label: 'Sydney' }
];

const URL = "https://api.weatherapi.com/v1/current.json";
// const searchURL = "http://api.weatherapi.com/v1/search.json";
const API_KEY = "34ddc8f39463427ba9d165646232502";

function App() {
  const [city, setCity] = useState(options[0]);
  const [cityData, setCityData] = useState(null);
  // const [search, setSearch] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        URL
        , {
          params: {
            key: API_KEY,
            q: city.value
          }
        }
      );

      setCityData(result.data);
    }
    fetchData();

  }, [city]);

  const renderWeather = () => {
    const {
      location: { name, country }, 
      current: {
        temp_c, 
        is_day, 
        wind_kph, 
        wind_dir, 
        pressure_mb, 
        humidity, 
        condition: { icon, text }
      } 
    } = cityData;

    return (
      <div>
        <h1>{`${name}, ${country}`}</h1>
        <p>Temperature, Celsius: {temp_c}</p>
        {is_day ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
        <img alt={text} src={icon} />
        <p>Wind: {wind_kph}</p>
        <p>Wind direction: {wind_dir}</p>
        <p>Pressure: {pressure_mb}</p>
        <p>Humidity: {humidity}</p>
      </div>
    )
  };

  return (
    <div className="App">
      <Select options={options} defaultValue={city} onChange={(item) => setCity(item)} />
      {cityData && renderWeather()}
    </div>
  );
}

export default App;
