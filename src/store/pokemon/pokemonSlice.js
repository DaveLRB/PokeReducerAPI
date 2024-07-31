import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pokemon: [],
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonInfo: (state, action) => {
      state.pokemon = action.payload;
    }
  },
});

export const { setPokemonInfo } = pokemonSlice.actions;

export const fetchPokemon = () => async dispatch => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20`);
    const promises = response.data.results.map(poke =>
      axios.get(poke.url)
    );
    const pokemonDetails = await Promise.all(promises);
    const pokemonData = pokemonDetails.map(poke => poke.data);
    dispatch(setPokemonInfo(pokemonData));
  } catch (error) {
    console.error('Failed to fetch Pokemon:', error);
  }
};



export default pokemonSlice.reducer;