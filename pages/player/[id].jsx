/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import player from '../../back/player';
import style from '../../styles/Home.module.css';
import styPlayers from '../../styles/Players.module.css';
import Header from '../../front/Header';

const SteamID = require('steamid');
const React = require('react');

export default function Home() {
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const [status, setStatus] = useState(null);
  const [requestDetails, setRequestDetails] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  const [view, setView] = useState(0);
  const [error, setError] = useState(false);

  async function start(props) {
    console.log('start');

    let { accountId } = props;
    console.log('accountId', accountId);
    setDetails(null);
    setError(false);

    if (accountId > 1818577144) {
      const steamId = new SteamID(`${accountId}`);
      const unfiltered = steamId.getSteam3RenderedID();
      const filter = unfiltered.slice(5, 50).replace(']', '');
      accountId = filter;
    }

    const { status, message, data } = await player({ id: accountId });
    console.log('data', data);
    if (status !== 'ok') {
      setError(message);
    }
    if (data) {
      const { dataDetailsMatch, dataDetailsStatus } = data;
      setRequestDetails(dataDetailsMatch);
      setRequestStatus(dataDetailsStatus);
      const match = dataDetailsMatch[view];
      setDetails(match);

      const playersMatch = dataDetailsStatus
        .filter((x) => x.match_id === match.match_id);
      if (playersMatch.length < 10) {
        for (let i = playersMatch.length; i < 10; i += 1) {
          playersMatch.push(
            {
              account_id: '-',
              match_id: '-',
              assists: '-',
              deaths: '-',
              denies: '-',
              gold_per_min: '-',
              hero_damage: '-',
              hero_healing: '-',
              kills: '-',
              last_hits: '-',
              net_worth: '-',
              tower_damage: '-',
              xp_per_min: '-',
              win: '-',
              ability_0: '-',
              ability_1: '-',
              ability_2: '-',
              ability_3: '-',
              Hero_level: '-',
              team: '-',
              leaver_status: 0,
              aghanims_scepter: '-',
              aghanims_shard: '-',
              backpack_0: '-',
              backpack_1: '-',
              backpack_2: '-',
              item_0: '-',
              item_1: '-',
              item_2: '-',
              item_3: '-',
              item_4: '-',
              item_5: '-',
              item_neutral: '-',
              moonshard: -'-',
              personaname: 'undefined',
              avatarfull: 'https://steamuserimages-a.akamaihd.net/ugc/885384897182110030/F095539864AC9E94AE5236E04C8CA7C2725BCEFF/',
              loccountrycode: '',
            },
          );
        }
      }
      setStatus(playersMatch);
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
    console.log('---------');
    let value = view + props;
    if (value < 0) {
      value = 0;
    } else if (value > requestDetails.length - 1) {
      value = requestDetails.length - 1;
    }
    setView(value);

    const match = requestDetails[value];
    setDetails(match);
    const playersMatch = requestStatus
      .filter((x) => x.match_id === match.match_id);
    if (playersMatch.length < 10) {
      for (let i = playersMatch.length; i < 10; i += 1) {
        playersMatch.push(
          {
            account_id: '-',
            match_id: '-',
            assists: '-',
            deaths: '-',
            denies: '-',
            gold_per_min: '-',
            hero_damage: '-',
            hero_healing: '-',
            kills: '-',
            last_hits: '-',
            net_worth: '-',
            tower_damage: '-',
            xp_per_min: '-',
            win: '-',
            ability_0: '-',
            ability_1: '-',
            ability_2: '-',
            ability_3: '-',
            Hero_level: '-',
            team: '-',
            leaver_status: 0,
            aghanims_scepter: '-',
            aghanims_shard: '-',
            backpack_0: '-',
            backpack_1: '-',
            backpack_2: '-',
            item_0: '-',
            item_1: '-',
            item_2: '-',
            item_3: '-',
            item_4: '-',
            item_5: '-',
            item_neutral: '-',
            moonshard: -'-',
            personaname: 'undefined',
            avatarfull: 'https://steamuserimages-a.akamaihd.net/ugc/885384897182110030/F095539864AC9E94AE5236E04C8CA7C2725BCEFF/',
            loccountrycode: '',
          },
        );
      }
    }
    setStatus(playersMatch);
  }

  useEffect(() => {
    const { id } = router.query;
    console.log(id, +id > 0);
    if (id && id !== '' && +id > 0) {
      const accountId = id;
      localStorage.setItem('id', accountId);
      start({ accountId });
    }
  }, [router]);

  const loss = { background: '#871616b8', color: 'white', width: '5px' };
  const win = { background: '#068834', color: 'white', width: '5px' };
  return (
    <div className={style.container}>
      <Header />
      <main className={style.main}>
        {!details && !status && !error && <img width={50} style={{ marginTop: '50px' }} alt="loading" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />}
        {error && (
        <div>
          <h6 style={{ margin: '20px auto' }} className={style.texto}>{error}</h6>
        </div>
        )}

        {details && (
          <div className={style.pages}>

            <div style={{
              display: 'flex',
            }}
            >
              <h5 style={{
                verticalAlign: 'center', padding: '12px', color: 'white',
              }}
              >PAGE {parseInt(view + 1, 10)}/{parseInt(requestDetails.length, 10)}
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
                {`Inicio ${new Date(details.start_time * 1000).toLocaleDateString('pt-BR')} 
                ${new Date(details.start_time * 1000).toLocaleTimeString('pt-BR')}  
               ` }
              </div>
              <div>
                {`Duração ${convertHMS(details.duration)} - ${details.cluster}` }
              </div>
              <div>
                Radiant |{`${details.radiant_score}| - |${details.dire_score}| Dire               
               ` }
              </div>

            </div>

            <table className={styPlayers.table}>
              <thead>
                {status
                && (
                <tr>
                  <td colSpan="2">Position</td>
                  <td>Nick<br />Country-Id</td>
                  <td>K/D/A<br />L/D</td>
                  <td>GPM</td>
                  <td>XPM</td>
                  <td>Hero</td>
                  <td>Tower</td>
                  <td>Heal</td>
                </tr>
                )}
              </thead>
              <tbody>
                {status
                && status.map((data, i) => (
                  <tr style={
                      data.leaver_status === 0
                        ? { color: 'white' }
                        : { color: 'red' }
                    }
                  >
                    <td style={
                      data.win === 0
                        ? loss
                        : win
                    }
                    >{i + 1}
                    </td>
                    <td style={{ paddingTop: '4px' }}>
                      <Image width={40} height={40}
                        src={data.avatarfull} alt={data.avatarfull}
                      />
                    </td>
                    <td>
                      {data.personaname.slice(0, 10)}<br />
                    </td>
                    <td>
                      {data.kills !== '-'
                        ? `${data.kills}/${data.deaths}/${data.assists}\n
                      ${data.last_hits}/${data.denies}`
                        : '-'}
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
