import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Tile.css';

export default function Tile({
  name, population,
}) {
  return (
    <div className="tile">
      <Link to={name}>
        <button type="button" className="tile-btn">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </Link>
      <p className="tile-text">
        {name}
      </p>
      {population ? (
        <span>
          Population:
          {' '}
          {population}
        </span>
      ) : null}
    </div>
  );
}

Tile.propTypes = {
  name: PropTypes.string.isRequired,
  population: PropTypes.number,
};

Tile.defaultProps = {
  population: 0,
};
