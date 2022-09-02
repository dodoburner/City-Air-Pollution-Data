import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCities } from '../redux/citiesSlice';
import Tile from './Tile';

export default function Country() {
  const { country: name, continent: topName } = useParams();
  const dispatch = useDispatch();
  const continent = useSelector((state) => state.countries).find((el) => el.name === topName);
  const { id } = continent.countries.find((el) => el.name === name);

  const countries = useSelector((state) => state.cities);
  const { cities } = countries.find((el) => el.name === name) || {
    name: '',
    cities: [],
  };

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
