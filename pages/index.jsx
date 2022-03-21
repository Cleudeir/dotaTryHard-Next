import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import style from '../styles/Home.module.css';
import Header from '../front/Header';
import Footer from '../front/Footer';

const React = require('react');

export default function Home() {
  const router = useRouter();
  const [id, setId] = useState(87683422); // 87683422
  const [country, setCountry] = useState(0);

  useEffect(() => {

  }, [router]);

  return (
    <div className={style.container}>
      <Header />
      <main className={style.main}>
        <div className={style.input}>
          <div className={style.texto}>
            <h6> SEARCH WITH YOUR ACCOUNT_ID OR STEAM_ID</h6>
          </div>
          <div>
            <select className={style.myButton} style={{ textAlign: 'center', width: '45%' }}
              value={country} onChange={(e) => { setCountry(e.target.value); }}
            >
              <option value={0}>World</option>
              <option value={1}>South America</option>
              <option value={2}>Norte America</option>
              <option value={3}>Europe</option>
            </select>
            <input type="number" placeholder="Account id" className={style.myButton} value={id} style={{ textAlign: 'center', width: '45%' }}
              onChange={(e) => { setId(e.target.value); }}
            />

          </div>
          <div>
            <Link href={id === '' ? '/' : `/ranking/${country}/${id}`} passHref>
              <a href="replace" className={style.myButton}>
                Ranking
              </a>
            </Link>
            <Link href={id === '' ? '/' : `/matches/${id}`} passHref>
              <a href="replace" className={style.myButton}>
                Matches
              </a>
            </Link>
            <Link href="/graph" passHref>
              <a href="replace" className={style.myButton}>
                Graph
              </a>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
