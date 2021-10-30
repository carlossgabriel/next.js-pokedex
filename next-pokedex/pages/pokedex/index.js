import { PrismaClient } from '@prisma/client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '../../components/layout.js';
import utilStyles from '../../styles/utils.module.css';

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
            <button
              type="button"
              className={utilStyles.listItem}
              key={pokemon.id}
              onClick={() => {
                console.log('BUTTON CLICKED');
              }}
            >
              <Link
                href={`pokedex/${pokemon.id.toString()}`}
                as={`/pokedex/${pokemon.id.toString()}`}
              >
                <li>
                  <Image
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    width={80}
                    height={80}
                  />
                  <p>{pokemon.name.toUpperCase()}</p>
                </li>
              </Link>
            </button>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
