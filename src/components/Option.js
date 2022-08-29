import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/Option.css";

export default function Option({ name, index, id }) {
  const handleClick = () => {
    (async () => {
      const where = encodeURIComponent(JSON.stringify({
        "continent": {
          "__type": "Pointer",
          "className": "Continentscountriescities_Continent",
          "objectId": id
        }
      }));
      const response = await fetch(
        `https://parseapi.back4app.com/classes/Continentscountriescities_Country?keys=name&where=${where}`,
        {
          headers: {
            'X-Parse-Application-Id': 'mfpmjU4NFMM0RudR7jTsImrVvH16ZG7aqJhqWoiZ', // This is your app's application id
            'X-Parse-REST-API-Key': '5kDXPpyzOXoLdqeid6koqIX7TVKpK97k1GEw33BK', // This is your app's REST API key
          }
        }
      );
      const data = await response.json(); // Here you have the data that you need
      console.log(JSON.stringify(data, null, 2));
    })();
  }
  return (
    <div
      className={`option-container
      ${index % 2 === 0 ? "first-color" : "second-color"}`}
    >
      <button className="option-btn" onClick={handleClick}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
      <div className="img-container">
        <img />
      </div>

      <p className="option-text">{name}</p>
    </div>
  );
}
