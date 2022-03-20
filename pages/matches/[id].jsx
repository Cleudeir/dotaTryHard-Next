/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import player from '../../back/player';
import style from '../../styles/Home.module.css';
import Header from '../../front/Header';
import Footer from '../../front/Footer';

const SteamID = require('steamid');
const React = require('react');

export default function Home() {
  const router = useRouter();
  const [useMatch, setMatch] = useState(null);
  const [useStatus, setStatus] = useState(null);
  const [requestData, setRequestData] = useState(null);
  const [view, setView] = useState(0);
  const [error, setError] = useState(false);

  async function start(props) {
    console.log('start');

    let { accountId } = props;
    setMatch(null);
    setError(false);

    if (accountId > 1818577144) {
      const steamId = new SteamID(`${accountId}`);
      const unfiltered = steamId.getSteam3RenderedID();
      const filter = unfiltered.slice(5, 50).replace(']', '');
      accountId = filter;
    }

    const { status, message, data } = await player({ id: accountId });

    if (status !== 'ok') {
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
    const { id } = router.query;
    if (id && id !== '' && +id > 0) {
      const accountId = id;
      localStorage.setItem('id', accountId);
      start({ accountId });
    }
  }, [router]);
  /*
  function itemView(data) {
    return (
      <>
        <td style={{ paddingTop: '4px' }}>
          <Image width={30} height={30}
            src={data.item_0} alt={data.item_0}
          />
        </td>
        <td style={{ paddingTop: '4px' }}>
          <Image width={30} height={30}
            src={data.item_1} alt={data.item_1}
          />
        </td>
        <td style={{ paddingTop: '4px' }}>
          <Image width={30} height={30}
            src={data.item_2} alt={data.item_2}
          />
        </td>
        <td style={{ paddingTop: '4px' }}>
          <Image width={30} height={30}
            src={data.item_3} alt={data.item_3}
          />
        </td>
        <td style={{ paddingTop: '4px' }}>
          <Image width={30} height={30}
            src={data.item_4} alt={data.item_4}
          />
        </td>
        <td style={{ paddingTop: '4px' }}>
          <Image width={30} height={30}
            src={data.item_5} alt={data.item_5}
          />
        </td>
      </>
    );
  }
  */
  const loss = { background: '#871616b8', color: 'white', width: '5px' };
  const win = { background: '#068834', color: 'white', width: '5px' };
  return (
    <div className={style.container}>
      <Header />
      <main className={style.main}>
        {!requestData && !error && <img width={50} style={{ marginTop: '50px' }} alt="loading" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />}
        {error && (
        <div>
          <h6 style={{ margin: '20px auto' }} className={style.texto}>{error}</h6>
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
                        <Image width={30} height={30} src={data.avatarfull} alt={data.avatarfull} />
                      </td>
                      <td>
                        {data.personaname.slice(0, 10)}<br />
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
                            <Image width={30} height={30}
                              src={data.avatarfull} alt={data.avatarfull}
                            />
                          </td>
                          <td>
                            {data.personaname.slice(0, 10)}<br />
                          </td>
                          <td><Image width={50} height={30}
                            src={data.hero_id} alt={data.hero_id.replace('https://cdn.datdota.com/images/ability/', '').replace('.png', '')}
                          />
                          </td>
                          <td style={{ paddingTop: '4px' }}>
                            <Image width={30} height={30}
                              src={data.ability_0} alt={data.ability_0.replace('https://cdn.datdota.com/images/ability/', '').replace('.png', '')}
                            />
                          </td>
                          <td style={{ paddingTop: '4px' }}>
                            <Image width={30} height={30}
                              src={data.ability_1} alt={data.ability_1.replace('https://cdn.datdota.com/images/ability/', '').replace('.png', '')}
                            />
                          </td>
                          <td style={{ paddingTop: '4px' }}>
                            <Image width={30} height={30}
                              src={data.ability_2} alt={data.ability_2.replace('https://cdn.datdota.com/images/ability/', '').replace('.png', '')}
                            />
                          </td>
                          <td style={{ paddingTop: '4px' }}>
                            <Image width={30} height={30}
                              src={data.ability_3} alt={data.ability_3.replace('https://cdn.datdota.com/images/ability/', '').replace('.png', '')}
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
                          <Image width={30} height={30}
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
