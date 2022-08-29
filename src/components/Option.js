import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import '../styles/Option.css';

export default function Option({ name }) {
  return (
    <div className="option-container">
      <button className="option-btn">
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
      <div className="img-container">
        <img />
      </div>

      <p>{name}</p>
    </div>
  )
}