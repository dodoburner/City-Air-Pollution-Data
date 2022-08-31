import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { countriesSlice } from "../redux/countriesSlice";
import { citiesSlice } from "../redux/citiesSlice";
import Tile from "./Tile";

export default function Country() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id, name, topName } = location.state;

  const countries = useSelector((state) => state.cities);
  const country = countries.find((el) => el.name === name) || {
    name: "",
    cities: [],
  };
  const { cities } = country;

  useEffect(() => {
    if (cities.length === 0) {
      (async () => {
        const where = encodeURIComponent(
          JSON.stringify({
            country: {
              __type: "Pointer",
              className: "Continentscountriescities_Country",
              objectId: id,
            },
          })
        );
        const response = await fetch(
          `https://parseapi.back4app.com/classes/Continentscountriescities_City?limit=20&order=-population&keys=name,location&where=${where}`,
          {
            headers: {
              "X-Parse-Application-Id":
                "mfpmjU4NFMM0RudR7jTsImrVvH16ZG7aqJhqWoiZ", // This is your app's application id
              "X-Parse-REST-API-Key":
                "5kDXPpyzOXoLdqeid6koqIX7TVKpK97k1GEw33BK", // This is your app's REST API key
            },
          }
        );
        const data = await response.json();
        const { results } = data; // Here you have the data that you need

        dispatch(citiesSlice.actions.addCities({ name, results, topName }));
      })();
    }
  }, []);

  return (
    <div>
      <div className="top-tile">
        <h1>{name}</h1>
        <p>{cities.length} available cities</p>
      </div>

      <div>
        <div className="list-container">
          {cities.map((city, index) => (
            <Tile
              type="isCity"
              topName={name}
              name={city.name}
              index={index}
              key={city.id}
              id={city.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
