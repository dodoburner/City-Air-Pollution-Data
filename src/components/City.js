import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCityData, getCityLocation } from '../redux/citiesSlice';
import '../styles/City.css';

const aqiData = [
  {
    color: 'green',
    level: 'GOOD',
    maxValue: 50,
    description:
      'Air quality is satisfactory, and air pollution poses little or no risk.',
  },
  {
    color: 'yellow',
    level: 'MODERATE',
    maxValue: 100,
    description:
      'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
  },
  {
    color: 'orange',
    level: 'UNHEALTHY FOR SENSITIVE GROUPS',
    maxValue: 150,
    description:
      'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
  },
  {
    color: 'red',
    level: 'UNHEALTHY',
    maxValue: 200,
    description:
      'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
  },
  {
    color: 'purple',
    level: 'VERY UNHEALTHY',
    maxValue: 300,
    description:
      'Health alert: The risk of health effects is increased for everyone.',
  },
  {
    color: 'maroon',
    level: 'HAZARDOUS',
    maxValue: 300,
    description:
      'Health warning of emergency conditions: everyone is more likely to be affected.',
  },
];

export default function City() {
  const dispatch = useDispatch();
  const { city: name, country } = useParams();
  const [status, setStatus] = useState('pending');

  const cities = useSelector((state) => state.cities) || [];
  const city = cities.find((city) => city.name === name) || { info: { pollution: [] } };
  const { pollution, weather } = city.info;
  const aqiDataCity = aqiData.find((el) => el.maxValue > pollution.aqius) || {};

  useEffect(() => {
    const fetchCity = async () => {
      let response = {};
      if (pollution.length === 0 && country) {
        response = await dispatch(getCityData({
          lat: city.lat, long: city.long, name,
        }));
        setStatus(response.meta.requestStatus);
      } else if (pollution.length === 0) {
        response = await dispatch(getCityLocation({ name }));
        setStatus(response.meta.requestStatus);
      }
    };

    if (city.name && !country) {
      setStatus('fulfilled');
    } else {
      fetchCity();
    }
  }, []);

  function renderCity() {
    if (status === 'rejected') {
      return (
        <div className="no-page">
          Page doesn&apos;t exist : /
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className="no-page">
          Loading...
        </div>
      );
    }
    return (
      <div>
        <div className="top-tile">
          <h1>{name}</h1>
        </div>

        <div className={`polution-info-container ${aqiDataCity.color}`}>
          <div>
            <p className="aqi-number">
              US AQI:
              {' '}
              <span>{pollution.aqius}</span>
            </p>
            <p className="main-polutant">
              Main Pollutant:
              {' '}
              <span className="pollution-span">{pollution.mainus}</span>
            </p>
          </div>

          <h3>
            <span>Live AQI Index</span>
            <br />
            {' '}
            {aqiDataCity.level}
          </h3>
        </div>

        <p className="aqi-desc">{aqiDataCity.description}</p>

        <div className="weather-info-container">
          <img
            src={`https://www.airvisual.com/images/${weather.ic}.png`}
            alt="weather icon"
            className="weather-icon"
          />
          <div className="weather-info">
            <p>
              Humidity:
              {' '}
              <span>
                {weather.hu}
                {' '}
                %
              </span>
            </p>
            <p>
              Pressure:
              {' '}
              <span>
                {weather.pr}
                {' '}
                hPa
              </span>
            </p>
            <p>
              Wind:
              {' '}
              <span>
                {weather.ws}
                {' '}
                m/s
              </span>
            </p>
            <p>
              Temperature:
              {' '}
              <span>
                {weather.tp}
                {' '}
                °C
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="city-container">
      {renderCity()}
    </div>
  );
}
