import React from "react";
import axios from "axios";
import { useState } from "react";
import './weather.css'
const Forcast = () => {
  const [data, setdata] = useState("");
  const [userdata, setuserdata] = useState("");
  const datas = new Date();
  const hour = datas.getHours()
  const minutes = datas.getMinutes();
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: { q: userdata },
    headers: {
      "x-rapidapi-key": "33d408e3b8msh64dbdf70ba7bb6dp1f51d5jsn2e39600ecc37",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };

  async function search(e) {
    e.preventDefault();
    try {
      const response = await axios.request(options);
      setdata(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="forecast-container">
      <div className="input-container">
        <input
          className="location-input"
          name="location"
          placeholder="Enter your location"
          onChange={(e) => setuserdata(e.target.value)}
          type="text"
        />
        <button className="search-button" onClick={search}>
          Search
        </button>
      </div>
      <br />
      {data ? (
        <div className="weather-info">
          <div className="weather-display">
            <div className="icon-container">
              <img
                src={data.current.condition.icon}
                alt="forecast icon"
                className="weather-icon"
              />
            </div>
            <div className="details">
              <h1 className="location-name">
                {data.location.name}&nbsp;&nbsp;{hour}:{minutes}
              </h1>
              <h1 className="temperature">
                {data.current.temp_c}
                <span className="degree">°C</span>
              </h1>
              <h1 className="condition">{data.current.condition.text}</h1>
            </div>
          </div>
          <div className="additional-info">
            <div className="info-item">
              <img src="humidity.png" alt="humidity" className="info-icon" />
              <div className="info-details">
                <h2 className="info-value">{data.current.humidity}%</h2>
                <h2 className="info-label">Humidity</h2>
              </div>
            </div>
            <div className="info-item">
              <img src="breeze.png" alt="wind" className="info-icon" />
              <div className="info-details">
                <h2 className="info-value">{data.current.wind_kph} Kph</h2>
                <h2 className="info-label">Wind</h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{textAlign:"center",color:"white"}}>Enter your city</h1>
      )}
    </div>
  );
};

export default Forcast;
