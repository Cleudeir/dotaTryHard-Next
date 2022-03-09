import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Request from '../back';
import style from '../styles/Home.module.css';
import Auto from '../back/auto';
import Header from '../front/Header';

const SteamID = require('steamid');
const React = require('react');

export default function Home() {
  const router = useRouter();

  const [id, setId] = useState(false); // 87683422
  const [dataRank, setDataRank] = useState(null);
  const [dataReq, setDataReq] = useState(null);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [view, setView] = useState(0);
  const [range] = useState(50);

  async function start() {
    setDataRank(null);
    setError(false);
    setLoading(true);
    if (id > 1818577144) {
      const steamId = new SteamID(`${id}`);
      const unfiltered = steamId.getSteam3RenderedID();
      const accountId = unfiltered.slice(5, 50).replace(']', '');
      setId(accountId);
    }
    console.log('start');
    const { status, message, data } = await Request(id);
    if (status !== 'ok') {
      setError(message);
    }
    setLoading(false);
    if (data) {
      setDataRank(data.slice(view, view + range));
      setDataReq(data);

      const arrayPlayers = [];
      for (let i = 0; i < 5; i += 1) {
        arrayPlayers.push(id);
      }

      for (let i = 0; i < data.length; i += 1) {
        if (data[i].matches < 20) {
          arrayPlayers.push(data[i].account_id);
        }
      }
      Auto(arrayPlayers);
      localStorage.setItem('id', id);
    }
  }
  useEffect(() => {
    const { index } = router.query;
    if (index && index[0]) {
      const [valueId] = index;
      setId(valueId);
      localStorage.setItem('id', valueId);
      start();
      console.log(valueId);
    }

    const remember = localStorage.getItem('id');
    if (remember) {
      setId(remember);
    }
  }, [router]);

  function pages(props) {
    console.log('---------');
    let value = view + range * props;
    if (value < 0) {
      value = 0;
    } else if (value > dataReq.length - range) {
      value = dataReq.length - range;
    }
    setView(value);
    setDataRank(dataReq.slice(value, value + range));
  }
  function filterText(props) {
    const letter = props;
    setFilter(props);
    setDataRank(dataReq.filter(
      (x) => (x.personaname.slice(0, letter.length)).toUpperCase() === letter.toUpperCase(),
    ));
    if (props === '') {
      setDataRank(dataReq.slice(view, view + range));
    }
  }
  function cleanDataHome() {
    console.log('apertou');
    setDataRank(null);
  }

  return (
    <div className={style.container}>
      <Header cleanDataHome={() => cleanDataHome} />
      <main className={style.main}>
        {!dataRank && !loading && (
        <div className={style.input}>
          <div className={style.texto}>
            <h6>SEARCH WITH YOUR ACCOUNT_ID OR STEAM_ID</h6>
          </div>
          <div>
            <input type="number" placeholder="Account id" className={style.myButton} value={id} style={{ textAlign: 'center' }}
              onChange={(e) => { setId(e.target.value); }}
            />
            <button className={style.myButton} style={{ cursor: 'pointer' }} onClick={start} type="button">
              SEARCH
            </button>
          </div>
        </div>
        )}

        {loading && <img width={50} style={{ marginTop: '50px' }} alt="loading" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />}

        {error && (
        <div>
          <h6 style={{ margin: '20px auto' }} className={style.texto}>{error}</h6>
        </div>
        )}
        {dataRank && (
          <div className={style.pages}>
            <div>
              <button type="button" className={style.myButton} onClick={() => { pages(-1); }}>
                <h6>BACK</h6>
              </button>
              <button type="button" className={style.myButton} onClick={() => { pages(1); }}>
                <h6>NEXT</h6>
              </button>
              <input type="text" placeholder="Nick" className={style.myButton} value={filter}
                style={{ textAlign: 'center', width: '130px', textTransform: 'none' }}
                onChange={(e) => { filterText(e.target.value); }}
              />
            </div>
            <table className={style.table}>
              <thead>
                <tr>
                  <td>Nº</td>
                  <td>-</td>
                  <td>Nick<br />Country-Id</td>
                  <td>K/D/A<br />L/D</td>
                  <td>GPM<br />XPM</td>
                  <td>Hero<br />Tower<br />Heal</td>
                  <td>W/L<br />Rate</td>
                  <td>Rank</td>
                </tr>
              </thead>
              <tbody>
                {dataRank && dataRank.map((data) => (
                  <tr key={data.account_id}>
                    <td>{data.id}</td>
                    <td style={{ paddingTop: '4px' }}>
                      <img src={data.avatarfull} alt={data.avatarfull} />
                    </td>
                    <td>
                      {data.personaname.slice(0, 15)}<br />
                      {data.loccountrycode === '' ? '' : `${data.loccountrycode}-`}{data.account_id}
                    </td>
                    <td>
                      {data.kills}/{data.deaths}/{data.assists}<br />
                      {data.last_hits}/{data.denies}
                    </td>
                    <td>
                      {data.gold_per_min.toLocaleString('pt-BR')}<br />
                      {data.xp_per_min.toLocaleString('pt-BR')}
                    </td>
                    <td>
                      {data.hero_damage.toLocaleString('pt-BR')}<br />
                      {data.tower_damage.toLocaleString('pt-BR')}<br />
                      {data.hero_healing.toLocaleString('pt-BR')}
                    </td>
                    <td>
                      {data.win}/{data.matches - data.win}<br />
                      {data.winRate}%
                    </td>
                    <td>
                      {data.ranking.toLocaleString('pt-BR')}
                    </td>
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
