import Image from 'next/image';
import PropTypes from 'prop-types';

import Layout from '../../components/layout.js';
import { getAllPokemonsIds, getPokemonDataById } from '../../lib/pokemons.js';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticPaths() {
  const paths = getAllPokemonsIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pokemonData = await getPokemonDataById(parseInt(params.id, 10));
  return {
    props: {
      pokemonData,
    },
  };
}

function Pokemon({ pokemonData }) {
  return (

    <Layout>
      <div className={utilStyles.pokemonCard}>
        <Image
          src={pokemonData.sprite}
          alt={pokemonData.name}
          width={80}
          height={80}
        />
        <div className={`${utilStyles.pokemonDescription}${utilStyles.lighText}`}>
          <p>
            {pokemonData.name.toUpperCase()}
          </p>
          <p>
            {pokemonData.types[0].toUpperCase()}
          </p>
          {pokemonData.types[1] ? (
            <p>
              {pokemonData.types[1].toUpperCase()}
            </p>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}

Pokemon.propTypes = {
  pokemonData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sprite: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string),
  }),
};

Pokemon.defaultProps = {
  pokemonData: {
    id: 1, name: '', sprite: '', types: [],
  },
};

export default Pokemon;
