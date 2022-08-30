import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  return (
    <header>
      <Link to="">
        <button>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
      </Link>
    </header>
  );
}
