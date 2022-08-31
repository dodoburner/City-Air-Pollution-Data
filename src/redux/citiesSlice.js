import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const createCity = (name, id, lat, long) => ({
  name,
  id,
  lat,
  long,
  info: [],
});

export default createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addInfo: (state, action) => {
      const countryName = action.payload.topName;
      const country = state.find(
        (el) => el.name === countryName,
      );
      const city = country.cities.find((el) => el.name === action.payload.name);
      city.info = action.payload.results;
    },
    addCities: (state, action) => {
      const cities = action.payload.results.map((city) => createCity(
        city.name,
        city.objectId,
        city.location.latitude,
        city.location.longitude,
      ));
      const country = action.payload.name;
      state.push({ name: country, cities });
    },
  },
});
