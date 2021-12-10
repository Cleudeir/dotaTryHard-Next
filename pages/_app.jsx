/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import '../styles/globals.css';

const MyApp = function app({ Component, pageProps }) {
  return <Component {...pageProps} />;
};

export default MyApp;
