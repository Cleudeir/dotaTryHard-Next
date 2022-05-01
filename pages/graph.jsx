import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import Graph from '../back/graph';
import style from '../styles/Home.module.css';
import Header from '../front/Header';
import Footer from '../front/Footer';

function sleep(ms) {
  return new Promise(
    (resolve) => setTimeout(resolve, ms),
  );
}

export async function getStaticProps() {
  console.log('getStatic');
  let req = await Graph({ accountID: 87683422, country: 0 });
  let count = 0;
  while (req.status !== 200) {
    if (count === 5) {
      break;
    }
    count += 1;
    console.log(count);
    await sleep(1000);
    console.log('Buscando...');
    req = await Graph({ accountID: 87683422, country: 0 });
  }
  const { status, message, data } = req;
  return {
    props: { status, message, data }, // will be passed to the page component as props
    revalidate: 24 * 60 * 60,
  };
}

export default function Home({ status, message, data }) {
  const [graph, setGraph] = useState(null);
  const [useError, setError] = useState(false);

  async function start() {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
      Filler,
    );
    console.log('start');
    if (status === 500) {
      setError(message);
    }
    if (data) {
      const rankedY = [];
      const rankedX = [];

      for (let i = 0; i < data.length; i += 1) {
        let numY = ((data[i].ranking - 3000) / 3000);
        numY *= 100;
        rankedY.push(numY.toFixed(2));

        let numX = parseInt((i / data.length) * 100, 10);
        if (numX <= 50) {
          numX = `${numX}%`;
        } else { numX = `${(numX - 100) * -1}%`; }

        rankedX.push(data[i].ranking);
      }
      setGraph({
        labels: rankedX,
        datasets: [
          {
            label: 'Desvio (%)',
            data: rankedY,
            fill: true,
            lineTension: 1,
            borderColor: 'white',
            pointBorderColor: 'white',
            pointBorderWidth: 0,
            backgroundColor: 'rgba(75,192,192,0.2)',
          },

        ],
      });
    }
  }
  useEffect(() => {
    start();
  }, []);

  return (
    <div className={style.container}>
      <Header id="" />
      <main className={style.main}>
        {!graph && !useError && <img width={50} style={{ marginTop: '50px' }} alt="loading" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />}
        {useError && <h5 style={{ marginTop: '50px' }}>{useError}</h5> }
        {graph && (
        <div>
          <Line
            data={graph}
            width={document.documentElement.clientWidth * 0.95}
            height={document.documentElement.clientWidth * (
              document.documentElement.clientWidth < document.documentElement.clientHeight
                ? 1 : 0.4)}
            options={{
              plugins: {
                legend: {
                  display: false,
                  labels: {
                    color: '#FFFFFF',
                  },
                },
                title: {
                  display: true,
                  text: 'Desvio da média (%) x Ranking (pts)',
                  color: '#FFFFFF',
                },
              },
              scales: {
                yAxes: {
                  grid: {
                    drawBorder: true,
                    color: '#FFFFFF',
                  },
                  ticks: {
                    beginAtZero: true,
                    color: 'white',
                  },
                },
                xAxes: {
                  grid: {
                    drawBorder: true,
                    color: '#FFFFFF',
                  },
                  ticks: {
                    beginAtZero: true,
                    color: 'white',
                  },
                },
              },

            }}
          />
        </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
