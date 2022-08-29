import { continentSlice } from "./continentsSlice";
import { configureStore } from "@reduxjs/toolkit/";
import { countriesSlice } from "./countriesSlice";

export const store = configureStore({
  reducer: {
    continents: continentSlice.reducer,
    countries: countriesSlice.reducer,
  }
})

