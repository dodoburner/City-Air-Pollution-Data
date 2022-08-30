import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { citiesSlice } from "../redux/citiesSlice";

export default function City() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id, name, topName } = location.state;

  const cities = useSelector((state) => state.cities[topName]);
  const city = cities.find((el) => el.name === name);
  const { pollution } = city.info;
  const { weather } = city.info;
  console.log(city)

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
    <div>
      <h1>{city.name}</h1>
      <div>
        <p>US AQI: {pollution.aqius}</p>
        <p>Main pollutant: {pollution.mainus}</p>
      </div>

      <div>
        <img src={"https://www.airvisual.com/images/" + weather.ic + ".png"}/>
        <p>Humidity: {weather.hu}%</p>
        <p>Pressure: {weather.pr} hPa</p>
        <p>Wind: {weather.ws} m/s</p>
        <p>Temperature: {weather.tp}°C</p>
      </div>
    </div>
  );
}
