import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { continentSlice } from "../redux/continentsSlice";
import { countriesSlice } from "../redux/countriesSlice";
import Tile from "./Tile";
import axios from 'axios';
let count = 0


export default function Continent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id, name } = location.state;
  // const continent = {
  //   countries: [
  //     {
  //       name: 'Andorra'
  //     },
  //     {
  //       name: 'Andorra'
  //     },
  //     {
  //       name: 'Andorra'
  //     },
  //     {
  //       name: 'Andorra'
  //     },
  //     {
  //       name: 'Andorra'
  //     },
  //     {
  //       name: 'Andorra'
  //     },
  //     {
  //       name: 'Andorra'
  //     },
  //     {
  //       name: 'Andorra'
  //     },
  //   ]
  // }
  const continents = useSelector(state => state.continents)
  const continent = continents.find(continent => continent.name === name);
  const countries = useSelector(state => state.countries)
  console.log(countries)
  useEffect(() => {
    if (continent.countries.length === 0) {
      (async () => {
        const where = encodeURIComponent(
          JSON.stringify({
            continent: {
              __type: "Pointer",
              className: "Continentscountriescities_Continent",
              objectId: id,
            },
          })
        );
        const response = await fetch(
          `https://parseapi.back4app.com/classes/Continentscountriescities_Country?keys=name&where=${where}`,
          {
            headers: {
              "X-Parse-Application-Id":
                "mfpmjU4NFMM0RudR7jTsImrVvH16ZG7aqJhqWoiZ", // This is your app's application id
              "X-Parse-REST-API-Key": "5kDXPpyzOXoLdqeid6koqIX7TVKpK97k1GEw33BK", // This is your app's REST API key
            },
          }
        );
        const data = await response.json(); // Here you have the data that you need
        let results = data.results;
  
        const data1 = await axios.get(
          "http://api.airvisual.com/v2/countries?key=d4281486-c6e5-40f2-a45a-666c2a800bae"
        );
        let allCountries = data1.data.data;
        allCountries = allCountries.map((country) => country.country)
  
        results = results.filter((result) => {
          if (allCountries.includes(result.name)) {
            return result;
          }
        });
        dispatch(continentSlice.actions.addCountries({ name, results }))
      })();
    }
  }, [continents]); 

  return (
    <div className="continent-page">
      <div className="continent-tile">
        <h1>{name}</h1>
        <p>{continent.countries.length} available countries</p>
      </div>
      
      <div className="countries-container">
        {continent.countries.map((country, index) => {
          return <Tile type="isCountry" name={country.name} index={index} key={country.id}/>
        })}
      </div>
    </div>
  )
}