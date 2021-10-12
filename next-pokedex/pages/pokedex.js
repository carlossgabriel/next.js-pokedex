import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import { getPokemons } from "../lib/pokemons";
import utilStyles from "../styles/utils.module.css";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const pokemons = await prisma.pokemon.findMany({
    select: {
      id: true,
      name: true,
      sprite: true,
      types: true,
    },
  });

  return { props: { pokemons } };
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
            <>
              <li className={utilStyles.listItem} key={pokemon.id}>
                <Image
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  width={80}
                  height={80}
                />
                <Link href={`pokedex/${i}`}>
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
            </>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
