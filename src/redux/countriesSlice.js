import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

function createCountry(name, id) {
  return {
    name,
    id,
    cities: [],
  };
}

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    addCities: (state, action) => {
      const continentName = action.payload.topName;
      const continent = state.find(
        (el) => el.name === continentName
      );
      const country = continent.countries.find(el => el.name === action.payload.name)
      country.cities = [...action.payload.results];
    },
    addCountries: (state, action) => {
      const countries = action.payload.results.map((country) =>
        createCountry(country.name, country.objectId)
      );
      const { name } = action.payload;
      state.push({ name, countries });
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase("countries/fetchCountries/fulfilled", (state, action) => {
  //     const countries = action.payload.results.map((country) =>
  //       createCountry(country.name, country.objectId)
  //     );
  //     const { name } = action.payload;
  //     state.push({ name, countries });
  //   });
  // },
});

// export const fetchCountries = createAsyncThunk(
//   "countries/fetchCountries",
//   async (name, id) => {
//   }
// );
