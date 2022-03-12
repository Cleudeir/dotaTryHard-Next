import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import player from '../../back/player';
import style from '../../styles/Home.module.css';
import Header from '../../front/Header';

const SteamID = require('steamid');
const React = require('react');

export default function Home() {
  const router = useRouter();
  const [dataRank, setDataRank] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function start(props) {
    console.log('start');
    let { accountId } = props;
    setDataRank(null);
    setError(false);
    setLoading(true);
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
    setLoading(false);

    if (data) {
      const { dataDetailsMatch, dataDetailsStatus } = data;
      setDataRank(dataDetailsMatch);
      console.log(dataDetailsMatch, dataDetailsStatus);
      localStorage.setItem('id', accountId);
    }
  }
  useEffect(() => {
    const { id } = router.query; // 87683422
    if (id) {
      console.log('id: ', id);
      const remember = localStorage.getItem('id');
      if (remember && id === '') {
        console.log('remember', remember);
        start({ accountId: remember });
      }
      start({ accountId: id });
      localStorage.setItem('id', id);
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
        {dataRank && (
          <div className={style.pages}>
            <table className={style.table}>
              <thead>
                <tr>
                  {Object.keys(dataRank[0]).map((type) => (
                    <td>{type}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRank.map((data) => (
                  <tr>
                    {Object.keys(data).map((type) => (
                      <td>{data[type]}</td>
                    ))}
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
