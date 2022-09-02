import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Tile from './Tile';
import { fetchCountries } from '../redux/countriesSlice';

export default function Continent() {
  const { continent: name } = useParams();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.continents).find((el) => el.name === name);
  const countries = useSelector((state) => state.countries) || [];
  const continent = countries.find((continent) => continent.name === name) || {
    name: '',
    countries: [],
  };

  useEffect(() => {
    if (continent.countries.length === 0) {
      dispatch(fetchCountries({ name, id }));
    }
  }, []);

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
