import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import citiesSlice, { getCities } from '../redux/citiesSlice';
import Tile from './Tile';

export default function Country() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id, name } = location.state;

  const countries = useSelector((state) => state.cities);
  const country = countries.find((el) => el.name === name) || {
    name: '',
    cities: [],
  };
  const { cities } = country;

  useEffect(() => {
    if (cities.length === 0) {
      dispatch(getCities({id, name}))
    }
  }, []);

  return (
    <div>
      <div className="top-tile">
        <h1>{name}</h1>
        <p>
          {cities.length}
          {' '}
          available cities
        </p>
      </div>

      <div>
        <div className="list-container">
          {cities.map((city, index) => (
            <Tile
              type="isCity"
              topName={name}
              name={city.name}
              index={index}
              key={city.id}
              id={city.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
