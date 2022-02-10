/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */
import { useState } from 'react';
import StatusAverage from '../components/math/StatusAverage';
import style from '../styles/Home.module.css';

export default function Home() {
  const [id, setId] = useState('87683422');
  const [status, setStatus] = useState('');
  const [rank, setRank] = useState('');
  async function requests() {
    async function pull(url, parameter) {
      const result = await fetch(url, parameter)
        .then((resp) => resp.json())
        .then((resp) => resp)
        .catch((error) => error.message);
      return result;
    }

    // Procurar partidas jogadas
    const matches = await pull(`/api/Matches/${id}`);

    // Procurar informações do perfil
    const profile = await pull(`/api/Profile/${id}`);

    // ler DataBase e filtrar novas partidas
    const readAndFilter = await pull(`/api/DataBase/read&filter/${id}`, {
      method: 'POST',
      body: JSON.stringify(matches),
    });

    // Procurar status de cada partida
    const statusMatches = await pull(`/api/Status/${id}`, {
      method: 'POST',
      body: JSON.stringify(readAndFilter.filter),
    });

    // escrever na data base
    if (statusMatches.length > 0) {
      await pull(`/api/DataBase/write/${id}`, {
        method: 'POST',
        body: JSON.stringify(statusMatches),
      });
    }

    // Fazer media
    const statusAverage = StatusAverage(readAndFilter.read);
    //
    console.log({ ...profile, ...statusAverage });
    setStatus({ ...profile, ...statusAverage });
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
              (e) => { setId(e.target.value); }
            }
          />
          <button className={style.myButton} onClick={requests} type="button">Buscar</button>
        </div>
        {status && (
          <div>
            <table className={style.table}>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Pais</td>
                  <td>Icon</td>
                  <td>assists</td>
                  <td>deaths</td>
                  <td>denies</td>
                  <td>gpm</td>
                  <td>hero_damage</td>
                  <td>hero_healing</td>
                  <td>kills</td>
                  <td>last_hits</td>
                  <td>net_worth</td>
                  <td>tower_damage</td>
                  <td>winRate</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{status.personaname}</td>
                  <td>{status.loccountrycode}</td>
                  <td><img src={status.avatarfull} alt={status.personaname} /></td>
                  <td>{status.assists}</td>
                  <td>{status.deaths}</td>
                  <td>{status.denies}</td>
                  <td>{status.gold_per_min}</td>
                  <td>{status.hero_damage}</td>
                  <td>{status.hero_healing}</td>
                  <td>{status.kills}</td>
                  <td>{status.last_hits}</td>
                  <td>{status.net_worth}</td>
                  <td>{status.tower_damage}</td>
                  <td>{status.winRate}</td>
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
                  <td>Name</td>
                  <td>Pais</td>
                  <td>Icon</td>
                  <td>assists</td>
                  <td>deaths</td>
                  <td>denies</td>
                  <td>gpm</td>
                  <td>hero_damage</td>
                  <td>hero_healing</td>
                  <td>kills</td>
                  <td>last_hits</td>
                  <td>net_worth</td>
                  <td>tower_damage</td>
                  <td>winRate</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{status.personaname}</td>
                  <td>{status.loccountrycode}</td>
                  <td><img src={status.avatarfull} alt={status.personaname} /></td>
                  <td>{status.assists}</td>
                  <td>{status.deaths}</td>
                  <td>{status.denies}</td>
                  <td>{status.gold_per_min}</td>
                  <td>{status.hero_damage}</td>
                  <td>{status.hero_healing}</td>
                  <td>{status.kills}</td>
                  <td>{status.last_hits}</td>
                  <td>{status.net_worth}</td>
                  <td>{status.tower_damage}</td>
                  <td>{status.winRate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
      <footer className={style.footer}>
        -
      </footer>
    </div>
  );
}
