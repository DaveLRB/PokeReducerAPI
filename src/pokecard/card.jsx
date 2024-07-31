import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPokemon } from "../store/pokemon/pokemonSlice";
import "./card.css";

const PokemonCard = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.user.pokemon);

  useEffect(() => {
    dispatch(fetchPokemon());
  }, [dispatch]);

  if (!pokemons.length) {
    return <div>No Poke</div>;
  }

  return (
    <div className="container">
      {pokemons.map((poke, index) => (
        <div
          key={index}
          className={`cardContainer type-${poke.types[0].type.name}`}
        >
          <h2 className="name">{poke.name}</h2>
          <img
            className="imgPoke"
            src={poke.sprites.front_default}
            alt={poke.name}
            onMouseOver={e => (e.currentTarget.src = poke.sprites.front_shiny)}
            onMouseOut={e => (e.currentTarget.src = poke.sprites.front_default)}
          />
          <div className="typeContainer">
          <p>
              {poke.types.map((typeInfo) => typeInfo.type.name).join(", ")}
            </p>
          </div>
          <div className="infoContainer">
            <p className="info">
              <strong>Height:</strong> {poke.height}
            </p>
            <p className="info">
              <strong>Weight: </strong> {poke.weight} kg
            </p>
            <p className="info">
              <strong>Attack:</strong>{" "}
              {poke.stats.find((stat) => stat.stat.name === "attack").base_stat}
            </p>
            <p className="info">
              <strong>Defense:</strong>{" "}
              {
                poke.stats.find((stat) => stat.stat.name === "defense")
                  .base_stat
              }
            </p>
            <p className="info">
              <strong>HP: </strong>
              {poke.stats.find((stat) => stat.stat.name === "hp").base_stat}
            </p>
            <p className="info">
              <strong>Speed:</strong>{" "}
              {poke.stats.find((stat) => stat.stat.name === "speed").base_stat}{" "}
              km/h
            </p>
            <p className="info">
              <strong>Special Attack:</strong>{" "}
              {
                poke.stats.find((stat) => stat.stat.name === "special-attack")
                  .base_stat
              }
            </p>
            <p className="info">
              <strong>Special Defense:</strong>{" "}
              {
                poke.stats.find((stat) => stat.stat.name === "special-defense")
                  .base_stat
              }
            </p>
            <div className="infoSpecial">
              <p className="info">
                <strong>Abilities:</strong>{" "}
                {poke.abilities
                  .filter((ability) => !ability.is_hidden)
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </p>
              <p className="info">
                <strong>Hidden Abilities:</strong>{" "}
                {poke.abilities
                  .filter((ability) => ability.is_hidden)
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Pokemon = () => {
  return (
    <div>
      <PokemonCard />
    </div>
  );
};

export default Pokemon;
