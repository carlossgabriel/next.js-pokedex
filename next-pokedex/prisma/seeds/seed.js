const { default: axios } = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Promise } = require("bluebird");

const url = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

async function getPokemons() {
  const pokemonsPromises = Array(151)
    .fill()
    .map(async (_, i) => {
      const { data } = await axios.get(url(i + 1));

      const pokemonData = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        types: data.types.map((array) => array.type.name),
      };
      return pokemonData;
    });

  const pokemons = await Promise.all(pokemonsPromises);

  console.table(pokemons);
  return pokemons;
}

async function main() {
  const data = await getPokemons();
  await prisma.pokemon.createMany({
    data,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("done");
  });
