/* eslint-disable react/prop-types */
import '../styles/globals.css';

const React = require('react');

const MyApp = function app({ Component, pageProps }) {
  return <Component {...pageProps} />;
};

export default MyApp;
