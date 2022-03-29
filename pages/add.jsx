import { useState } from 'react';

import style from '../styles/Home.module.css';
import Header from '../front/Header';
import Footer from '../front/Footer';
import Add from '../back/add';

const React = require('react');

export default function Home() {
  const [useId, setId] = useState(''); // 87683422
  const [useMessage, setMessage] = useState(false); // 87683422
  const [useWait, setWait] = useState(true);
  async function add({ id }) {
    setMessage(false);
    setWait(false);
    const result = await Add({ accountId: id, country: 0 });
    setWait(true);
    setMessage(result.message);
  }

  return (
    <div className={style.container}>
      <Header />
      <main className={style.main}>
        <div className={style.input}>
          <div className={style.texto}>
            <h6> SEARCH WITH YOUR ACCOUNT_ID OR STEAM_ID</h6>
          </div>
          <div>
            <input type="number" placeholder="Account id" className={style.myButton} value={useId} style={{ textAlign: 'center' }}
              onChange={(e) => { console.log(e.target.value); setId(e.target.value); }}
            />
            <button type="button" className={style.myButton} onClick={() => { console.log('click', useId); add({ id: useId }); }}>
              add
            </button>
            <button type="button" className={style.myButton} onClick={() => { console.log('click', useId); add({ id: useId }); }}>
              update
            </button>
          </div>
        </div>
        {!useMessage && !useWait && <img width={50} style={{ marginTop: '50px' }} alt="loading" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />}
        {useMessage && <h5 style={{ marginTop: '50px' }}>{useMessage}</h5> }
      </main>
      <Footer />
    </div>
  );
}
