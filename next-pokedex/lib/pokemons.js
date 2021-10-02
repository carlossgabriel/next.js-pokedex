import axios from "axios";
import { Promise as bluebirdPromise } from "bluebird";

const url = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

export async function getPokemons(index) {
  const pokemonsPromises = Array(150)
    .fill()
    .map(async (_, i) => {
      const { data } = await axios.get(url(i + 1));
      return data;
    });

  const pokemons = await bluebirdPromise.all(pokemonsPromises);

  return pokemons;
}
