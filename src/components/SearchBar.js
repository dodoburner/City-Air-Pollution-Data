import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCityLocation } from '../redux/citiesSlice';

export default function SearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    const city = location.trim().split(' ').map((el) => el[0].toUpperCase() + el.slice(1)).join('%20');
    e.preventDefault();
    (async () => {
      await dispatch(getCityLocation({ name: city }));
      navigate(`/direct-search/${city}`);
    })();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="search for a city"
        value={location}
        onChange={(e) => { setLocation(e.target.value); }}
      />
      <button type="submit" className="search-bar-btn">
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </form>
  );
}
