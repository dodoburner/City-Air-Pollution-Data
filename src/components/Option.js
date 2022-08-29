import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/Option.css";

export default function Option({ name, index }) {
  return (
    <div
      className={`option-container
      ${index % 2 === 0 ? "first-color" : "second-color"}`}
    >
      <button className="option-btn">
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
      <div className="img-container">
        <img />
      </div>

      <p className="option-text">{name}</p>
    </div>
  );
}
