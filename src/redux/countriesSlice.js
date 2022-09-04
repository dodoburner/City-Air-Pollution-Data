import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = [];

function createCountry(name, id, continent) {
  return {
    name,
    id,
    continent,
  };
}

export default createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase('countries/fetchCountries/fulfilled', (state, action) => {
      const { name: continent } = action.payload;
      action.payload.results.map((country) => (
        state.push(createCountry(country.name, country.objectId, continent))));
    });
  },
});

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async ({ name, id }) => {
    const where = encodeURIComponent(
      JSON.stringify({
        continent: {
          __type: 'Pointer',
          className: 'Continentscountriescities_Continent',
          objectId: id,
        },
      }),
    );
    const response = await fetch(
      `https://parseapi.back4app.com/classes/Continentscountriescities_Country?keys=name&where=${where}`,
      {
        headers: {
          'X-Parse-Application-Id':
            'mfpmjU4NFMM0RudR7jTsImrVvH16ZG7aqJhqWoiZ', // This is your app's application id
          'X-Parse-REST-API-Key':
            '5kDXPpyzOXoLdqeid6koqIX7TVKpK97k1GEw33BK', // This is your app's REST API key
        },
      },
    );
    const data = await response.json(); // Here you have the data that you need
    const { results } = data;

    // const data1 = await axios.get(
    //   'http://api.airvisual.com/v2/countries?key=d4281486-c6e5-40f2-a45a-666c2a800bae',
    // );
    // let allCountries = data1.data.data;
    // allCountries = allCountries.map((country) => country.country);

    // results = results.filter((result) => allCountries.includes(result.name));
    return { results, name };
  },
);
