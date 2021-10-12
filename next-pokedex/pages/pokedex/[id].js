import Layout from "../../components/layout";
import { prisma, PrismaClient } from ".prisma/client";

export default function Pokemon({ pokemonData }) {
  return (
    <Layout>
      <div>
        pokemon name: {pokemonData.name}
        pokemon id: {pokemonData.id}
        {/* pokemon sprite: {pokemonData.sprite} */}
        pokemon type: {pokemonData.type}
      </div>
    </Layout>
  );
}

// TODO fix the dynamic routing
export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const paths = await prisma.pokemon.findMany({ select: { id: true } });
  prisma.$disconnect();

  const pathsArray = paths.map((path) => {
    return {
      id: path.id,
    };
  });
  console.log("pathsArray", pathsArray);

  return {
    paths: pathsArray,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();
  const pokemonData = await prisma.pokemon.findUnique({
    where: { id: params.id },
  });

  return {
    props: {
      pokemonData,
    },
  };
}
