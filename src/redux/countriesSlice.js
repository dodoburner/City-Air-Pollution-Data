import { createSlice } from "@reduxjs/toolkit";
import { continentSlice } from "./continentsSlice";

const initialState = {
  countries: [],
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(continentSlice.actions.addCountries, (state, action) => {
      state.countries = [...state.countries, ...action.payload.results]
    })
  }
})