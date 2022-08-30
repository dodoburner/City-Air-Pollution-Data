import { createSlice } from '@reduxjs/toolkit';

function createContinent(name, id) {
  return ({
    name,
    id,
    countries: [],
  });
}
const initialState = [
  createContinent('Asia', 'mSxk54vkg6'),
  createContinent('Europe', '28HX8qDZHw'),
  createContinent('North America', 'vZNZcahFvu'),
  createContinent('South America', 'ISPUD93Or8'),
  createContinent('Africa', 'X2rEcTJnsE'),
  createContinent('Oceania', 'E6LHZzkHr6'),
];

export const continentSlice = createSlice({
  name: 'continent',
  initialState,
  reducers: {
    addCountries: (state, action) => {
      const continent = state.find((el) => el.name === action.payload.name);
      continent.countries = action.payload.results;
    },
  },
});
