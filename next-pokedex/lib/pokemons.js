import axios from "axios";
import { Promise as bluebirdPromise } from "bluebird";

const url = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
const imageUrl = (id) => `https://cdn.traction.one/pokedex/pokemon/${id}.png`;

export async function getPokemons(index) {
  const pokemonsPromises = Array(151)
    .fill()
    .map(async (_, i) => {
      const { data } = await axios.get(url(i + 1));

      return data, sprite;
    });

  const pokemons = await bluebirdPromise.all(pokemonsPromises);

  return pokemons;
}
