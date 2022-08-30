import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { countriesSlice } from '../redux/countriesSlice';
import Tile from './Tile';

export default function Country() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id, name, topName } = location.state;

  const countries = useSelector((state) => state.countries[topName]);
  const country = countries.find((el) => el.name === name);
  const { cities } = country;

  useEffect(() => {
    if (cities.length === 0) {
      (async () => {
        const where = encodeURIComponent(
          JSON.stringify({
            country: {
              __type: 'Pointer',
              className: 'Continentscountriescities_Country',
              objectId: id,
            },
          }),
        );
        const response = await fetch(
          `https://parseapi.back4app.com/classes/Continentscountriescities_City?limit=20&order=-population&keys=name,location&where=${where}`,
          {
            headers: {
              'X-Parse-Application-Id':
                'mfpmjU4NFMM0RudR7jTsImrVvH16ZG7aqJhqWoiZ', // This is your app's application id
              'X-Parse-REST-API-Key':
                '5kDXPpyzOXoLdqeid6koqIX7TVKpK97k1GEw33BK', // This is your app's REST API key
            },
          },
        );
        const data = await response.json();
        const { results } = data; // Here you have the data that you need

        dispatch(countriesSlice.actions.addCities({ name, results, topName }));
      })();
    }
  }, []);

  // const cities = [
  //   {
  //     objectId: "NebBw2HYys",
  //     location: {
  //       __type: "GeoPoint",
  //       latitude: 42.50779,
  //       longitude: 1.52109,
  //     },
  //     name: "Andorra la Vella",
  //     population: 20430,
  //     createdAt: "2019-12-09T21:04:56.736Z",
  //     updatedAt: "2019-12-09T21:04:56.736Z",
  //   },
  //   {
  //     objectId: "PfCHLgNgxW",
  //     location: {
  //       __type: "GeoPoint",
  //       latitude: 42.50729,
  //       longitude: 1.53414,
  //     },
  //     name: "les Escaldes",
  //     population: 15853,
  //     createdAt: "2019-12-09T21:04:56.736Z",
  //     updatedAt: "2019-12-09T21:04:56.736Z",
  //   },
  //   {
  //     objectId: "WLDxy5Pnf2",
  //     location: {
  //       __type: "GeoPoint",
  //       latitude: 42.53474,
  //       longitude: 1.58014,
  //     },
  //     name: "Encamp",
  //     population: 11223,
  //     createdAt: "2019-12-09T21:04:56.736Z",
  //     updatedAt: "2019-12-09T21:04:56.736Z",
  //   },
  //   {
  //     objectId: "WzDsOv5jmB",
  //     location: {
  //       __type: "GeoPoint",
  //       latitude: 42.46372,
  //       longitude: 1.49129,
  //     },
  //     name: "Sant Julià de Lòria",
  //     population: 8022,
  //     createdAt: "2019-12-09T21:04:56.736Z",
  //     updatedAt: "2019-12-09T21:04:56.736Z",
  //   },
  //   {
  //     objectId: "JJfZWgGdZu",
  //     location: {
  //       __type: "GeoPoint",
  //       latitude: 42.54499,
  //       longitude: 1.51483,
  //     },
  //     name: "la Massana",
  //     population: 7211,
  //     createdAt: "2019-12-09T21:04:56.736Z",
  //     updatedAt: "2019-12-09T21:04:56.736Z",
  //   },
  //   {
  //     objectId: "JP7JaMbsNm",
  //     location: {
  //       __type: "GeoPoint",
  //       latitude: 42.5676,
  //       longitude: 1.59756,
  //     },
  //     name: "Canillo",
  //     population: 3292,
  //     createdAt: "2019-12-09T21:04:56.736Z",
  //     updatedAt: "2019-12-09T21:04:56.736Z",
  //   },
  //   {
  //     objectId: "vW6EoMjWj5",
  //     location: {
  //       __type: "GeoPoint",
  //       latitude: 42.55623,
  //       longitude: 1.53319,
  //     },
  //     name: "Ordino",
  //     population: 3066,
  //     createdAt: "2019-12-09T21:04:56.736Z",
  //     updatedAt: "2019-12-09T21:04:56.736Z",
  //   },
  //   {
  //     objectId: "yWp558Fr2m",
  //     location: {
  //       __type: "GeoPoint",
  //       latitude: 42.54277,
  //       longitude: 1.73361,
  //     },
  //     name: "Pas de la Casa",
  //     population: 2363,
  //     createdAt: "2019-12-09T21:04:56.736Z",
  //     updatedAt: "2019-12-09T21:04:56.736Z",
  //   },
  //   {
  //     objectId: "eRjFMmUuJC",
  //     location: {
  //       __type: "GeoPoint",
  //       latitude: 42.57205,
  //       longitude: 1.48453,
  //     },
  //     name: "Arinsal",
  //     population: 1419,
  //     createdAt: "2019-12-09T21:04:56.736Z",
  //     updatedAt: "2019-12-09T21:04:56.736Z",
  //   },
  //   {
  //     objectId: "GRGrN67k6k",
  //     location: {
  //       __type: "GeoPoint",
  //       latitude: 42.57952,
  //       longitude: 1.65362,
  //     },
  //     name: "El Tarter",
  //     population: 1052,
  //     createdAt: "2019-12-09T21:04:56.736Z",
  //     updatedAt: "2019-12-09T21:04:56.736Z",
  //   },
  // ];
  return (
    <div>
      <div className="top-tile">
        <h1>{name}</h1>
        <p>
          {cities.length}
          {' '}
          available cities
        </p>
      </div>

      <div>
        <div className="list-container">
          {cities.map((city, index) => (
            <Tile
              type="isCity"
              topName={name}
              name={city.name}
              index={index}
              key={city.objectId}
              id={city.objectId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
