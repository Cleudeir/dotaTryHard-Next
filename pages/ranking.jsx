import { useEffect, useState } from 'react';
import Image from 'next/image';
import Request from '../back/ranking';
import style from '../styles/Home.module.css';
import Header from '../front/Header';
import Footer from '../front/Footer';

const React = require('react');

export async function getStaticProps() {
  console.log('getStatic');
  const { status, message, data } = await Request({ accountID: 87683422, country: 0 });
  return {
    props: { status, message, data }, // will be passed to the page component as props
    revalidate: 25 * 60,
  };
}

export default function Home({ status, message, data }) {
  const [useCountryData, setCountryData] = useState(null);
  const [useRank, setRank] = useState(null);
  const [useData, setData] = useState(null);
  const [filter, setFilter] = useState('');
  const [useView, setView] = useState(0);
  const [useRange] = useState(50);
  const [country, setCountry] = useState(1);
  const [useError, setError] = useState(false);

  const region = [
    ['CHILE', 'BRAZIL', 'PERU', 'ARGENTINA', 'US WEST', 'US EAST', 'EUROPE', 'STOCKHOLM'],
    ['CHILE', 'BRAZIL', 'PERU', 'ARGENTINA'],
    ['US WEST', 'US EAST'],
    ['EUROPE', 'STOCKHOLM'],
  ];

  useEffect(() => {
    if (status === 500) {
      setError(message);
    }
    if (data) {
      setData(data);
      setCountryData(data);
      let result = [];
      if (country !== 0) {
        for (let i = 0; i < data.length; i += 1) {
          for (let f = 0; f < region[country].length; f += 1) {
            if (data[i].cluster === region[country][f]) {
              result.push(data[i]);
            }
          }
        }
        result = result.map((x, i) => ({ ...x, id: i + 1 }));
      } else {
        result = data;
      }
      setRank(result.slice(useView, useView + useRange));
    }
  }, [data]);

  function pages(props) {
    console.log('---------');
    let value = useView + useRange * props;
    if (value < 0) {
      value = 0;
    } else if (value > useCountryData.length - useRange) {
      value = useCountryData.length - useRange;
    }
    setView(value);
    setRank(useCountryData.slice(value, value + useRange));
  }

  async function regionFilter(props) {
    console.log(props);
    let result = [];
    if (props !== 0) {
      for (let i = 0; i < useData.length; i += 1) {
        for (let f = 0; f < region[props].length; f += 1) {
          if (useData[i].cluster === region[props][f]) {
            result.push(useData[i]);
          }
        }
      }
      result = result.map((x, i) => ({ ...x, id: i + 1 }));
    } else {
      result = useData;
    }
    setCountryData(result);
    setRank(result.slice(0, useRange));
    setView(0);
    setCountry(props);
  }

  function filterText(props) {
    const val = props;
    console.log(val);
    if (+val > 0) {
      setFilter(props);
      setRank(useCountryData.filter(
        (x) => +(x.account_id.toString().slice(0, val.length)) === +val,
      ));
    } else {
      setFilter(props);
      setRank(useCountryData.filter(
        (x) => (x.personaname.slice(0, val.length)).toUpperCase() === val.toUpperCase(),
      ));
    }

    if (props === '') {
      setRank(useCountryData.slice(useView, useView + useRange));
    }
  }

  return (
    <div className={style.container}>
      <Header />
      <main className={style.main}>
        {!useRank && !useError && <img width={50} style={{ marginTop: '50px' }} alt="loading" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />}
        {useError && <h5 style={{ marginTop: '50px' }}>{useError}</h5> }
        {useRank && useData && (
          <div className={style.pages}>
            <div className={style.headerPages}>
              <div className={style.divButton}>
                <h5 className={style.h5Button}>
                  Country
                </h5>
                <select className={style.myButton} style={{ textAlign: 'center' }}
                  value={country} onChange={(e) => { regionFilter(e.target.value); }}
                >
                  <option value={0}>World</option>
                  <option value={1}>South America</option>
                  <option value={2}>Norte America</option>
                  <option value={3}>Europe</option>
                </select>

              </div>
              <div className={style.divButton}>
                <h5 className={style.h5Button}>
                  Filter
                </h5>
                <input type="text" placeholder="Nick or Id" className={style.myButton} value={filter}
                  style={{ width: '120px' }}
                  onChange={(e) => { filterText(e.target.value); }}
                />
              </div>
              {useCountryData && (
              <div className={style.divButton}>
                <h5 className={style.h5Button}>
                  PAGE {Math.ceil(useView / useRange + 1)}
                  /{Math.ceil(useCountryData.length / useRange)}
                </h5>
                <div style={{ display: 'flex' }}>
                  <button type="button" className={style.myButton} onClick={() => { pages(-1); }}>
                    BACK
                  </button>
                  <button type="button" className={style.myButton} onClick={() => { if (useCountryData.length > useRange) { pages(1); } }}>
                    NEXT
                  </button>
                </div>
              </div>
              )}

            </div>
            <table className={style.table}>
              <thead>
                <tr>
                  <td colSpan="2">Position</td>
                  <td>Nick</td>
                  <td>K/D/A <br /> L/D</td>
                  <td>GPM</td>
                  <td>XPM</td>
                  <td>Hero</td>
                  <td>Tower</td>
                  <td>Heal</td>
                  <td>Rate</td>
                  <td>Rank</td>
                </tr>
              </thead>
              <tbody>
                {useRank && useRank.map((data) => (
                  <tr key={data.account_id}>
                    <td>{data.id}</td>
                    <td style={{ paddingTop: '4px' }}>
                      <Image width={35} height={35}
                        src={data.avatarfull} alt={data.avatarfull}
                      />
                    </td>
                    <td style={{ padding: '0px' }}>
                      {data.personaname.slice(0, 10)}<br />
                    </td>
                    <td>
                      {data.kills}/{data.deaths}/{data.assists}<br />{data.last_hits}/{data.denies}
                    </td>
                    <td>
                      {data.gold_per_min.toLocaleString('pt-BR')}
                    </td>
                    <td>
                      {data.xp_per_min.toLocaleString('pt-BR')}
                    </td>
                    <td>
                      {(data.hero_damage / 1000).toFixed(0)}K
                    </td>
                    <td>
                      {(data.tower_damage / 1000).toFixed(1)}K
                    </td>
                    <td>
                      {((data.hero_healing / 1000)) > 1 ? `${(data.hero_healing / 1000).toFixed(1)}K ` : data.hero_healing}
                    </td>
                    <td>
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
