import { useState, useEffect } from "react";
import axios from 'axios';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const CURRENT_URL = "https://api.weatherapi.com/v1/current.json";
const SEARCH_URL = "http://api.weatherapi.com/v1/search.json";
const API_KEY = "34ddc8f39463427ba9d165646232502";

function App() {
  const [search, setSearch] = useState("");
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState(null);
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        CURRENT_URL, {
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        SEARCH_URL
        , {
          params: {
            key: API_KEY,
            q: search
          }
        }
      );

      const parsedCityList = result.data.map((item) => ({ value: `${item.lat},${item.lon}`, label: `${item.name}, ${item.country}` }))

      setCityList(parsedCityList);
    }
    fetchData();

  }, [search]);

  const handleSearch = (value) => {
    if (value && value.length >= 3) {
      setSearch(value);
    }
  }


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
      <Select
        options={cityList}
        onChange={(item) => setCity(item)}
        onInputChange={handleSearch}
        isClearable
      />
      {cityData && renderWeather()}
    </div>
  );
}

export default App;
