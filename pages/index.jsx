import { useEffect } from 'react';
import style from '../styles/Home.module.css';
import Header from '../front/Header';
import Footer from '../front/Footer';

const React = require('react');

export default function Home() {
  useEffect(() => {
    window.location.href = '/ranking';
  }, []);

  return (
    <div className={style.container}>
      <Header />
      <main className={style.main} />
      <Footer />
    </div>
  );
}
