import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import { pokerequests } from "../lib/pokerequests";
import utilStyles from "../styles/utils.module.css";

export async function getStaticProps() {
  const pokemonList = Array(150)
    .fill()
    .map(async (_, i) => {
      const response = pokerequests(i + 1);
      return response;
    });

  const pokemons = await Promise.all(pokemonList);

  return {
    props: {
      pokemons,
    },
  };
}

export default function Pokedex({ pokemons }) {
  return (
    <Layout>
      <Head>
        <title>1st Generation</title>
      </Head>
      <Link href="/">
        <a>Home</a>
      </Link>
      <div>
        <h1>Pokedex</h1>
        <p>1st generation Pokedex</p>
      </div>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul style={{ columns: "10" }}>
          {pokemons.map((pokemon, i) => (
            <li className={utilStyles.listItem} key={pokemon.id}>
              {pokemon.name}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
