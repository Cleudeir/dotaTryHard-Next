/* eslint-disable no-await-in-loop */
/* eslint-disable brace-style */
import Connect from '../../../back/data/Connect';

export default async function Read(req, res) {
  const [body, parameter] = JSON.parse(req.body).split('#');
  const region = [
    '"CHILE","BRAZIL","PERU","ARGENTINA","US WEST","US EAST","EUROPE","STOCKHOLM"',
    '"CHILE","BRAZIL","PERU","ARGENTINA"',
    '"US WEST","US EAST"',
    '"EUROPE","STOCKHOLM"',
  ];

  const connection = await Connect();
  async function queryMySql(request) {
    const result = await connection.query(request)
      .then((data) => data[0])
      .catch(() => []);
    return result;
  }
  const n = 5000;
  if (connection) {
    if (body === 'matches') {
      // matches
      const [count] = await queryMySql('SELECT COUNT(*) FROM MATCHES');
      const tableNumberRows = +count['COUNT(*)'];
      const dataMatches = [];
      for (let i = 0; i <= tableNumberRows; i += n) {
        const select = `SELECT match_id FROM MATCHES LIMIT ${i},${n};`;
        dataMatches.push(...await queryMySql(select)
          .then((data) => (data.length > 0 ? data.map((x) => x.match_id) : [])));
      }
      res.status(200).send({ dataMatches }); }

    else if (body === 'players') {
      // players
      const [count] = await queryMySql('SELECT COUNT(*) FROM PLAYERS');
      const tableNumberRows = +count['COUNT(*)'];
      const dataPlayers = [];
      for (let i = 0; i <= tableNumberRows; i += n) {
        const select = `SELECT account_id FROM PLAYERS LIMIT ${i},${n};`;
        dataPlayers.push(...await queryMySql(select)
          .then((data) => (data.length > 0 ? data.map((x) => x.account_id) : [])));
      }
      res.status(200).send({ dataPlayers });
    }

    else if (body === 'details') {
      const select01 = `
        select * from MATCHES
        where match_id
        in(
        (select match_id from
        (select
        account_id,match_id
        from PLAYERS_MATCHES
        where account_id = ${parameter}) as tabe)
        )
        order by start_time desc 
        LIMIT 0,500;`;
      const dataDetailsMatch = await queryMySql(select01);

      const select02 = `
      select
      *
      from PLAYERS_MATCHES
      where match_id in(
      select match_id from
      (
      select
      account_id,match_id
      from PLAYERS_MATCHES
      where account_id = ${parameter}) as tabe
      ) LIMIT 0,2500;`;
      const dataDetailsStatus = await queryMySql(select02);
      res.status(200).send({ dataDetailsMatch, dataDetailsStatus });
    }

    else if (body === 'avg') {
      const matchesMIn = 10;
      const avg = `
      SELECT * FROM PLAYERS JOIN
      (SELECT account_id,
      match_id,
      ROUND(AVG(assists),0) AS assists, 
      ROUND(AVG(kills),0) AS kills,
      ROUND(AVG(deaths),0) AS deaths,
      ROUND(AVG(denies),0) AS denies,
      ROUND(AVG(gold_per_min),0) AS gold_per_min,
      ROUND(AVG(hero_damage),0) AS hero_damage,
      ROUND(AVG(hero_healing),0) AS hero_healing,
      ROUND(AVG(last_hits),0) AS last_hits,
      ROUND(AVG(net_worth),0) AS net_worth,
      ROUND(AVG(tower_damage),0) AS tower_damage,
      ROUND(AVG(xp_per_min),0) AS xp_per_min,
      SUM(win) AS win,
      COUNT(account_id) AS matches
      FROM PLAYERS_MATCHES      
      GROUP BY account_id
      HAVING matches > ${matchesMIn}
      ORDER BY matches desc
      ) as tabela      
      on tabela.account_id = PLAYERS.account_id
      join (select match_id, cluster from MATCHES) 
      as tab on tab.match_id = tabela.match_id
      where cluster in(${region[parameter]});
      `;

      const avgAll = `
      SELECT 
      ROUND(AVG(assists),0) AS assists, 
      ROUND(AVG(kills),0) AS kills,
      ROUND(AVG(deaths),0) AS deaths,
      ROUND(AVG(denies),0) AS denies,
      ROUND(AVG(gold_per_min),0) AS gold_per_min,
      ROUND(AVG(hero_damage),0) AS hero_damage,
      ROUND(AVG(hero_healing),0) AS hero_healing,
      ROUND(AVG(last_hits),0) AS last_hits,
      ROUND(AVG(net_worth),0) AS net_worth,
      ROUND(AVG(tower_damage),0) AS tower_damage,
      ROUND(AVG(xp_per_min),0) AS xp_per_min,
      SUM(win) AS win,
      SUM(matches) AS matches
      FROM 
      (SELECT account_id,
      match_id,
      ROUND(AVG(assists),0) AS assists, 
      ROUND(AVG(kills),0) AS kills,
      ROUND(AVG(deaths),0) AS deaths,
      ROUND(AVG(denies),0) AS denies,
      ROUND(AVG(gold_per_min),0) AS gold_per_min,
      ROUND(AVG(hero_damage),0) AS hero_damage,
      ROUND(AVG(hero_healing),0) AS hero_healing,
      ROUND(AVG(last_hits),0) AS last_hits,
      ROUND(AVG(net_worth),0) AS net_worth,
      ROUND(AVG(tower_damage),0) AS tower_damage,
      ROUND(AVG(xp_per_min),0) AS xp_per_min,
      SUM(win) AS win,
      COUNT(account_id) AS matches
      FROM PLAYERS_MATCHES      
      GROUP BY account_id
      HAVING matches > ${matchesMIn}
      ORDER BY matches desc
      ) as tabela
      join (select match_id, cluster from MATCHES) 
      as tab on tab.match_id = tabela.match_id
      where cluster in(${region[parameter]});
      `;
      const dataAvg = await queryMySql(avg);
      const [dataAvgAll] = (await queryMySql(avgAll));

      res.status(200).send({ dataAvg, dataAvgAll });
    }
    else {
      res.status(500).json('error parameter');
    }
  } else {
    res.status(500).json(connection);
  }
}
