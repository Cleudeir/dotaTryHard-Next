import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import style from '../styles/Home.module.css';
import Header from '../front/Header';
import Footer from '../front/Footer';

const React = require('react');

export default function Home() {
  const router = useRouter();
  const [id, setId] = useState(null); // 87683422
  const [useError, setError] = useState(false);

  useEffect(() => {
    setId(localStorage.getItem('id'));
  }, [router]);

  return (
    <div className={style.container}>
      <Header />
      <main className={style.main}>
        <div className={style.input}>
          <div className={style.texto}>
            <h6> SEARCH WITH YOUR ACCOUNT_ID OR STEAM_ID</h6>
          </div>
          <div>
            <input type="number" placeholder="Account id" className={style.myButton} value={id} style={{ textAlign: 'center' }}
              onChange={(e) => { setId(e.target.value); }}
            />
            <button type="button" className={style.myButton} onClick={() => {
              console.log(id);
              if (!id) {
                setError('ERROR, INSERT YOUR ACCOUNT_ID');
              } else { localStorage.setItem('id', id); console.log('click'); window.location.href = `/matches/${id}`; }
            }}
            >Matches
            </button>
          </div>
        </div>
        {useError && <h5 style={{ marginTop: '50px' }}>{useError}</h5> }
      </main>
      <Footer />
    </div>
  );
}
