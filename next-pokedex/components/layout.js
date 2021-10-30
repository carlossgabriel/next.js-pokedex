import Head from 'next/head';
import Link from 'next/link';

import utilStyles from '../styles/utils.module.css';
import styles from './layout.module.css';

const name = 'Next.js Pokedex';
export const siteTitle = 'Next.js Pokedex';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
            <p className="description">A simple Pokedex build with Next.js</p>
          </>
        ) : (
          <>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main className={utilStyles.main}>{children}</main>
      {/* {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>🔙 Back to home</a>
          </Link>
        </div>
      )} */}
    </div>
  );
}
