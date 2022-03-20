import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Request from '../back';
import Search from '../back/search';
import style from '../styles/Home.module.css';
import Header from '../front/Header';
import Footer from '../front/Footer';

const SteamID = require('steamid');
const React = require('react');

export default function Home() {
  const router = useRouter();

  const [id, setId] = useState(''); // 87683422
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(0);
  const [country, setCountry] = useState(0);
  const [range] = useState(50);

  useEffect(() => {

  }, [router]);

  return (
    <div className={style.container}>
      <Header />
      <main className={style.main}>
        {!loading && (
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
            <button className={style.myButton} style={{ cursor: 'pointer' }} onClick={() => { if (id !== '' && +id > 0) { window.location = `/ranking/${country}/${id}`; } }} type="button">
              Ranking
            </button>
            <button className={style.myButton} style={{ cursor: 'pointer' }} onClick={() => { if (id !== '' && +id > 0) { window.location = `/matches/${id}`; } }} type="button">
              Matches
            </button>
          </div>
        </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
