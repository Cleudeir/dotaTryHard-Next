import Link from 'next/link';
import style from '../styles/Home.module.css';

const React = require('react');

export default function Footer() {
  return (
    <footer className={style.footer}>
      <h6>
        Copyright 2022
      </h6>
      <Link href="https://github.com/Cleudeir" passHref>
        <a href="replace">
          <img width={30} src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="git" style={{ filter: 'invert(1)', padding: '5px' }} />
          by Avatar
        </a>
      </Link>
    </footer>
  );
}
