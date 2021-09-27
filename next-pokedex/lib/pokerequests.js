import axios from "axios";

export async function pokerequests(index) {
  const pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${index}`
  ).then((res) => res.json());

  return pokemon;
}
