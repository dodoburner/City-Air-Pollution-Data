import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
  extraReducers: (builder) => {
    builder.addCase('cities/getCities/fulfilled', (state, action) => {
      const countryName = action.payload.topName;
      const country = state.find(
        (el) => el.name === countryName,
      );
      const city = country.cities.find((el) => el.name === action.payload.name);
      city.info = action.payload.results;
    })
  }
});

export const getCities = createAsyncThunk('cities/getCities', async ({lat, long, topName, name}) => {
  const data = await axios.get(
    `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=d4281486-c6e5-40f2-a45a-666c2a800bae`,
  );
  const results = data.data.data.current;
  return { results, topName, name }
})