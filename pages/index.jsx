import { useEffect, useState } from 'react';
import Request from '../back';
import style from '../styles/Home.module.css';
import Head from "next/head";


export default function Home() {
  const SteamID = require('steamid');
  const [id, setId] = useState(false); // 87683422
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(false)

  async function start() {   
    if(id){
      setLoading(true)
    if(id>1818577144){
      let steamId = new SteamID(`${id}`);
      let unfilteredAccountId = steamId.getSteam3RenderedID();
      let accountId = unfilteredAccountId.slice(5,50).replace(']', "");
      console.log(accountId);
      setId(accountId);
    }      
      console.log('start');
      const req = await Request(id);
      setLoading(false)
      localStorage.setItem("id",id)
      setRank(req.splice(0, 300));
    }    
  }

  useEffect(() => { 
    const remember = localStorage.getItem("id");
    console.log(remember);
    if(remember){      
      setId(remember);
    }
  },[]);

  return (
    <div className={style.container}>
      <Head>
        <title>DotaTryHard</title>
        <meta name="description" content="DotaTryHard" />
        <link rel="icon" href="/faicon.png" />
      </Head>
      <header className={style.header}>
       
        <h2>DOTA TRY HARD</h2>
       
      </header>
      <main className={style.main}>
        <div className={style.input}>
          <div className={style.texto}>
          <h6>SEARCH WITH YOUR ACCOUNT_ID OR STEAM_ID</h6>
          </div>
          <input
            type="number"
            placeholder='Account id'
            className={style.myButton}
            value={id}
            style={{ textAlign: 'center' }}
            onChange={
              (e) => { setId(e.target.value); }
            }
          />
          <button className={style.myButton} onClick={start} type="button">Buscar</button>
        </div>
        {loading && <img width={50} style={{marginTop:"50px"}} src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"></img>}
        {rank && (
          <div>
            <table className={style.table}>
              <thead>
                <tr>
                  <td>Nº</td>
                  <td>-</td>
                  <td>Name</td>                                   
                  <td>kill</td>
                  <td>death</td>
                  <td>assist</td>  
                  <td>Matches</td>                           
                  <td>Win rate</td>
                  <td>Ranking</td>
                </tr>
              </thead>
              <tbody>
                {rank && rank.map((data, i) => (
                  <tr key={data.hero_healing + data.net_worth + data.tower_damage * i}>
                    <td>{i + 1}</td>
                    <td style={{paddingTop:"4px"}}><img src={data.avatarfull} alt={data.avatarfull} /></td>
                    <td>{data.personaname.slice(0,14)}</td>
                    <td>{data.kills}</td>
                    <td>{data.deaths}</td>
                    <td>{data.assists}</td>
                    <td>{data.matches}</td>                                    
                    <td>{data.winRate}</td>
                    <td>{data.ranking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      ;
      <footer className={style.footer}>
        <h6>
          Copyright 2022 - by Avatar 
        </h6>
      </footer>
    </div>
  );
}
