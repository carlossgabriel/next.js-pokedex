import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import { getPokemons } from "../lib/pokemons";
import utilStyles from "../styles/utils.module.css";
import Image from "next/image";
import { Promise as bluebirdPromise } from "bluebird";

export async function getStaticProps() {
  // iteration loop to getall 150 pokemons

  const pokemons = await getPokemons();
  // console.log("pokemons", pokemons);

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
        <ul className={utilStyles.list}>
          {pokemons.map((pokemon, i) => (
            <li className={utilStyles.listItem} key={pokemon.id}>
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={60}
                height={60}
              />
              <Link href={""}>
                <a
                  style={{
                    color: "black",
                  }}
                >
                  {pokemon.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
