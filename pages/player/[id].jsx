import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import player from '../../back/player';
import style from '../../styles/Home.module.css';
import Header from '../../front/Header';

const SteamID = require('steamid');
const React = require('react');

export default function Home() {
  const router = useRouter();
  const [datails, setDatails] = useState(null);
  const [status, setStatus] = useState(null);
  const [requestDatails, setRequestDatails] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(0);
  const [error, setError] = useState(false);

  async function start(props) {
    console.log('start');

    let { accountId } = props;
    console.log('accountId', accountId);
    setDatails(null);
    setError(false);
    setLoading(true);
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
      setRequestDatails(dataDetailsMatch);
      setRequestStatus(dataDetailsStatus);
      setDatails(dataDetailsMatch[view]);
      setStatus(dataDetailsStatus[view]);
    }
    setLoading(false);
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
    } else if (value > requestDatails.length - 1) {
      value = requestDatails.length - 1;
    }
    setView(value);
    setDatails(requestDatails[value]);
    setStatus(requestStatus[value]);
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

        {datails && status && (
          <div className={style.pages}>
            <h5 style={{
              verticalAlign: 'center', padding: '9px',
            }}
            >PAGE {parseInt(view + 1, 10)}/{parseInt(requestDatails.length, 10)}
            </h5>
            <div>

              <button type="button" className={style.myButton} onClick={() => { pages(-1); }}>
                BACK
              </button>
              <button type="button" className={style.myButton} onClick={() => { pages(1); }}>
                NEXT
              </button>
            </div>
            <div>
              {Object.keys(datails).map((type) => {
                if (type === 'start_time') {
                  return <div className={style.input}>{type}:{new Date(datails[type] * 1000).toLocaleDateString('pt-BR')}</div>;
                }
                if (type === 'duration') {
                  return <div className={style.input}>{type}:{convertHMS(datails[type])}</div>;
                }
                return <div className={style.input}>{type}:{datails[type]}</div>;
              })}
            </div>
            <div className={style.input}>
              {Object.keys(status).map((type) => {
                if (type !== 'account_id' && type !== 'match_id') {
                  return <div>{type}:{status[type]}</div>;
                }
                return '';
              })}
            </div>
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
