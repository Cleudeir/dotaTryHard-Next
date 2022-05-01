/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import matchesData from '../../back/matches';
import style from '../../styles/Home.module.css';
import Header from '../../front/Header';
import Footer from '../../front/Footer';
import Add from '../../back/add';

const SteamID = require('steamid');
const React = require('react');

function sleep(ms) {
  return new Promise(
    (resolve) => setTimeout(resolve, ms),
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  let { id } = context.params;

  if (+id > 1818577144) {
    const steamId = new SteamID(`${id}`);
    const unfiltered = steamId.getSteam3RenderedID();
    const filter = unfiltered.slice(5, 50).replace(']', '');
    id = filter;
  }
  console.log('id:', id);
  console.log('getStatic');
  await Add({ accountId: id, country: 0 });
  let req = await matchesData({ accountId: id });
  let count = 0;
  while (req.status !== 200) {
    if (count === 3) {
      break;
    }
    count += 1;
    console.log(count);
    await sleep(1000);
    console.log('Buscando...');
    req = await matchesData({ accountId: id });
  }

  const { status, message, data } = req;
  return {
    props: {
      status,
      message,
      data: data.slice(0, 30),
      id,
    }, // will be passed to the page component as props
    revalidate: 24 * 60 * 60,
  };
}

export default function Home({
  status, message, data,
}) {
  const [useMatch, setMatch] = useState(null);
  const [useStatus, setStatus] = useState(null);
  const [requestData, setRequestData] = useState(null);
  const [view, setView] = useState(0);
  const [error, setError] = useState(false);

  async function start() {
    console.log('start');
    setMatch(null);
    setError(false);
    if (status === 500) {
      setError(message);
    }
    if (data) {
      setRequestData(data);
      const { match, status } = data[view];
      setMatch(match);
      setStatus(status);
    }
  }

  function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours > 0) { minutes += hours * 60; }
    if (hours < 10) { hours = `0${hours}`; }
    if (minutes < 10) { minutes = `0${minutes}`; }
    if (seconds < 10) { seconds = `0${seconds}`; }
    return `${minutes}:${seconds}`; // Return is HH : MM : SS
  }

  function pages(props) {
    let value = view + props;
    if (value < 0) {
      value = 0;
    } else if (value > requestData.length - 1) {
      value = requestData.length - 1;
    }
    setView(value);

    const { match, status } = requestData[value];
    setMatch(match);
    setStatus(status);
  }

  useEffect(() => {
    start();
  }, []);

  const loss = { background: '#871616b8', color: 'white', width: '5px' };
  const win = { background: '#068834', color: 'white', width: '5px' };
  return (
    <div className={style.container}>
      <Header />
      <main className={style.main}>
        {!requestData && !error && <img width={50} style={{ marginTop: '50px' }} alt="loading" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />}
        {error && (
        <div>
          <h6 style={{ margin: '20px auto' }} className={style.texto}><h2>{error}</h2></h6>
        </div>
        )}
        {useStatus && useMatch && !error && (
          <div className={style.pages}>
            <div style={{ display: 'flex' }}>
              <h5 style={{ verticalAlign: 'center', padding: '12px', color: 'white' }}>
                PAGE {parseInt(view + 1, 10)}/{parseInt(requestData.length, 10)}
              </h5>
              <button type="button" className={style.myButton} onClick={() => { pages(-1); }}>
                BACK
              </button>
              <button type="button" className={style.myButton} onClick={() => { pages(1); }}>
                NEXT
              </button>
            </div>
            <div className={style.input} style={{ color: 'white' }}>
              <div>
                {`Inicio ${new Date(useMatch.start_time * 1000).toLocaleDateString('pt-BR')} 
                ${new Date(useMatch.start_time * 1000).toLocaleTimeString('pt-BR')}` }
              </div>
              <div>
                {`Duração ${convertHMS(useMatch.duration)} - ${useMatch.cluster}` }
              </div>
              <div>
                Radiant |{`${useMatch.radiant_score}| - |${useMatch.dire_score}| Dire` }
              </div>
            </div>
            <div className={style.tabelas}>
              <table className={style.table}>
                <thead>
                  <tr>
                    <td colSpan="2">Position</td>
                    <td>Nick</td>
                    <td>K/D/A</td>
                    <td>L/D</td>
                    <td>GPM</td>
                    <td>XPM</td>
                    <td>Hero</td>
                    <td>Tower</td>
                    <td>Heal</td>
                  </tr>
                </thead>
                <tbody>
                  { useStatus.map((data, i) => (
                    <tr key={data.account_id} style={data.leaver_status === 0 ? { color: 'white' } : { color: 'red' }}>
                      <td style={data.win === 0 ? loss : win}>
                        {i + 1}
                      </td>
                      <td style={{ paddingTop: '4px' }}>
                        <a href={`/matches/${data.account_id}`}>
                          <img width={30} height={30} src={data.avatarfull} alt={data.avatarfull} />
                        </a>

                      </td>
                      <td>
                        <a href={`/matches/${data.account_id}`}>
                          {data.personaname.slice(0, 10)}<br />
                        </a>
                      </td>
                      <td>
                        {data.kills !== '-' ? `${data.kills}/${data.deaths}/${data.assists}` : '-'}
                      </td>
                      <td>
                        {data.kills !== '-' ? `${data.last_hits}/${data.denies}` : '-'}
                      </td>
                      <td>
                        {data.gold_per_min.toLocaleString('pt-BR')}
                      </td>
                      <td>
                        {data.xp_per_min.toLocaleString('pt-BR')}
                      </td>
                      <td>
                        {data.hero_damage.toLocaleString('pt-BR')}
                      </td>
                      <td>
                        {data.tower_damage.toLocaleString('pt-BR')}
                      </td>
                      <td>
                        {data.hero_healing.toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className={style.table}>
                <thead>
                  <tr>
                    <td colSpan="2">Position</td>
                    <td>Nick</td>
                    <td>Hero</td>
                    <td colSpan="4">Ability</td>
                  </tr>
                </thead>
                <tbody>
                  { useStatus.map((data, i) => {
                    if (data.ability_0 !== '-' && data.item_0 !== '-') {
                      return (
                        <tr key={data.account_id} style={data.leaver_status === 0 ? { color: 'white' } : { color: 'red' }}>
                          <td style={data.win === 0 ? loss : win}>
                            {i + 1}
                          </td>
                          <td style={{ paddingTop: '4px' }}>
                            <a href={`/matches/${data.account_id}`}>
                              <img width={30} height={30}
                                src={data.avatarfull} alt={data.avatarfull}
                              />
                            </a>
                          </td>
                          <td>
                            <a href={`/matches/${data.account_id}`}>
                              {data.personaname.slice(0, 10)}<br />
                            </a>
                          </td>
                          <td><img width={50} height={30}
                            src={data.hero_id} alt={data.hero_id.slice(0, 0)}
                          />
                          </td>
                          <td style={{ paddingTop: '4px' }}>
                            <img width={30} height={30}
                              src={data.ability_0} alt={data.ability_0.slice(0, 0)}
                            />
                          </td>
                          <td style={{ paddingTop: '4px' }}>
                            <img width={30} height={30}
                              src={data.ability_1} alt={data.ability_1.slice(0, 0)}
                            />
                          </td>
                          <td style={{ paddingTop: '4px' }}>
                            <img width={30} height={30}
                              src={data.ability_2} alt={data.ability_2.slice(0, 0)}
                            />
                          </td>
                          <td style={{ paddingTop: '4px' }}>
                            <img width={30} height={30}
                              src={data.ability_3} alt={data.ability_3.slice(0, 0)}
                            />
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={data.account_id} style={data.leaver_status === 0 ? { color: 'white' } : { color: 'red' }}>
                        <td style={data.win === 0 ? loss : win}>
                          {i + 1}
                        </td>
                        <td style={{ paddingTop: '4px' }}>
                          <img width={30} height={30}
                            src={data.avatarfull} alt={data.avatarfull}
                          />
                        </td>
                        <td style={{ paddingTop: '4px' }}>-</td>
                        <td style={{ paddingTop: '4px' }}>-</td>
                        <td style={{ paddingTop: '4px' }}>-</td>
                        <td style={{ paddingTop: '4px' }}>-</td>
                        <td style={{ paddingTop: '4px' }}>-</td>
                        <td style={{ paddingTop: '4px' }}>-</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
