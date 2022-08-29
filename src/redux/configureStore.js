import { continentSlice } from "./continentsSlice";
import { configureStore } from "@reduxjs/toolkit/";

export const store = configureStore({
  reducer: {
    continents: continentSlice.reducer,
  }
})

