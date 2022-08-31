import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Tile from './Tile';
import countriesSlice, { fetchCountries } from '../redux/countriesSlice';

export default function Continent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id, name } = location.state;
  const countries = useSelector((state) => state.countries);
  const continent = countries.find((continent) => continent.name === name) || {
    name: '',
    countries: [],
  };

  useEffect(() => {
    if (continent.countries.length === 0) {
      dispatch(fetchCountries({ name, id }))
    }
  }, [continent]);

  return (
    <div className="continent-page">
      <div className="top-tile">
        <h1>{name}</h1>
        <p>
          {continent.countries.length}
          {' '}
          available countries
        </p>
      </div>

      <div className="list-container">
        {continent.countries.map((country, index) => (
          <Tile
            type="isCountry"
            topName={name}
            name={country.name}
            index={index}
            key={country.id}
            id={country.id}
          />
        ))}
      </div>
    </div>
  );
}
