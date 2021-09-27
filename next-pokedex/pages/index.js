import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home({ allPokerequests }) {
  return (
    <Layout>
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={utilStyles.headingMd}>
        <Link href="/pokedex">
          <a>
            <Image
              src="/pokeball-loading.gif"
              alt="Pokedex"
              width={110}
              height={110}
            />
          </a>
        </Link>
      </section>
    </Layout>
  );
}
