import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import Request from '../back';
import style from '../styles/Home.module.css';
import Header from '../front/Header';

export default function Home() {
  const [graph, setGraph] = useState(null);

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
    const { data } = await Request(87683422);
    if (data) {
      const rankedY = [];
      const rankedX = [];

      for (let i = 0; i < data.length; i += 1) {
        let numY = ((data[i].ranking - 3000) / 3000);
        numY *= 100;
        rankedY.push(numY);

        let numX = parseInt((i / data.length) * 100, 10);
        if (numX <= 50) {
          numX = `${numX}%`;
        } else { numX = `${(numX - 100) * -1}%`; }

        rankedX.push(data[i].ranking);
      }
      setGraph({
        xAxisID: 'Variância (%) X Ranking (pts)',
        labels: rankedX,
        datasets: [
          {
            label: 'Variância (%)',
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
      <Header />
      <main className={style.main}>
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
      <footer className={style.footer}>
        <h6>
          Copyright 2022 - by Avatar
        </h6>
      </footer>
    </div>
  );
}
