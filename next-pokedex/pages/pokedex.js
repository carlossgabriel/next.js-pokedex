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

      <div>
        <h1>1st generation Pokedex</h1>
      </div>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {pokemons.map((pokemon, i) => (
            <li className={utilStyles.listItem} key={pokemon.id}>
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={80}
                height={80}
              />
              <Link href={""}>
                <a
                  style={{
                    color: "white",
                    fontSize: "16px",
                    textShadow: "-1px 1px black",
                  }}
                >
                  {pokemon.name.toUpperCase()}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
