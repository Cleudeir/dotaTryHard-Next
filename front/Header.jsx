import Head from 'next/head';
import Link from 'next/link';
import style from '../styles/Home.module.css';

const React = require('react');

export default function Header(cleanDataHome) {
  return (
    <div className={style.header}>
      <Head>
        <title>DotaTryHard</title>
        <meta name="description" content="DotaTryHard" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <h3 className={style.title}>DOTA TRY HARD</h3>
      <header>
        <Link href="/" passHref>
          <a onClick={() => cleanDataHome()} href="replace" className={style.myButton}>
            Home
          </a>
        </Link>

        <Link href="/graph" passHref>
          <a href="replace" className={style.myButton}>
            Graph
          </a>
        </Link>

      </header>
    </div>
  );
}