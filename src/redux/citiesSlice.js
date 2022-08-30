import { createSlice } from "@reduxjs/toolkit";
import { countriesSlice } from "./countriesSlice";

const initialState = {};
const createCity = (name, id, lat, long) => ({
  name,
  id,
  lat,
  long,
  info: [],
});

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addInfo: (state, action) => {
      const countryName = action.payload.topName;
      const city = state[countryName].find(el => el.name === action.payload.name)
      city.info = action.payload.results;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(countriesSlice.actions.addCities, (state, action) => {
      const cities = action.payload.results.map((city) =>
        createCity(
          city.name,
          city.objectId,
          city.location.latitude,
          city.location.longitude
        )
      );
      const country = action.payload.name;
      state[country] = cities;
    });
  },
});
