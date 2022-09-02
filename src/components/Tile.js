import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Tile.css';

export default function Tile({
  name, index, id, type, topName,
}) {
  function returnLink() {
    switch (type) {
      case 'isContinent':
        return (
          <Link to={name} state={{ id, name }}>
            <button type="button" className="option-btn">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        );
      case 'isCountry':
        return (
          <Link to={name} state={{ id, name, topName }}>
            <button type="button" className="option-btn">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        );
      case 'isCity':
        return (
          <Link to={name} state={{ id, name, topName }}>
            <button type="button" className="option-btn">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        );
      default:
        return null;
    }
  }

  return (
    <div
      className={`option-container
      ${index % 2 === 0 ? 'first-color' : 'second-color'}`}
    >
      {returnLink()}
      <p className="option-text">{name}</p>
    </div>
  );
}

Tile.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  topName: PropTypes.string,
  type: PropTypes.string.isRequired,
};

Tile.defaultProps = {
  topName: '',
};
