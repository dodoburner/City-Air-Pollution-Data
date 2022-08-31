import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

function createCountry(name, id) {
  return {
    name,
    id,
    cities: [],
  };
}

export default createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addCities: (state, action) => {
      const continentName = action.payload.topName;
      const continent = state.find(
        (el) => el.name === continentName,
      );
      const country = continent.countries.find((el) => el.name === action.payload.name);
      country.cities = [...action.payload.results];
    },
    addCountries: (state, action) => {
      const countries = action.payload.results.map((country) => (
        createCountry(country.name, country.objectId)));
      const { name } = action.payload;
      state.push({ name, countries });
    },
  },
  extraReducers: (builder) => {
    builder.addCase("countries/fetchCountries/fulfilled", (state, action) => {
      const countries = action.payload.results.map((country) =>
        createCountry(country.name, country.objectId)
      );
      const { name } = action.payload;
      state.push({ name, countries });
    });
  },
});

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async ({name, id}) => {
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
    return { results, name }
  }
);
