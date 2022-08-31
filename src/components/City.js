import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { citiesSlice } from "../redux/citiesSlice";
import "../styles/City.css";

export default function City() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id, name, topName } = location.state;

  const cities = useSelector((state) => state.cities[topName]);
  const city = cities.find((el) => el.name === name);
  const { pollution } = city.info;
  const { weather } = city.info;

  const aqiData = [
    {
      color: "green",
      level: "GOOD",
      maxValue: 50,
      description:
        "Air quality is satisfactory, and air pollution poses little or no risk.",
    },
    {
      color: "yellow",
      level: "MODERATE",
      maxValue: 100,
      description:
        "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
    },
    {
      color: "orange",
      level: "UNHEALTHY FOR SENSITIVE GROUPS",
      maxValue: 150,
      description:
        "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
    },
    {
      color: "red",
      level: "UNHEALTHY",
      maxValue: 200,
      description:
        "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.",
    },
    {
      color: "purple",
      level: "VERY UNHEALTHY",
      maxValue: 300,
      description:
        "	Health alert: The risk of health effects is increased for everyone.",
    },
    {
      color: "maroon",
      level: "HAZARDOUS",
      maxValue: 300,
      description:
        "Health warning of emergency conditions: everyone is more likely to be affected.",
    },
  ];

  const aqiDataCity = pollution
    ? aqiData.find((el) => el.maxValue > pollution.aqius)
    : null;
  console.log(aqiDataCity);

  useEffect(() => {
    if (city.info.length === 0) {
      (async () => {
        const data = await axios.get(
          `http://api.airvisual.com/v2/nearest_city?lat=${city.lat}&lon=${city.long}&key=d4281486-c6e5-40f2-a45a-666c2a800bae`
        );
        const results = data.data.data.current;

        dispatch(
          citiesSlice.actions.addInfo({
            topName,
            name,
            results,
          })
        );
      })();
    }
  }, []);

  return (
    <div className="city-container">
      {pollution ? (
        <>
          <div className="top-tile">
            <h1>{name}</h1>
          </div>

          <div className={`polution-info-container ${aqiDataCity.color}`}>
            <div>
              <p className="aqi-number">US AQI: <span>{pollution.aqius}</span></p>
              <p className="main-polutant">Main Polutant: <span>{pollution.mainus}</span></p>
            </div>

            <h3><span>Live AQI Index</span><br /> {aqiDataCity.level}</h3>
          </div>

          <p className="aqi-desc">{aqiDataCity.description}</p>

          <div className="weather-info-container">
            <img
              src={`https://www.airvisual.com/images/${weather.ic}.png`}
              alt="weather icon"
              className="weather-icon"
            />
            <div className="weather-info">
              <p>Humidity: {weather.hu}%</p>
              <p>Pressure: {weather.pr} hPa</p>
              <p>Wind: {weather.ws} m/s</p>
              <p>Temperature: {weather.tp}°C</p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
