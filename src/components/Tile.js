import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/Tile.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function Tile({ name, index, id, type, continentName }) {
  // const dispatch = useDispatch();
  // const continents = useSelector(state => state.continents)

  // const handleClick = () => {
  //   const continent = continents.find(continent => continent.name === name);
  //   if (continent.countries.length === 0) {
  //     (async () => {
  //       const where = encodeURIComponent(
  //         JSON.stringify({
  //           continent: {
  //             __type: "Pointer",
  //             className: "Continentscountriescities_Continent",
  //             objectId: id,
  //           },
  //         })
  //       );
  //       const response = await fetch(
  //         `https://parseapi.back4app.com/classes/Continentscountriescities_Country?keys=name&where=${where}`,
  //         {
  //           headers: {
  //             "X-Parse-Application-Id":
  //               "mfpmjU4NFMM0RudR7jTsImrVvH16ZG7aqJhqWoiZ", // This is your app's application id
  //             "X-Parse-REST-API-Key": "5kDXPpyzOXoLdqeid6koqIX7TVKpK97k1GEw33BK", // This is your app's REST API key
  //           },
  //         }
  //       );
  //       const data = await response.json(); // Here you have the data that you need
  //       let results = data.results;
  //       console.log(results);

  //       const data1 = await axios.get(
  //         "http://api.airvisual.com/v2/countries?key=d4281486-c6e5-40f2-a45a-666c2a800bae"
  //       );
  //       let allCountries = data1.data.data;
  //       allCountries = allCountries.map((country) => country.country)

  //       results = results.filter((result) => {
  //         if (allCountries.includes(result.name)) {
  //           return result;
  //         }
  //       });
  //       console.log(results)

  //       dispatch(continentSlice.actions.addCountries({ name, results }))
  //     })();
  //   }
  // };

  return (
    <div
      className={`option-container
      ${index % 2 === 0 ? "first-color" : "second-color"}`}
    >
      {type === "isContinent" ? (
        <Link to="/continent" state={{ id, name }}>
          <button className="option-btn">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </Link>
      ) : (
        <Link to="/country" state={{ id, name, continentName }}>
          <button className="option-btn">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </Link>
      )}

      <div className="img-container">
        <img />
      </div>

      <p className="option-text">{name}</p>
    </div>
  );
}
