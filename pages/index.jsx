/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */
import { useState } from 'react';
import request from '../back_end/request';
import style from '../styles/Home.module.css';

export default function Home() {
  const [id, setId] = useState('87683422');
  const [data, setStatus] = useState(null);
  const [rank, setRank] = useState(null);

  async function start() {
    const req = await request(id);
    console.log(req);
    setRank(req.ranking);
    setStatus(req.player);
  }

  return (
    <div className={style.container}>
      <header className={style.header}>
        -
      </header>
      <main className={style.main}>
        <div>
          <input
            className={style.myButton}
            value={id}
            onChange={
              (e) => { console.log(e.target.value); setId(e.target.value); }
            }
          />
          <button className={style.myButton} onClick={start} type="button">Buscar</button>
        </div>
        {data && (
          <div>
            <table className={style.table}>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>assists</td>
                  <td>deaths</td>
                  <td>denies</td>
                  <td>gpm</td>
                  <td>damage</td>
                  <td>healing</td>
                  <td>kills</td>
                  <td>last hits</td>
                  <td>net worth</td>
                  <td>tower damage</td>
                  <td>Win rate</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.personaname}</td>
                  <td>{data.assists}</td>
                  <td>{data.deaths}</td>
                  <td>{data.denies}</td>
                  <td>{data.gold_per_min}</td>
                  <td>{data.hero_damage}</td>
                  <td>{data.hero_healing}</td>
                  <td>{data.kills}</td>
                  <td>{data.last_hits}</td>
                  <td>{data.net_worth}</td>
                  <td>{data.tower_damage}</td>
                  <td>{data.winRate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {rank && (
          <div>
            <table className={style.table}>
              <thead>
                <tr>
                  <td>Avatar</td>
                  <td>Win rate</td>
                  <td>Ranking</td>
                </tr>
              </thead>
              <tbody>
                {rank && rank.map((x) => (
                  <tr key={x.personaname}>
                    <td><img src={x.avatarfull} alt={x.avatarfull} /></td>
                    <td>{x.winRate}</td>
                    <td>{x.ranking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      ;
      <footer className={style.footer}>
        -
      </footer>
    </div>
  );
}
