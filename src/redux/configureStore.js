import { configureStore } from '@reduxjs/toolkit/';
import continentSlice from './continentsSlice';
import countriesSlice from './countriesSlice';
import citiesSlice from './citiesSlice';

export default configureStore({
  reducer: {
    continents: continentSlice.reducer,
    countries: countriesSlice.reducer,
    cities: citiesSlice.reducer,
  },
});
