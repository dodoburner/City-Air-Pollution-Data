import { createSlice } from "@reduxjs/toolkit";
import { continentSlice } from "./continentsSlice";

const initialState = {};

function createCountry(name, id) {
  return ({
    name,
    id,
    cities: []
  })
}

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addCities: (state, action) => {
      const continentName = action.payload.continentName;
      const country = state[continentName].find(el => el.name === action.payload.name);
      country.cities = [...action.payload.results]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(continentSlice.actions.addCountries, (state, action) => {
      const countries = action.payload.results.map((country) => createCountry(country.name, country.objectId))
      const name = action.payload.name;
      state[name] = countries
    })
  }
})