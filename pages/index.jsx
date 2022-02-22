/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */
import { useState } from 'react';
import Request from '../back_end/Request';
import style from '../styles/Home.module.css';

export default function Home() {
  const [id, setId] = useState('87683422');

  const [rank, setRank] = useState(null);

  async function start() {
    const req = await Request(id);
    setRank(req.splice(0, 100));
  }

  return (
    <div className={style.container}>
      <header className={style.header}>
        <h2>DOTA TRY HARD</h2>
      </header>
      <main className={style.main}>
        <div className={style.input}>
          <input
            type="number"
            className={style.myButton}
            value={id}
            style={{ textAlign: 'center' }}
            onChange={
              (e) => { setId(e.target.value); }
            }
          />
          <button className={style.myButton} onClick={start} type="button">Buscar</button>
        </div>

        {rank && (
          <div>
            <table className={style.table}>
              <thead>
                <tr>
                  <td>Nº</td>
                  <td>Avatar</td>
                  <td>Name</td>
                  <td>ID</td>
                  <td>kill</td>
                  <td>death</td>
                  <td>assist</td>
                  <td>last hit</td>
                  <td>deny</td>
                  <td>gpm</td>
                  <td>damage</td>
                  <td>healing</td>
                  <td>net worth</td>
                  <td>tower damage</td>
                  <td>Match</td>
                  <td>Win rate</td>
                  <td>Ranking</td>
                </tr>
              </thead>
              <tbody>
                {rank && rank.map((data, i) => (
                  <tr key={data.hero_healing + data.net_worth + data.tower_damage}>
                    <td>{i + 1}</td>
                    <td><img src={data.avatarfull} alt={data.avatarfull} /></td>
                    <td>{data.personaname}</td>
                    <td>{data.account_id}</td>
                    <td>{data.kills}</td>
                    <td>{data.deaths}</td>
                    <td>{data.assists}</td>
                    <td>{data.last_hits}</td>
                    <td>{data.denies}</td>
                    <td>{data.gold_per_min}</td>
                    <td>{data.hero_damage}</td>
                    <td>{data.hero_healing}</td>
                    <td>{data.net_worth}</td>
                    <td>{data.tower_damage}</td>
                    <td>{data.matches}</td>
                    <td>{data.winRate}</td>
                    <td>{data.ranking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      ;
      <footer className={style.footer}>
        <h6>
          Copyright 2022
        </h6>
      </footer>
    </div>
  );
}
