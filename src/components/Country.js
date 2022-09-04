import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCities } from '../redux/citiesSlice';
import Tile from './Tile';

export default function Country() {
  const { country: name } = useParams();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.countries)
    .find((el) => el.name === name) || { name: '', continent: '', id: '' };
  const { id } = country;

  const allCities = useSelector((state) => state.cities);
  const cities = allCities.filter((city) => city.country === name) || [];

  useEffect(() => {
    if (cities.length === 0) {
      dispatch(getCities({ id, name }));
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
          {cities.map((city) => (
            <Tile
              type="isCity"
              topName={name}
              name={city.name}
              key={city.id}
              id={city.id}
              population={city.population}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
