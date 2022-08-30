import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { countriesSlice } from "../redux/countriesSlice";

export default function Country() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id, name, continentName } = location.state
  console.log(id, name)

  const countries = useSelector((state) => state.countries[continentName]);
  // const country = countries.countries.find((country) => country.name === name);

  console.log(countries)

  useEffect(() => {
    (async () => {
      const where = encodeURIComponent(JSON.stringify({
        "country": {
          "__type": "Pointer",
          "className": "Continentscountriescities_Country",
          "objectId": id
        }
      }));
      const response = await fetch(
        `https://parseapi.back4app.com/classes/Continentscountriescities_City?limit=20&order=-population&keys=name,location&where=${where}`,
        {
          headers: {
            'X-Parse-Application-Id': 'mfpmjU4NFMM0RudR7jTsImrVvH16ZG7aqJhqWoiZ', // This is your app's application id
            'X-Parse-REST-API-Key': '5kDXPpyzOXoLdqeid6koqIX7TVKpK97k1GEw33BK', // This is your app's REST API key
          }
        }
      );
      const data = await response.json();
      const results = data.results// Here you have the data that you need

      dispatch(countriesSlice.actions.addCities({name, results, continentName}))
    })();
  }, [])

  return (
    <div>
      HeyyAAA
    </div>
  )
}