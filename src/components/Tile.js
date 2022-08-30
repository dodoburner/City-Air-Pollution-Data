import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/Tile.css";

export default function Tile({ name, index, id, type, topName }) {
  const returnLink = () => {
    switch (type) {
      case "isContinent":
        return (
          <Link to="/continent" state={{ id, name }}>
            <button className="option-btn">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        );
      case "isCountry":
        return (
          <Link to="/country" state={{ id, name, topName }}>
            <button className="option-btn">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        );
      case "isCity":
        return (
          <Link to="/country" state={{ id, name, topName }}>
            <button className="option-btn">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        );
    }
  };

  return (
    <div
      className={`option-container
      ${index % 2 === 0 ? "first-color" : "second-color"}`}
    >
      {returnLink()}
      <div className="img-container">
        <img />
      </div>
      <p className="option-text">{name}</p>
    </div>
  );
}
