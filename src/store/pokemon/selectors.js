
export const getPokemonById = (state, id) => 
  state.user.pokemon.find(pokemon => pokemon.id === id);
