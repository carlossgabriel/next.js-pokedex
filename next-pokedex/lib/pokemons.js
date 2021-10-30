import { PrismaClient } from ".prisma/client";
import axios from "axios";
import { Promise as bluebirdPromise } from "bluebird";

const url = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
const imageUrl = (id) => `https://cdn.traction.one/pokedex/pokemon/${id}.png`;

export async function getPokemons() {
  const pokemonsPromises = Array(151)
    .fill()
    .map(async (_, i) => {
      const { data } = await axios.get(url(i + 1));

      return data;
    });

  const pokemons = await bluebirdPromise.all(pokemonsPromises);

  return pokemons;
}

export function getAllPokemonsIds() {
  const pokemonsIds = Array(151)
    .fill()
    .map((_, index) => {
      return {
        params: {
          id: (index + 1).toString(),
        },
      };
    });

  return pokemonsIds;
}

export async function getPokemonDataById(id) {
  const prisma = new PrismaClient();
  const pokemon = await prisma.pokemon.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      sprite: true,
      types: true,
    },
  });

  return {
    id,
    ...pokemon,
  };
}
