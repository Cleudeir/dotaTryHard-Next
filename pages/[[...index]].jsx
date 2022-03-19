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
  const [dataRank, setDataRank] = useState(null);
  const [dataReq, setDataReq] = useState(null);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [view, setView] = useState(0);
  const [country, setCountry] = useState(0);
  const [range] = useState(50);

  async function start() {
    console.log('start');
    localStorage.setItem('id', id);
    setDataRank(null);
    setError(false);
    setLoading(true);
    if (id > 1818577144) {
      const steamId = new SteamID(`${id}`);
      const unfiltered = steamId.getSteam3RenderedID();
      const accountId = unfiltered.slice(5, 50).replace(']', '');
      setId(accountId);
    }
    Search({ id, country });
    const { status, message, data } = await Request({ id, country });
    if (status !== 'ok') {
      setError(message);
      localStorage.removeItem('id');
    }
    setLoading(false);
    if (data) {
      setDataRank(data.slice(view, view + range));
      setDataReq(data);
    }
  }
  useEffect(() => {
    const { index } = router.query;
    if (index && index[0] && index[0] !== '' && typeof 'number') {
      const valueId = index[0];
      setId(valueId);
      localStorage.setItem('id', valueId);
      start();
      console.log(valueId);
    } else {
      const remember = localStorage.getItem('id');
      if (remember) {
        setId(remember);
      }
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
    const val = props;
    console.log(val);
    if (+val > 0) {
      setFilter(props);
      setDataRank(dataReq.filter(
        (x) => +(x.account_id.toString().slice(0, val.length)) === +val,
      ));
    } else {
      setFilter(props);
      setDataRank(dataReq.filter(
        (x) => (x.personaname.slice(0, val.length)).toUpperCase() === val.toUpperCase(),
      ));
    }

    if (props === '') {
      setDataRank(dataReq.slice(view, view + range));
    }
  }

  return (
    <div className={style.container}>
      <Header />
      <main className={style.main}>
        {!loading && !dataRank && (
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
            <button className={style.myButton} style={{ cursor: 'pointer' }} onClick={() => { if (id !== '' && +id > 0) { start(); } }} type="button">
              Ranking
            </button>
            <button className={style.myButton} style={{ cursor: 'pointer' }} onClick={() => { if (id !== '' && +id > 0) { window.location = `/player/${id}`; } }} type="button">
              Matches
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
        {dataRank && dataReq && (
          <div className={style.pages}>
            <div className={style.headerPages}>
              <div style={{
                display: 'flex', flexWrap: 'nowrap', alignItems: 'center',
              }}
              >
                <h5 style={{
                  verticalAlign: 'center', padding: '9px 9px',
                }}
                >Filter:
                </h5>
                <input type="text" placeholder="Nick or Id" className={style.myButton} value={filter}
                  style={{ width: '10x' }}
                  onChange={(e) => { filterText(e.target.value); }}
                />
              </div>
              <h5 style={{
                width: '75px', verticalAlign: 'center', padding: '9px',
              }}
              >PAGE {Math.ceil(view / range + 1)}/{Math.ceil(dataReq.length / range)}
              </h5>
              <button type="button" className={style.myButton} onClick={() => { pages(-1); }}>
                BACK
              </button>
              <button type="button" className={style.myButton} onClick={() => { if (dataReq.length > range) { pages(1); } }}>
                NEXT
              </button>

            </div>
            <table className={style.table}>
              <thead>
                <tr>
                  <td colSpan="2">Position</td>
                  <td>Nick<br />Country-Id</td>
                  <td>K/D/A<br />L/D</td>
                  <td>GPM<br />XPM</td>
                  <td>Hero<br />Tower<br />Heal</td>
                  <td>Win/Match<br />Rate</td>
                  <td>Rank</td>
                </tr>
              </thead>
              <tbody>
                {dataRank && dataRank.map((data) => (
                  <tr key={data.account_id}>
                    <td>{data.id}</td>
                    <td style={{ paddingTop: '4px' }}>
                      <Image width={40} height={40}
                        src={data.avatarfull} alt={data.avatarfull}
                      />
                    </td>
                    <td>
                      {data.personaname.slice(0, 10)}<br />
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
                      {data.win}/{data.matches}<br />
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
      <Footer />
    </div>
  );
}
