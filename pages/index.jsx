import { useState } from 'react';
import Request from '../back';
import style from '../styles/Home.module.css';

export default function Home() {
  const [id, setId] = useState('');

  const [rank, setRank] = useState(null);

  async function start() {
    console.log('start');
    const req = await Request(id);
    setRank(req.splice(0, 300));
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
            placeholder='Account id'
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
                  <td>-</td>
                  <td>Name</td>                 
                  <td>kill</td>
                  <td>death</td>
                  <td>assist</td>                             
                  <td>Win rate</td>
                  <td>Ranking</td>
                </tr>
              </thead>
              <tbody>
                {rank && rank.map((data, i) => (
                  <tr key={data.hero_healing + data.net_worth + data.tower_damage}>
                    <td>{i + 1}</td>
                    <td style={{paddingTop:"4px"}}><img src={data.avatarfull} alt={data.avatarfull} /></td>
                    <td>{data.personaname.slice(0,14)}</td>
                    <td>{data.kills}</td>
                    <td>{data.deaths}</td>
                    <td>{data.assists}</td>                                    
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
          Copyright 2022 - by Avatar 
        </h6>
      </footer>
    </div>
  );
}
