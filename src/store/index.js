import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemon/pokemonSlice";

const store = configureStore({
    reducer: {
      user: pokemonReducer
    },
  });

  export default store;