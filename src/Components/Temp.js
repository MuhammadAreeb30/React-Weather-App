import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";

const Temp = () => {
  const [searchValue, setSerachValue] = useState("karachi");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${process.env.REACT_APP_MY_KEY}`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, pressure, humidity } = data.main;
      const { main: weathermood } = data.weather[0];
      const { speed } = data.wind;
      const { name } = data;
      const { country, sunset } = data.sys;

      const myNewWeather = {
        temp,
        pressure,
        humidity,
        weathermood,
        speed,
        name,
        country,
        sunset,
      };
      setTempInfo(myNewWeather);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSerachValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      <WeatherCard {...tempInfo} />
    </>
  );
};

export default Temp;
