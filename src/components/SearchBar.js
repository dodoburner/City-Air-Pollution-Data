// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getCityLocation } from '../redux/citiesSlice';

export default function SearchBar() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const cities = useSelector((state) => state.cities);
  const city = cities.find((el) => el.name === location);
  console.log(city);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCityLocation({ name: location }));
  };

  useEffect(() => {
    console.log(cities);
  }, [cities]);

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="search for a city"
        value={location}
        onChange={(e) => { setLocation(e.target.value); }}
      />
    </form>
  );
}
