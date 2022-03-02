import { useEffect, useState } from 'react';
import Head from 'next/head';
import Request from '../back';
import style from '../styles/Home.module.css';

const SteamID = require('steamid');
const React = require('react');

export default function Home() {
  const [id, setId] = useState(false); // 87683422
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function start() {
    setRank(null);
    setError(false);
    setLoading(true);
    if (id > 1818577144) {
      const steamId = new SteamID(`${id}`);
      const unfilteredAccountId = steamId.getSteam3RenderedID();
      const accountId = unfilteredAccountId.slice(5, 50).replace(']', '');
      console.log(accountId);
      setId(accountId);
    }
    console.log('start');
    const { status, message, data } = await Request(id);
    if (status !== 'ok') {
      setError(message);
    }
    setLoading(false);
    setRank(data);
  }
  useEffect(() => {
    const remember = localStorage.getItem('id');
    console.log(remember);
    if (remember) {
      setId(remember);
    }
  }, []);

  return (
    <div className={style.container}>
      <Head>
        <title>DotaTryHard</title>
        <meta name="description" content="DotaTryHard" />
        <link rel="icon" href="/faicon.png" />
      </Head>
      <header className={style.header}>
        <a href="/">
          <h2>DOTA TRY HARD</h2>
          {' '}
        </a>
      </header>
      <main className={style.main}>
        <div className={style.input}>
          <div className={style.texto}>
            <h6>SEARCH WITH YOUR ACCOUNT_ID OR STEAM_ID</h6>
          </div>
          <input
            type="number"
            pattern="[0-9]"
            placeholder="Account id"
            className={style.myButton}
            value={id}
            style={{ textAlign: 'center' }}
            onChange={
              (e) => {
                setId(e.target.value);
              }
            }
          />
          <button className={style.myButton} style={{ cursor: 'pointer' }} onClick={start} type="button">Buscar</button>
        </div>
        {loading && <img width={50} style={{ marginTop: '50px' }} alt="loading" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />}
        {error && <div><h4 style={{ margin: '20px auto' }} className={style.texto}>{error}</h4></div>}
        {rank && (
          <div>
            <table className={style.table}>
              <thead>
                <tr>
                  <td>Nº</td>
                  <td>-</td>
                  <td>Name/ID</td>
                  <td>K/D/A</td>
                  <td>L/D</td>
                  <td>GPM</td>
                  <td>XPM</td>
                  <td>
                    W/M
                    <br />
                    Rate
                  </td>
                  <td>Rank</td>
                </tr>
              </thead>
              <tbody>
                {rank && rank.map((data, i) => (
                  <tr key={data.hero_healing * 100}>
                    <td>{i + 1}</td>
                    <td style={{ paddingTop: '4px' }}><img src={data.avatarfull} alt={data.avatarfull} /></td>
                    <td>
                      {data.personaname.slice(0, 14)}
                      {' '}
                      <br />
                      {data.account_id}
                    </td>
                    <td>
                      {data.kills}
                      /
                      {data.deaths}
                      /
                      {data.assists}
                    </td>
                    <td>
                      {data.last_hits}
                      /
                      {data.denies}
                    </td>
                    <td>{data.gold_per_min}</td>
                    <td>{data.xp_per_min}</td>
                    <td>
                      {data.win}
                      /
                      {data.matches}
                      <br />
                      {data.winRate}
                      %
                    </td>
                    <td>{data.ranking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <footer className={style.footer}>
        <h6>
          Copyright 2022 - by Avatar
        </h6>
      </footer>
    </div>
  );
}
