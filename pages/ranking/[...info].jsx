import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Request from '../../back/ranking';
import Search from '../../back/search';
import style from '../../styles/Home.module.css';
import Header from '../../front/Header';
import Footer from '../../front/Footer';

const SteamID = require('steamid');
const React = require('react');

export default function Home() {
  const router = useRouter();
  const [dataRank, setDataRank] = useState(null);
  const [dataReq, setDataReq] = useState(null);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [view, setView] = useState(0);
  const [range] = useState(50);

  async function start({ id, country }) {
    let accountID = id;
    console.log('start');
    localStorage.setItem('id', accountID);
    setDataRank(null);
    setError(false);
    setLoading(true);
    if (accountID > 1818577144) {
      const steamId = new SteamID(`${id}`);
      const unfiltered = steamId.getSteam3RenderedID();
      accountID = unfiltered.slice(5, 50).replace(']', '');
    }
    localStorage.setItem('id', accountID);
    Search({ accountID, country });
    const { status, message, data } = await Request({ accountID, country });
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
    const { info } = router.query;
    if (info) {
      const [country, id] = info;
      console.log(country, id);
      if (id && country && id !== '' && id > 0) {
        start({ id, country });
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
                  style={{ width: '100px' }}
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
