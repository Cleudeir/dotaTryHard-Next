import Head from 'next/head';
import Link from 'next/link';

import style from '../styles/Home.module.css';

const React = require('react');

export default function Header() {
  return (
    <div className={style.header}>
      <Head>
        <title>DotaTryHard</title>
        <meta name="description" content="DotaTryHard" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Link href="/ranking" passHref>
        <a href="replace" className={style.myButton} style={{ width: '60px' }}>
          <h3 className={style.title}>TRYHARD</h3>
        </a>
      </Link>
      <div>
        <Link href="/add" passHref>
          <a href="replace" className={style.myButton}>
            add/update
          </a>
        </Link>
        {/* <Link href="/ranking/" passHref>
          <a href="replace" className={style.myButton}>
            Ranking
          </a>
        </Link>
        <Link href="/matches" passHref>
          <a href="replace" className={style.myButton}>
            Matches
          </a>
        </Link>
        */}
        <Link href="/graph" passHref>
          <a href="replace" className={style.myButton}>
            Graph
          </a>
        </Link>

      </div>
    </div>
  );
}
