import style from '../styles/Home.module.css';

const React = require('react');

export default function TableRanking({ useRank, setRank }) {
  return (
    <table className={style.table}>
      <thead>
        <tr>
          <td colSpan="2">Position</td>
          <td>Nick</td>
          <td>K/D/A <br /> L/D</td>
          <td>GPM</td>
          <td>XPM</td>
          <td>Hero</td>
          <td>Tower</td>
          <td>Heal</td>
          <td>Rate</td>
          <td>Rank</td>
        </tr>
      </thead>
      <tbody>
        {useRank.map((data) => (
          <tr key={data.account_id}>
            <td>{data.id}</td>
            <td style={{ paddingTop: '4px' }}>
              <a href={`/matches/${data.account_id}`} onClick={() => { setRank(null); }}>
                <img width={35} height={35}
                  src={data.avatarfull} alt={data.avatarfull}
                />
              </a>
            </td>
            <td style={{ padding: '0px' }}>
              <a href={`/matches/${data.account_id}`} onClick={() => { setRank(null); }}>
                {data.personaname.slice(0, 10)}<br />
              </a>
            </td>
            <td>
              {data.kills}/{data.deaths}/{data.assists}<br />{data.last_hits}/{data.denies}
            </td>
            <td>
              {data.gold_per_min.toLocaleString('pt-BR')}
            </td>
            <td>
              {data.xp_per_min.toLocaleString('pt-BR')}
            </td>
            <td>
              {(data.hero_damage / 1000).toFixed(0)}K
            </td>
            <td>
              {(data.tower_damage / 1000).toFixed(1)}K
            </td>
            <td>
              {((data.hero_healing / 1000)) > 1 ? `${(data.hero_healing / 1000).toFixed(1)}K ` : data.hero_healing}
            </td>
            <td>
              {data.winRate}%
            </td>
            <td>
              {data.ranking.toLocaleString('pt-BR')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  );
}
